const fs = require('fs');

let t =  require('@babel/types')

let traverse = require("@babel/traverse").default

let parser = require("@babel/parser")

let generator = require("@babel/generator").default;

const js_code = fs.readFileSync('./y_3_hx.js',{encoding:"utf8"})

let ast = parser.parse(js_code);



let encode_ast = parser.parse("")

encode_ast.program.body = ast.program.body.slice(0,4);


let parse_code = generator(encode_ast).code;
eval(parse_code)


traverse(ast,{
    StringLiteral(path){
        delete path.node.extra;

    }

})
const decode_func = "$b";


traverse(ast,{
    CallExpression(path){
        let path_node = path.node;

        let callee = path_node.callee;

        if (callee.name ==decode_func){
            path.replaceWith(t.stringLiteral(eval(path+"")))
        }
    }
})

ast = parser.parse(generator(ast).code);



traverse(ast,{

        BinaryExpression(path){

            let path_node = path.node;

            if (t.isStringLiteral(path_node.left) && t.isStringLiteral(path_node.right)){
                
                    path.replaceWith(t.stringLiteral(eval(path +"")))
            }
        }
})


//整合对象还原花指令

var total_obj = {}

traverse(ast,{
    FunctionExpression(path){
        let path_node = path.node;
        if (path_node.id && path_node.id.name=="$c"){
            path_node.body.body.map((n)=>{

                if (t.isExpressionStatement(n)){
                    let express = n.expression;
                    if (t.isAssignmentExpression(express)){
                        let obj_name = express.left.object.name;

                        total_obj[obj_name] = total_obj[obj_name] || {};

                        !total_obj[obj_name][express.left.property.value] && (total_obj[obj_name][express.left.property.value] = express.right);

                    }

                    
                }

            })


        }


    }
})

// console.log(total_obj)
//对象相互引用还原
traverse(ast,{
    VariableDeclarator(path){
        let node_ = path.node;

        if (t.isObjectExpression(node_.init)){
            node_.init.properties.map((n)=>{

                   t.isMemberExpression(n.value)&&n.value.computed ?n.value = obj_set[n.value.property.value] : null
            })
        }
    }

})

//调用还原 二项式
traverse(ast,{

    CallExpression(path){
        let callee = path.node.callee;

        if(t.isMemberExpression(callee) && callee.computed){

            let  mem_name = callee.property.value;

            let set_node = total_obj[mem_name]

            if(t.isFunctionExpression(set_node) && set_node.body.body.length==1 && t.isReturnStatement(set_node.body.body[0]) ){

                let return_body = set_node.body.body[0];
                
                let argument = return_body.argument;
                if (t.isCallExpression(argument)){
                    let func_callee = argument.callee;
                    if(t.isIdentifier(func_callee)){
                       func_callee.name == set_node.params[0].name? path.replaceWith(t.CallExpression(path.node.arguments[0],path.node.arguments.slice(1))) :null

                    }else if(t.isMemberExpression(func_callee) && func_callee.computed){
                        let new_set_node =  obj_set[func_callee.property.value];

                        new_set_node && t.isFunctionExpression(new_set_node) && new_set_node.body.body.length ==1 && t.isCallExpression(new_set_node.body.body[0].argument) && 
                        new_set_node.body.body[0].argument.callee.name == new_set_node.params[0].name ? path.replaceWith(t.CallExpression(path.node.arguments[0],path.node.arguments.slice(1))):null

                        new_set_node && t.isFunctionExpression(new_set_node) && new_set_node.body.body.length ==1 && t.isBinaryExpression(new_set_node.body.body[0].argument) && 
                        new_set_node.body.body[0].argument.left.name == new_set_node.params[0].name && new_set_node.body.body[0].argument.right.name == new_set_node.params[1].name  ? path.replaceWith(t.binaryExpression(new_set_node.body.body[0].argument.operator,path.node.arguments[0],path.node.arguments[1])):null

                    }

                }
            }


        }

        
    }
})

traverse(ast,{

    CallExpression(path){
        let callee = path.node.callee;
        if(t.isMemberExpression(callee)){
            let obj_name = callee.object.name;

            let f_name = callee.property.value;
    
            let replace_node = total_obj[obj_name]? total_obj[obj_name][f_name]:null

            // if (f_name == "Vvzfp"){

            //     console.log(callee)
            // }
            if(replace_node && t.isFunctionExpression(replace_node)){
    
                if (replace_node.body.body.length==1){
    
                    let return_exp = replace_node.body.body[0]
    
                    if(t.isBinaryExpression(return_exp.argument)){
                        path.replaceWith(t.binaryExpression(return_exp.argument.operator,path.node.arguments[0],path.node.arguments[1]))
    
                    }else if(t.isCallExpression(return_exp.argument)){
                        path.replaceWith(t.CallExpression(path.node.arguments[0],path.node.arguments.slice(1)))


                    }else if(t.isLogicalExpression(return_exp.argument)){

                        path.replaceWith(t.logicalExpression(return_exp.argument.operator,path.node.arguments[0],path.node.arguments[1]))

                    }



                }            
    
            }

        }
      


    }


})

let new_code = generator(ast).code;
ast = parser.parse(new_code);
let new_js_code = generator(ast).code



fs.writeFileSync('./y_3_new.js',new_js_code)