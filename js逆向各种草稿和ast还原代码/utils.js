`
navigator 获取
var my_navi = {};
for (var i in navigator){var n = navigator[i+""];

    (typeof n == "string" ||  typeof n =="number" || (n && typeof n =="object" && n.constructor == Array)) && (my_navi[i+""] = n)

}
`

var my_navi = {
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Google Inc.",
    "maxTouchPoints": 0,
    "hardwareConcurrency": 8,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "platform": "MacIntel",
    "product": "Gecko",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "language": "zh-CN",
    "languages": [
        "zh-CN",
        "zh"
    ],
    "deviceMemory": 8
}


function MediaDevices(){


}

MediaDevices["prototype"]["enumerateDevices"] = Promise;


my_navi["mediaDevices"] = new MediaDevices()

exports.navigator = my_navi;


var window = global;

var cookie_dict = {
  '_gscu_930750436':'387801188xb0ne18', 
  '_gscbrs_930750436':'1', 
  'bg6':'64|A8spX', 
  'JSESSIONID':'2e382efb528108bd83bc0060e4de', 
  'UR3ZMlLdcLIE80T':'43mRkKBm1obrw7znJOORv6Jg0OQtgRCkgsY8B1P9ODVVCj3aM34GDfYIo2ysV_DM.vM8BF.IZFuHA5sEVNDpbSNDcwk7PvQ5tFtPvsAEysVa51fEwKQd6bYh.muGb3uyG2JL.oJBngiuawB0xhxqH1Cp_j4NgH6zKwF4Mesw.vzGgfAbB.cmrsmfcmREiTpu4fM7FX.oYssp9HzvrmnbQLt23F9KicyTGVg_.MXS7CMOMmEjBLsxWj48k6YzfgvP02Go4KDu0C2..jpkJrcqZmpsOcqVoj1aGaIQ5Eq5WPgwVPGjFQHEmXPrypr4bM2FeKCg'
};

window.top =window;
window.self = window
window.location = {
  href:"https://www.python-spider.com/challenge/20",
  protocol:'https:',
  hostname:"www.python-spider.com"
};

window.name = "$_YWTU=Vip3DK1N5FaaoSbqxEUpOR5HZc2hK7Psvg9vfu41v.V&$_cDro=20&vdFm=";

window.sessionStorage = {
    "$_cDro": "20",
    "$_YWTU": "Vip3DK1N5FaaoSbqxEUpOR5HZc2hK7Psvg9vfu41v.V"
};

window.document = {
    createElement:function(val){
    return {
      innerHTML:"",
      getElementsByTagName:function(v){
        return []
      }
    }
    },
    addEventListener:function(a,b,c){},
    getElementsByTagName:function(a){return []},
    exitFullscreen:function(){},
    documentElement:{style:{}},
    write:function(v){},
    body:{
      tagName:"BODY",
      getAttribute:function(v){if (v == "onload" || v == "onclick" || v == "onsubmit"){return null}else{throw new Error("body getAttribute error " +v)}},
      firstChild:{
        nodeType:3,
        nextSibling:{
          nodeType:1,
          nextSibling:{},
          tagName:"INPUT",
          type:"hidden",
          getAttribute:function(v){if (v == "onload" || v == "onclick" || v == "onsubmit"){return null}else{throw new Error("body getAttribute error " +v)}},
        }
      },
     
  },
    characterSet:"UTF-8",
    cookie:"_gscu_930750436=387801188xb0ne18; _gscbrs_930750436=1; bg6=64|A8spX; JSESSIONID=2e382efb528108bd83bc0060e4de; _gscs_930750436=t38846932csf51p18|pv:2; UR3ZMlLdcLIE80T=43mRkKBm1obrw7znJOORv6Jg0OQtgRCkgsY8B1P9ODVVCj3aM34GDfYIo2ysV_DM.vM8BF.IZFuHA5sEVNDpbSNDcwk7PvQ5tFtPvsAEysVa51fEwKQd6bYh.muGb3uyG2JL.oJBngiuawB0xhxqH1Cp_j4NgH6zKwF4Mesw.vzGgfAbB.cmrsmfcmREiTpu4fM7FX.oYssp9HzvrmnbQLt23F9KicyTGVg_.MXS7CMOMmEjBLsxWj48k6YzfgvP02Go4KDu0C2..jpkJrcqZmpsOcqVoj1aGaIQ5Eq5WPgwVPGjFQHEmXPrypr4bM2FeKCg"

};

Object.defineProperty(document,"cookie",{
    set:function(value){
        if (value !==""){
            let value_ = value.split(';')[0];
            let key = value_.split('=')[0];
            let kv = value_.split('=')[1];
            cookie_dict[key] = kv

        }},
      get:function(key){
        let result = ""
        for (var k in cookie_dict){

            result = result + k;
            result = result + "="+cookie_dict[k]+"; "

        }
        return result
      }

    });


window.indexedDB = {};
window.clearInterval = {};
window.setInterval = function(a,b){
    // debugger;
    a()
}
window.XMLHttpRequest = {};

window.addEventListener = function(a,b,c,d){
  
};
window.localStorage = {
    
    "$_YWTU": "Vip3DK1N5FaaoSbqxEUpOR5HZc2hK7Psvg9vfu41v.V",
    "__#classType": "localStorage",
    "$_cDro": "20",
    getItem:function(key){

      return this[key]
    },
    setItem:function(key,value){
      this[key] = value;

    }
};

window.navigator =  {
  "vendorSub": "",
  "productSub": "20030107",
  "vendor": "Google Inc.",
  "maxTouchPoints": 0,
  "hardwareConcurrency": 8,
  "appCodeName": "Mozilla",
  "appName": "Netscape",
  "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "platform": "MacIntel",
  "product": "Gecko",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "language": "zh-CN",
  "languages": [
      "zh-CN",
      "zh"
  ],
  "deviceMemory": 8,
  webkitPersistentStorage:function(){},
  mimeTypes:{
    "0": {},
    "1": {},
    "2": {},
    "3": {}
    },
    getBattery:function(){
        return {
            then:function(v){
                debugger;
                v({
                  level:0.94,
                  charging:true,
                  chargingTime:2520
                })
            }
        }

    }
        
    
  
};

window.chrome = {
   
};
window.webkitRequestFileSystem =function(a,b,c,d){};

window.TEMPORARY = 0;

window.Infinity = {};

window.openDatabase = function(a,b,c,d){

  return {a:a,b:b,c:c,d:d}


};

window.clientInformation = window.navigator ;


// console.log(my_navi["mediaDevices"]["enumerateDevices"])