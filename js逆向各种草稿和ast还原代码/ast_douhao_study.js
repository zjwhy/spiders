

let fs = require("fs");

let parser = require("@babel/parser");

let traverse = require("@babel/traverse").default;

let t = require("@babel/types");

let generator = require("@babel/generator").default;
const { exit } = require("process");

var jscode = `var big_arr = ["RGF0ZQ==", "cHJvdG90eXBl", "Zm9ybWF0", "5pel", "5LiA", "5LqM", "5LiJ", "5Zub", "5LqU", "5YWt", "cmVwbGFjZQ==", "Z2V0RnVsbFllYXI=", "Z2V0TW9udGg=", "dG9TdHJpbmc=", "MA==", "Z2V0RGF0ZQ==", "bG9n", "eXl5eS1NTS1kZA=="];

window[atob(big_arr[0])][atob(big_arr[1])][atob(big_arr[2])] = function (_Ox0seda19, _Ox0seda65, _Ox0seda17, _Ox0seda16) {
  return _Ox0seda65 = (_Ox0seda65 = (_Ox0seda65 = (_Ox0seda16 = (_Ox0seda17 = (_Ox0seda65 = _Ox0seda19, 50112 ^ 50122), [atob(big_arr[3]), atob(big_arr[4]), atob(big_arr[5]), atob(big_arr[6]), atob(big_arr[7]), atob(big_arr[8]), atob(big_arr[9])]), _Ox0seda65)[atob(big_arr[10])](/yyyy|YYYY/, this[atob(big_arr[11])]()), _Ox0seda65)[atob(big_arr[10])](/MM/, this[atob(big_arr[12])]() + (28309 ^ 28308) > (1228 ^ 1221) ? (this[atob(big_arr[12])]() + (1535 ^ 1534))[atob(big_arr[13])]() : atob(big_arr[14]) + (this[atob(big_arr[12])]() + (33749 ^ 33748))), _Ox0seda65)[atob(big_arr[10])](/dd|DD/, this[atob(big_arr[15])]() > (66146 ^ 66155) ? this[atob(big_arr[15])]()[atob(big_arr[13])]() : atob(big_arr[14]) + this[atob(big_arr[15])]()), _Ox0seda65;
};

console[atob(big_arr[16])](new window[atob(big_arr[0])]()[atob(big_arr[2])](atob(big_arr[17])));`

let ast = parser.parse(jscode,{sourceType:"module"})



//逗号表达式还原

traverse(ast,{

        SequenceExpression:{
            exit(path){
                let expressions = path.node.expressions
                let final_exp = expressions.pop()
                let statement_path = path.getStatementParent()
                // statement_path.insertBefore
                expressions.map((n)=>{
                    statement_path.insertBefore(n)

                })

                path.replaceInline(final_exp);

            }

        }

})

let {code} = generator(ast);
console.log(code)