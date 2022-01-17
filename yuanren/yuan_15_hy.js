const fs = require('fs');

let t =  require('@babel/types')

let traverse = require("@babel/traverse").default

let parser = require("@babel/parser")

let generator = require("@babel/generator").default;

const js_code = fs.readFileSync('./yuan_15_hx.js',{encoding:"utf8"})

let ast = parser.parse(js_code);
let new_ast = parser.parse("")

new_ast.program.body = ast.program.body.slice(0,2)
let func_name = ast.program.body[1].declarations[0].id.name;

eval(generator(new_ast).code)

traverse(ast,{

    "StringLiteral|NumericLiteral"(path){
        delete path.node.extra

    }
})
//字符解密还原
traverse(ast,{
    CallExpression(path){

        var node_ = path.node;
        // var parent_path = path.parentPath;
        if (node_.callee.name == func_name){
            let new_str = eval(path+"");
            path.replaceWith(t.stringLiteral(new_str))
            // if(t.isMemberExpression(parent_path)){
            //     parent_path.node.property = t.stringLiteral(new_str)
            // }else if(t.isAssignmentExpression(parent_path)){

            //     parent_path.node.right = t.stringLiteral(new_str)

            // }
            
            // parent_path.replaceWith(t.stringLiteral(new_str))

        }


    }

})


let {code} = generator(ast);

ast = parser.parse(code);

var total_obj = {};

//整合所有对象
function get_total_obj(ast){
    traverse(ast,{
        AssignmentExpression(path){
            var node_ = path.node;
    
            if(t.isMemberExpression(node_.left)){
    
                let tmp_obj_name = node_.left.object.name;
    
                let tmp_obj_proterty = node_.left.property.value;
    
                total_obj[tmp_obj_name] = total_obj[tmp_obj_name] || {};
    
                total_obj[tmp_obj_name][tmp_obj_proterty] = node_.right;
            }
    
    
        }
    })

    //解决对象重复赋值还原

    traverse(ast,{

        VariableDeclaration(path){
            var node_ = path.node;
            if(node_.declarations.length == 1){
                let vartor = node_.declarations[0]
                if(t.isIdentifier(vartor.init) && total_obj[vartor.init.name]){
                    if (total_obj[vartor.id.name]){
                        total_obj[vartor.id.name] = Object.assign(total_obj[vartor.id.name],total_obj[vartor.init.name])
                    }else{
                        total_obj[vartor.id.name] = total_obj[vartor.init.name]

                    }
                }

            }
        }
    })
}
get_total_obj(ast)

// console.log(total_obj)
//递归遍历找到最终节点
function get_real_func(tmp_node){
    if (t.isFunctionExpression(tmp_node)){
        var node_ = tmp_node;

        var func_body = node_.body.body;
        if (func_body.length == 1  && t.isReturnStatement(func_body[0])){
            var body_return = func_body[0];

            if (t.isCallExpression(body_return.argument) && t.isMemberExpression(body_return.argument.callee)){
                let tmp_obj_name = body_return.argument.callee.object.name;

                let tmp_obj_proterty = body_return.argument.callee.property.value;

                if(total_obj[tmp_obj_name][tmp_obj_proterty]){
                    return get_real_func(total_obj[tmp_obj_name][tmp_obj_proterty])

                }else{
                    total_obj[tmp_obj_name][tmp_obj_proterty]
                }


            }
        }    
    }
    return tmp_node
    
}

//遍历所有的function对象，还原对象互相应用的问题


traverse(ast,{
    FunctionExpression(path){
        var node_ = path.node;

        var func_body = node_.body.body;
        if (func_body.length == 1  && t.isReturnStatement(func_body[0])){
            var body_return = func_body[0];

            if (t.isCallExpression(body_return.argument) && t.isMemberExpression(body_return.argument.callee)){
                let tmp_obj_name = body_return.argument.callee.object.name;

                let tmp_obj_proterty = body_return.argument.callee.property.value;

                if(total_obj[tmp_obj_name][tmp_obj_proterty]){
                    let real_func = get_real_func(total_obj[tmp_obj_name][tmp_obj_proterty])
                    path.replaceWith(real_func)

                }

            }

        }


    }
});

code = generator(ast).code;

ast = parser.parse(code)

get_total_obj(ast);

//开始还原函数花指令  字符串应用

traverse(ast,{
    MemberExpression(path){
        var node_ = path.node;
        let tmp_obj_name = node_.object.name;
        let tmp_obj_proterty = node_.property.value;
        let tmp_node ;
        total_obj[tmp_obj_name] && total_obj[tmp_obj_name][tmp_obj_proterty] && (tmp_node=total_obj[tmp_obj_name][tmp_obj_proterty]);
        if (t.isStringLiteral(tmp_node) && !t.isAssignmentExpression(path.parentPath)){
            path.replaceWith(tmp_node)
        }


    }
})

//二项式函数调用

// traverse(ast,{
    
//     CallExpression(path){
//         var node_ = path.node;

//         var callee_ = node_.callee;
//         var func_arguments = node_.arguments;
//         if (t.isMemberExpression(callee_)){
//             let tmp_obj_name = callee_.object.name;
//             let tmp_obj_proterty =callee_ .property.value;
//             let tmp_node ;
//             total_obj[tmp_obj_name] && total_obj[tmp_obj_name][tmp_obj_proterty] && (tmp_node=total_obj[tmp_obj_name][tmp_obj_proterty]);
//             if (t.isFunctionExpression(tmp_node)){
//                 if (tmp_node.body.body.length ==1 && t.isReturnStatement(tmp_node.body.body[0])){

//                     let return_argument =  tmp_node.body.body[0].argument;
//                     if (!t.isBinaryExpression(return_argument)) return
//                     let return_opertator = return_argument.operator;
//                     let new_node = t.binaryExpression(return_opertator,func_arguments[0],func_arguments[1]);
//                     path.replaceWith(new_node);
//                     // console.log(tmp_node)


//                 }



//             }
//         }

//     }


// })


code = generator(ast).code;
fs.writeFileSync('./yuan_15_new.js',code);