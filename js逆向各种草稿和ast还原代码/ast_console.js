let parse = require("@babel/parser")


let t = require("@babel/types")

let generator = require("@babel/generator").default


let calle = t.memberExpression(t.identifier("console"),t.identifier("log"))

let callexperssion = t.callExpression(calle,[t.stringLiteral("xxxxx")])

let expressionStatement = t.expressionStatement(callexperssion)

let {code} = generator(expressionStatement)

console.log(code)