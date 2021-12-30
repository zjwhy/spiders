var fs = require('fs'); //读写文件

var parser = require('@babel/parser');

var traverse = require('@babel/traverse').default;

var my_type = require('@babel/types');

var generator = require('@babel/generator').default;


var jscode = `var cat = {
    name:"xiao",
    pa:function (a,b){

        return a + b + 1000
    },
    pl: function (a,b){

        return a * b + 10000
    }

}`

var visitor = {
    FunctionExpression(path){

        var paern_name = path.node.params[0].name;
        path.traverse({Identifier(path){
            if (path.node.name == this.paern_name){

                path.node.name = "x"
            }
            // path.stop()
        }},{paern_name})
    }
}


var ast = parser.parse(jscode)

traverse(ast,visitor)
var code = generator(ast).code

console.log(code)