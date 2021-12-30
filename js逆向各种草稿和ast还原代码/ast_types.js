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




var ast = parser.parse(jscode)
//type 组件判断类型
traverse(ast,{
    enter(path){
        // if(my_type.isIdentifier(path.node,{name:"a"})){
        //     path.node.name = "x"
        // }
        if(path.isIdentifier({name:"a"})){
            path.node.name = "x"
        }
    }   
})
var code = generator(ast).code

//console.log(code)


//生成新的各种表达式


// `var cat = {
//     name:"xiao",
//     pa:function (a,b){

//         return a + b + 1000
//     },
//     pl: function (a,b){

//         return a * b + 10000
//     }

// }`

let a = my_type.identifier("a");

let b = my_type.identifier("b");



let cat = my_type.identifier("cat")

let obj_name_id = my_type.identifier("name")

let obj_name = my_type.objectProperty(obj_name_id,my_type.stringLiteral("xiao"))

let func1_return_ex = my_type.binaryExpression("+",my_type.binaryExpression("+",a,b),my_type.numericLiteral(1000))

let func1_return = my_type.returnStatement(func1_return_ex)

let func1_block = my_type.blockStatement([func1_return])

let func1 = my_type.functionExpression(null,[a,b],func1_block)

let obj_func1 = my_type.objectProperty(my_type.identifier("pa"),func1)

let func2_return_ex = my_type.binaryExpression("+",my_type.binaryExpression("*",a,b),my_type.numericLiteral(10000))

let func2_return = my_type.returnStatement(func2_return_ex)

let func2_block = my_type.blockStatement([func2_return])

let func2 = my_type.functionExpression(null,[a,b],func2_block)

let obj_func2 = my_type.objectProperty(my_type.identifier("pl"),func2)

let obj_expre = my_type.objectExpression([obj_name,obj_func1,obj_func2])

let variab = my_type.variableDeclarator(cat,obj_expre)

let local_ast = my_type.variableDeclaration("let",[variab])

let local_code = generator(local_ast).code

console.log(local_code)