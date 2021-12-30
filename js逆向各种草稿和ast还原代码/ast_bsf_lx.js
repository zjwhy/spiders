const fs = require('fs');

const t = require("@babel/types")

const parser = require("@babel/parser")

const {default:generator} = require("@babel/generator")

const traverse = require("@babel/traverse").default;

const jscode = `
    var a =100;

    var b = 1000;
    
    var cbd = function(a,b){
        return a + b
    }
    
    cbd(a,b)
    
    function abc(a,b){
    
        function test(a,b){
            return a + b
        }
        test(a,b)
      return a + b
    }
    
    
    abc(a,b)

`

let ast = parser.parse(jscode)

traverse(ast,{
    "Program|FunctionExpression|FunctionDeclaration"(path){
        let own_binding_obj = {},no_own_bind_obj={},i=0;

        path.traverse({

            Identifier(p){
                let name_ = p.node.name;
                let own_binding = p.scope.getOwnBinding(name_)
                
                own_binding && (generator(p.scope.block).code==path +"")?own_binding_obj[name_] = own_binding:no_own_bind_obj[name_] = 1
               
            }
        })
        for (let key in own_binding_obj){
            do{
                var new_name = "O0xeb697"+i++
            }while(no_own_bind_obj[new_name])
            own_binding_obj[key].scope.rename(key,new_name)
        }
    }
    

})

let new_code = generator(ast).code


fs.writeFileSync('./bsf_new.js',new_code,{encoding:"utf8"})