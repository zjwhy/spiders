// ==UserScript==
// @name         Rpc RS4
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       zj
// @match        http://www.fangdi.com.cn/*
// @icon         https://www.google.com/s2/favicons?domain=fangdi.com.cn
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    XMLHttpRequest.prototype.open.toString = function(){return "function open() { [native code] }"};
    XMLHttpRequest.prototype.open = function(){console.log("MmEwem生成完成!!");return arguments[1]};
    function SekiroClient(wsURL) {
        this.wsURL = wsURL;
        this.handlers = {};
        this.socket = {};
        this.base64 = false;
        // check
        if (!wsURL) {
            throw new Error('wsURL can not be empty!!')
        }
        this.webSocketFactory = this.resolveWebSocketFactory();
        this.connect()
};

    SekiroClient.prototype.resolveWebSocketFactory = function () {
    if (typeof window === 'object') {
        var theWebSocket = window.WebSocket ? window.WebSocket : window.MozWebSocket;
        return function (wsURL) {

            function WindowWebSocketWrapper(wsURL) {
                this.mSocket = new theWebSocket(wsURL);
            }

            WindowWebSocketWrapper.prototype.close = function () {
                this.mSocket.close();
            };

            WindowWebSocketWrapper.prototype.onmessage = function (onMessageFunction) {
                this.mSocket.onmessage = onMessageFunction;
            };

            WindowWebSocketWrapper.prototype.onopen = function (onOpenFunction) {
                this.mSocket.onopen = onOpenFunction;
            };
            WindowWebSocketWrapper.prototype.onclose = function (onCloseFunction) {
                this.mSocket.onclose = onCloseFunction;
            };

            WindowWebSocketWrapper.prototype.send = function (message) {
                this.mSocket.send(message);
            };

            return new WindowWebSocketWrapper(wsURL);
        }
    }
    if (typeof weex === 'object') {
        // this is weex env : https://weex.apache.org/zh/docs/modules/websockets.html
        try {
            console.log("test webSocket for weex");
            var ws = weex.requireModule('webSocket');
            console.log("find webSocket for weex:" + ws);
            return function (wsURL) {
                try {
                    ws.close();
                } catch (e) {
                }
                ws.WebSocket(wsURL, '');
                return ws;
            }
        } catch (e) {
            console.log(e);
            //ignore
        }
    }
    //TODO support ReactNative
    if (typeof WebSocket === 'object') {
        return function (wsURL) {
            return new theWebSocket(wsURL);
        }
    }
    // weex 和 PC环境的websocket API不完全一致，所以做了抽象兼容
    throw new Error("the js environment do not support websocket");
};

    SekiroClient.prototype.connect = function () {
    console.log('sekiro: begin of connect to wsURL: ' + this.wsURL);
    var _this = this;
    // 不check close，让
    // if (this.socket && this.socket.readyState === 1) {
    //     this.socket.close();
    // }
    try {
        this.socket = this.webSocketFactory(this.wsURL);
    } catch (e) {
        console.log("sekiro: create connection failed,reconnect after 2s");
        setTimeout(function () {
            _this.connect()
        }, 2000)
    }

    this.socket.onmessage(function (event) {
        _this.handleSekiroRequest(event.data)
    });

    this.socket.onopen(function (event) {
        console.log('sekiro: open a sekiro client connection')
    });

    this.socket.onclose(function (event) {
        console.log('sekiro: disconnected ,reconnection after 2s');
        setTimeout(function () {
            _this.connect()
        }, 2000)
    });
};

    SekiroClient.prototype.handleSekiroRequest = function (requestJson) {
    console.log("receive sekiro request: " + requestJson);
    var request = JSON.parse(requestJson);
    var seq = request['__sekiro_seq__'];

    if (!request['action']) {
        this.sendFailed(seq, 'need request param {action}');
        return
    }
    var action = request['action'];
    if (!this.handlers[action]) {
        this.sendFailed(seq, 'no action handler: ' + action + ' defined');
        return
    }

    var theHandler = this.handlers[action];
    var _this = this;
    try {
        theHandler(request, function (response) {
            try {
                _this.sendSuccess(seq, response)
            } catch (e) {
                _this.sendFailed(seq, "e:" + e);
            }
        }, function (errorMessage) {
            _this.sendFailed(seq, errorMessage)
        })
    } catch (e) {
        console.log("error: " + e);
        _this.sendFailed(seq, ":" + e);
    }
};

    SekiroClient.prototype.sendSuccess = function (seq, response) {
    var responseJson;
    if (typeof response == 'string') {
        try {
            responseJson = JSON.parse(response);
        } catch (e) {
            responseJson = {};
            responseJson['data'] = response;
        }
    } else if (typeof response == 'object') {
        responseJson = response;
    } else {
        responseJson = {};
        responseJson['data'] = response;
    }


    if (Array.isArray(responseJson)) {
        responseJson = {
            data: responseJson,
            code: 0
        }
    }

    if (responseJson['code']) {
        responseJson['code'] = 0;
    } else if (responseJson['status']) {
        responseJson['status'] = 0;
    } else {
        responseJson['status'] = 0;
    }
    responseJson['__sekiro_seq__'] = seq;
    var responseText = JSON.stringify(responseJson);
    console.log("response :" + responseText);


    if (responseText.length < 1024 * 6) {
        this.socket.send(responseText);
        return;
    }

    if (this.base64) {
        responseText = this.base64Encode(responseText)
    }

    //大报文要分段传输
    var segmentSize = 1024 * 5;
    var i = 0, totalFrameIndex = Math.floor(responseText.length / segmentSize) + 1;

    for (; i < totalFrameIndex; i++) {
        var frameData = JSON.stringify({
                __sekiro_frame_total: totalFrameIndex,
                __sekiro_index: i,
                __sekiro_seq__: seq,
                __sekiro_base64: this.base64,
                __sekiro_is_frame: true,
                __sekiro_content: responseText.substring(i * segmentSize, (i + 1) * segmentSize)
            }
        );
        console.log("frame: " + frameData);
        this.socket.send(frameData);
    }
};

    SekiroClient.prototype.sendFailed = function (seq, errorMessage) {
    if (typeof errorMessage != 'string') {
        errorMessage = JSON.stringify(errorMessage);
    }
    var responseJson = {};
    responseJson['message'] = errorMessage;
    responseJson['status'] = -1;
    responseJson['__sekiro_seq__'] = seq;
    var responseText = JSON.stringify(responseJson);
    console.log("sekiro: response :" + responseText);
    this.socket.send(responseText)
};

    SekiroClient.prototype.registerAction = function (action, handler) {
    if (typeof action !== 'string') {
        throw new Error("an action must be string");
    }
    if (typeof handler !== 'function') {
        throw new Error("a handler must be function");
    }
    console.log("sekiro: register action: " + action);
    this.handlers[action] = handler;
    return this;
};
    function guid() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        };
    function getcookie(request){
        var method = request["method"];
        var url = request["url"];
        var mmew = XMLHttpRequest.prototype.open(method,url,true);
        document.getElementsByClassName("content_box")[0].click();
        console.log("点击完成!!!");
        var tmp_cookie = document.cookie;
        return {cookie:tmp_cookie,mmew:mmew}

    };
    var client = new SekiroClient("ws://127.0.0.1:5620/business-demo/register?group=test_rs4&clientId=" + guid());
    client.registerAction("rs_test", function (request, resolve, reject) {
            resolve(getcookie(request));
        });

})();