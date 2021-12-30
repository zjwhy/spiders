let fs = require("fs");

let parser = require("@babel/parser");

let traverse = require("@babel/traverse").default;

let t = require("@babel/types");

let generator = require("@babel/generator").default;

let js_code = fs.readFileSync('./qiche_cap.js',{encoding:'utf8'})

let ast = parser.parse(js_code,{sourceType:"module"})

// let _0xodo = ast.program.body[1].declarations[0];
let string_list = ast.program.body[1]

let string_dec = ast.program.body[2]

let func_dec = ast.program.body[3]

let func_dec_name = ast.program.body[3].declarations[0].id.name;

let parse_ast = parser.parse('');

parse_ast.program.body.push(string_list);

parse_ast.program.body.push(string_dec);

parse_ast.program.body.push(func_dec);

eval(generator(parse_ast).code)


//字符串加密还原

traverse(ast,{

    VariableDeclarator(path){
        if (path.node.id.name ==func_dec_name){
            let binding = path.scope.getBinding(func_dec_name)

            binding && binding.referencePaths.map((n)=>{
                n.parentPath.isCallExpression() && n.parentPath.replaceWith(t.stringLiteral(eval(n.parentPath+"")))

            })
        }

    }
})

let new_code = generator(ast).code;

//提取所有对象到一个对象里面
let total_obj = {}

function get_total_obj(ast){

    traverse(ast,{

        VariableDeclarator(path){
            if (t.isObjectExpression(path.node.init)){
    
                let obj_name = path.node.id.name;
                total_obj[obj_name] = total_obj[obj_name] || {}
                path.node.init.properties.map((n)=>{
    
                    let key_value = n.key.value;
                    total_obj[obj_name][key_value] = n.value
    
                })
    
            }
    
        }
    
    })
}

get_total_obj(ast)


//递归找到相应最终的节点值

function find_real(node_){


    if (t.isMemberExpression(node_)){

        let obj_name = node_.object.name

        let f_name = node_.property.value;
        let replace_node;
        total_obj[obj_name] && total_obj[obj_name][f_name] && (replace_node = total_obj[obj_name][f_name] );
        if(replace_node){


            return find_real(replace_node)

        }else{

            return false
        }
   
    
    }else{

        return node_


    }
}

traverse(ast,{

        MemberExpression(path){
            let obj_name = path.node.object.name;

            let f_name = path.node.property.value;

            let replace_node = total_obj[obj_name]? total_obj[obj_name][f_name]:null
            if(replace_node){
                let real_node = find_real(replace_node)

                real_node && t.isStringLiteral(real_node) && path.replaceWith(real_node)
                

            }


        }


})

//二次整合所有对象
get_total_obj(ast)

//开始还原字符串花指令
traverse(ast,{

    MemberExpression(path){
        let obj_name = path.node.object.name;

        let f_name = path.node.property.value;

        let replace_node = total_obj[obj_name]? total_obj[obj_name][f_name]:null
        

        replace_node && t.isStringLiteral(replace_node) && path.replaceWith(replace_node)
            
    }


})

//函数表达式花指令处理 先递归找到最终节点

function find_func(node){
    if(t.isFunctionExpression(node)){
        if (node.body.body.length==1){
            let callee = node.body.body[0].argument.callee
            if (callee && t.isMemberExpression(callee)){
                let node_ ;
                let obj_name = callee.object.name;

                let f_name = callee.property.value;
                total_obj[obj_name] && total_obj[obj_name][f_name] && (node_ = total_obj[obj_name][f_name] );
                if (node_){
                    return find_real(callee)

                }
                
            }

        }
    }
    return node

}

traverse(ast,{


    VariableDeclarator(path){
        if (t.isObjectExpression(path.node.init)){

            // let obj_name = path.node.id.name;
            // total_obj[obj_name] = total_obj[obj_name] || {}
            path.node.init.properties.map((n)=>{
                let real = find_func(n.value);

                real && (n.value = real)
                
            })

        }

    }

})

get_total_obj(ast)


//正式还原函数花指令

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
new_code = generator(ast).code;
ast = parser.parse(new_code);

//出去花指令后删除没有应用的节点
traverse(ast,{

    VariableDeclarator(path){

        if(t.isObjectExpression(path.node.init)){
            let bind = path.scope.getBinding(path.node.id.name)
         
            bind.constant && !bind.referenced && path.remove()

            // console.log(bind)

        }


    }

})

//  swith 语句还原
for (var i=0;i< 10;i++){
    
    traverse(ast,{

        MemberExpression(path){
    
                if(t.isStringLiteral(path.node.object) && path.node.property.value =="split"){
                    let fenfa_arr = path.node.object.value.split("|");
                    let var_path = path.findParent((n)=>{return t.isVariableDeclaration(n)});
                    let while_sta = var_path.getSibling(var_path.key+2);
                    let my_arr = [];

                    while_sta && t.isWhileStatement(while_sta) && while_sta.node.body.body[0].cases.map((n)=>{

                        my_arr[n.test.value] = n.consequent[0]
    
    
                    })
                   
                    
    
                    let parent_path = while_sta.parent;
    
                    var_path.remove();
    
                    while_sta.remove();
    
                    fenfa_arr.map((n)=>{
    
    
                        parent_path.body.push(my_arr[n])
    
    
                    })
    
                    path.stop()
    
    
                }
    
    
        }
    
    })

}

fs.writeFileSync('./qiche_new.js',new_code)