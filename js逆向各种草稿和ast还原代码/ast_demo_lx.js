const fs = require('fs');

const t = require("@babel/types")

const parser = require("@babel/parser")

const {default:generator} = require("@babel/generator")

const traverse = require("@babel/traverse").default;

const jscode = fs.readFileSync("./demo.js",{encoding:"utf-8"})

let ast = parser.parse(jscode)

let sysm_val_list = ["Date","eval","parseInt"]
let big_arr = []
//Base64加密
!(function(global) {
    "use strict";
    var _Base64 = global.Base64;
    var version = "2.1.9";
    var buffer;

    var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++)
            t[bin.charAt(i)] = i;
        return t
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
        } else {
            var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
            return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob)
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3]
          , ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0)
          , chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
        return chars.join("")
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b)
    }
    : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode)
    }
    ;
    var _encode = buffer ? function(u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")
    }
    : function(u) {
        return btoa(utob(u))
    }
    ;
    var encode = function(u, urisafe) {
        return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function(m0) {
            return m0 == "+" ? "-" : "_"
        }).replace(/=/g, "")
    };
    var encodeURI = function(u) {
        return encode(u, true)
    };
    var re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"),"g");
    var cb_btou = function(cccc) {
        switch (cccc.length) {
        case 4:
            var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3)
              , offset = cp - 65536;
            return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
        case 3:
            return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
        default:
            return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou)
    };
    var cb_decode = function(cccc) {
        var len = cccc.length
          , padlen = len % 4
          , n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0)
          , chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join("")
    };
    var atob = global.atob ? function(a) {
        return global.atob(a)
    }
    : function(a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode)
    }
    ;
    var _decode = buffer ? function(a) {
        return (a.constructor === buffer.constructor ? a : new buffer(a,"base64")).toString()
    }
    : function(a) {
        return btou(atob(a))
    }
    ;
    var decode = function(a) {
        return _decode(String(a).replace(/[-_]/g, function(m0) {
            return m0 == "-" ? "+" : "/"
        }).replace(/[^A-Za-z0-9\+\/]/g, ""))
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64
    };
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    if (typeof Object.defineProperty === "function") {
        var noEnum = function(v) {
            return {
                value: v,
                enumerable: false,
                writable: true,
                configurable: true
            }
        };
        global.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
                return decode(this)
            }));
            Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
                return encode(this, urisafe)
            }));
            Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
                return encode(this, true)
            }))
        }
    }
    
    // Base64 = global.Base64

}
)(global);

//代码预处理

//object .调用改为[]调用
traverse(ast,{

    MemberExpression(path){
        let name_ = path.node.property.name;
        path.node.property = t.stringLiteral(name_);

        path.node.computed = true

    }
})

// 自带的函数改为window进行[]调用

traverse(ast,{
    Identifier(path){
        let name_ = path.node.name;
        if(sysm_val_list.findIndex(n=>n==name_) != -1){
            let name_liter = t.stringLiteral(name_);
            let window_liter = t.identifier("window");
            let window_mem = t.memberExpression(window_liter,name_liter,true);
            path.replaceWith(window_mem)
            path.skip()

        }


    }


})


//数字进行 异或 混淆
traverse(ast,{
    NumericLiteral(path){
        let value_ = path.node.value;

        let enc_key = parseInt(Math.random()*99999);

        let enc_value = value_ ^ enc_key;

        let enc_numliter = t.binaryExpression("^",t.numericLiteral(enc_value),t.numericLiteral(enc_key));
        path.replaceWith(enc_numliter);

        path.skip()


    }

})
let new_code = generator(ast).code
ast = parser.parse(new_code)
//逗号表达式混淆


traverse(ast,{
    FunctionExpression(path){

        let  blockStatement = path.node.body;

        let blockStatementLength = blockStatement.body.length;
        if (blockStatementLength < 2) return;

        path.traverse({
            VariableDeclaration(p){
                let stamet = [];
                p.node.declarations.map((n)=>{
                    path.node.params.push(n.id)

                    n.init && stamet.push(t.assignmentExpression("=",n.id,n.init))

                })
                
                p.replaceInline(stamet);

            }

        })
        
        let first_ast = blockStatement.body[0];

        let index = 1

        while(index <blockStatementLength){
            let second_tmp = blockStatement.body[index++];
            t.isExpressionStatement(second_tmp)?second = second_tmp.expression:second = second_tmp;
            if (t.isReturnStatement(second)){
                second = t.returnStatement(t.toSequenceExpression([first_ast,second.argument]))
                first_ast = second
            }else if (t.isAssignmentExpression(second)){
                if (t.isCallExpression(second.right)){
                    let callee = second.right.callee;
                    callee.object = t.toSequenceExpression([first_ast,callee.object])
                    first_ast = second
                }else{
                    second.right = t.toSequenceExpression([first_ast,second.right])
                    first_ast = second
                }
            }else{
                first_ast = t.toSequenceExpression([first_ast,second.right])

            }


        }

        path.get("body").replaceWith(t.blockStatement([first_ast]))

        



    }
})

