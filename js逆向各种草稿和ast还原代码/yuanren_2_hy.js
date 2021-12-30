const fs = require('fs');

let t =  require('@babel/types')

let traverse = require("@babel/traverse").default

let parser = require("@babel/parser")

let generator = require("@babel/generator").default

const js_code = fs.readFileSync('./yuanren_hx.js',{encoding:"utf8"})

let ast = parser.parse(js_code);

let decode_ast = parser.parse("");

decode_ast.program.body = ast.program.body.slice(0,5)

let decode_js_code = generator(decode_ast).code

let new_code ;
// console.log(decode_js_code)
eval(decode_js_code)


var total_obj = {};
//提取$dbsm_0x37d29a里面的所有字符串然后集合到一起

traverse(ast,{

    FunctionDeclaration(path){
        let p_name = path.node.id.name;
        
        if (p_name =="$dbsm_0x37d29a"){
            path.traverse({
                
                
                ExpressionStatement(c_path){
                    total_obj[p_name] = total_obj[p_name] || {};

                    let express = c_path.node.expression.expressions;

                    express &&express.map(n=>{

                        if (t.isIdentifier(n.left) ){
                            let left_name = n.left.name;
                            if (t.isStringLiteral(n.right) || t.isNumericLiteral(n.right)){
                                total_obj[p_name][left_name] = n.right;

                            }

                            
                        }

                    })
                }


            })

        }

        

    }
})

//还原func里面的二项式

traverse(ast,{

    FunctionDeclaration(path){
        let p_name = path.node.id.name;
        
        if (p_name =="$dbsm_0x37d29a"){
            path.traverse({
                
                
                BinaryExpression(c_path){
                    let binary_node = c_path.node;

                    if(t.isIdentifier(binary_node.left)){
                        rep_ = total_obj[p_name][binary_node.left.name];
                        let new_rep ;

                        rep_ && (new_rep = eval(generator(t.BinaryExpression(binary_node.operator,rep_,binary_node.right)).code));

                        if (typeof new_rep == "number"){
                            c_path.replaceWith(t.numericLiteral(new_rep))


                        }else if (typeof new_rep =="string"){

                            c_path.replaceWith(t.stringLiteral(new_rep))

                        }


                    } 
                }


            })

        }

        

    }
})


//提取$dbsm_0x37d29a里面的所有字符串然后集合到一起

traverse(ast,{

    FunctionDeclaration(path){
        let p_name = path.node.id.name;
        
        if (p_name =="$dbsm_0x37d29a"){
            path.traverse({
                
                
                ExpressionStatement(c_path){
                    total_obj[p_name] = total_obj[p_name] || {};

                    let express = c_path.node.expression.expressions;

                    express &&express.map(n=>{

                        if (t.isIdentifier(n.left) ){
                            let left_name = n.left.name;
                            if (t.isStringLiteral(n.right) || t.isNumericLiteral(n.right)){
                                total_obj[p_name][left_name] = n.right;

                            }

                            
                        }

                    })
                }


            })

        }

        

    }
})
// console.log(total_obj)


// $$dbsm_0x42c3 func调用 的还原
traverse(ast,{

    CallExpression(path){

        var node_ = path.node;
        // console.log( node_.callee.name)
        var callee_name = node_.callee.name;

        if (callee_name == "$dbsm_0x42c3"){

            var callee_args = node_.arguments;

            node_.arguments[0] = total_obj["$dbsm_0x37d29a"][callee_args[0].name];
            node_.arguments[1] = total_obj["$dbsm_0x37d29a"][callee_args[1].name];


            // var new_str = "";
            try {
                var new_str = eval(path+"");

                path.replaceWith(t.stringLiteral(new_str))
            } catch (error) {
                
            }
            
        }

    }
})

//调用还原


traverse(ast,{

    BinaryExpression(path){
        try {
            if (!t.isIdentifier(path.node.left) &&  !t.isIdentifier(path.node.right)){

                let new_bin = eval(path+"");

                if (typeof new_bin == "number"){
                    path.replaceWith(t.numericLiteral(new_bin))
                }else if(typeof new_bin == "string"){
                    path.replaceWith(t.stringLiteral(new_bin))
                }


            }
        } catch (error) {
            
        }
        

    }
})

//dbsm_0x37d29a 整合对象
traverse(ast,{

    FunctionDeclaration(path){
        let p_name = path.node.id.name;
        
        if (p_name =="$dbsm_0x37d29a"){
            path.traverse({
                
                
                ExpressionStatement(c_path){
                    total_obj[p_name] = total_obj[p_name] || {};

                    let express = c_path.node.expression.expressions;

                    express &&express.map(n=>{

                        if(t.isAssignmentExpression(n)){
                            if (t.isIdentifier(n.left)){
                                total_obj[p_name][n.left.name] = total_obj[p_name][n.left.name] || {};

                            }else if(t.isMemberExpression(n.left) && n.left.property){
                                total_obj[p_name][n.left.object.name] =  total_obj[p_name][n.left.object.name] || {};

                                total_obj[p_name][n.left.object.name][n.left.property.value] = total_obj[p_name][n.left.object.name][n.left.property.value] || n.right;



                            }

                        }

                    })
                }


            })

        }

        

    }
})


new_code = generator(ast).code

console.log(total_obj)

fs.writeFileSync('./yuanren_hy_new.js',new_code)