//binaryExp  花指令混淆

// 




new_code = generator(ast).code
ast = parser.parse(new_code)

//callExp  花指令混淆

traverse(ast,{
    CallExpression(path){
        let call_idliter = path.node.callee;

        let call_arg = path.node.arguments;

        let fun_name = path.scope.generateUidIdentifier("xxx")
       
        let args = [];
        if (call_arg.length>1){

            for (let i=0 ;i< call_arg.length;i++){

                args.push(path.scope.generateUidIdentifier("xxx"))
            }
        }else if(call_arg.length==1){
            args.push(path.scope.generateUidIdentifier("xxx"))
            args.push(path.scope.generateUidIdentifier("xxx"))

        }
        else{

            args.push(path.scope.generateUidIdentifier("xxx"))

        }
        
        try {
            let func_ = t.functionDeclaration(fun_name,args,t.blockStatement(
                [t.returnStatement(t.callExpression(args[0],args.slice(1)))]
            ))
            let func_parent = path.findParent((p)=>p.isFunctionExpression())
            if (func_parent && t.isIdentifier(call_idliter)){
                func_parent.node.body.body.unshift(func_)
                path.skip()
    
                try {
                    path.replaceWith(t.callExpression(fun_name,[call_idliter,...call_arg]))
                    path.skip()
                } catch (error) {
                    console.log(error)
                }
    
            }
        } catch (error) {
            console.log(error)
        }
        

    }
})
 
//swith 混淆

traverse(ast,{
    FunctionExpression(path){
        //BlockStatement body获取

        let statements = path.node.body.body;
        let real_lit_body = statements.map((n,i)=>{
            return {index:i,value:n}
        })
        //原语句顺序打乱

        let real_i = real_lit_body.length;
        while(real_i){
            let j = Math.floor(Math.random()*real_i--);
            [real_lit_body[real_i],real_lit_body[j]] = [real_lit_body[j],real_lit_body[real_i]]
        }
        let fenfa_list =[];
        let switch_cases = real_lit_body.map((n,index)=>{
                fenfa_list[n.index] = index; // 0   9  当index为0  实际执行为9  所以把case 0 要到第分发器的index为9的位置
                if (t.isReturnStatement(n.value)){
                    return t.switchCase(t.numericLiteral(index),[n.value])

                }
                return t.switchCase(t.numericLiteral(index),[n.value,t.continueStatement()])


        });

        let fenfa_str = fenfa_list.join("|");

        let fenfa_ast = t.variableDeclaration("var",[t.variableDeclarator(t.identifier("fenfaqi"),t.callExpression(t.memberExpression(t.stringLiteral(fenfa_str),t.identifier("split")),[t.stringLiteral("|")]))]);
        let fenfa_index = t.variableDeclaration("var",[t.variableDeclarator(t.identifier("fenfa_index"),t.numericLiteral(0))]);
        let while_test = t.unaryExpression("!",t.unaryExpression("+",t.arrayExpression([])));
        let switch_test = t.unaryExpression("+",t.memberExpression(t.identifier("fenfaqi"),t.updateExpression("++",t.identifier("fenfa_index")),true))
        let while_body = t.blockStatement([t.switchStatement(switch_test,switch_cases),t.breakStatement()]);
        let  while_ast = t.whileStatement(while_test,while_body);


        path.get("body").replaceWith(t.blockStatement([while_ast]));
        path.node.body.body.unshift(fenfa_index);
        path.node.body.body.unshift(fenfa_ast);


    }
})

//提取字符串进行加密和替换索引调用 

traverse(ast,{
    StringLiteral(path){
        let str_value = path.node.value;
        let enc_value = Base64.encode(str_value)
        let index_ = big_arr.findIndex(n=>n==enc_value);
        if (index_ == -1){
            index_ = big_arr.push(enc_value)-1
        }
        let atob_liter = t.callExpression(t.identifier("atob"),[t.memberExpression(t.identifier('big_arr'),t.numericLiteral(index_),true)])
        path.replaceWith(atob_liter)
    }
})

//加密后的字符串列表添加到代码最开始到地方
big_arr = big_arr.map((n)=>t.stringLiteral(n))

big_arr = t.variableDeclarator(t.identifier("big_arr"),t.arrayExpression(big_arr))

big_arr = t.variableDeclaration("var",[big_arr])

ast.program.body.unshift(big_arr)

//标示符混淆

traverse(ast,{
    Identifier(path){
        let old_name = path.node.name;
        // console.log(old_name)
        let new_name = path.scope.generateUidIdentifier("_Ox0seda23");
        path.scope.rename(old_name,new_name.name)
        // path.skip()
    }

})




let ast_to_jscode = generator(ast,{
    comments:false,
    compact:false,
    // minified:true
}).code

// console.log(ast_to_jscode)

fs.writeFileSync("./newDemo.js",ast_to_jscode)