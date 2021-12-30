import requests,execjs
from lxml import etree
sess =  requests.session()
url = "https://www.python-spider.com/challenge/11"

cookie ={
        "sessionid":"zwg22z4bvin5v48i0ysyq7opix13h6tn",
    # "__jsl_clearance":"1639386449.773|0|clD4VpfqhdaLBWywKWy%2FZyfi6d_48668ca82413ab0887c7c9f26196229a3D"
    # "__jsl_clearance":"1639386869.591|0|clD4VpfqhdaLBWywKWy%2FZyfi6d_7cece8ae2ad1f4086bc4bd8afbca75c83D"
}
headers = {

    "referer": "https://www.python-spider.com/challenge/11"
}
resp = sess.get(url,cookies=cookie,verify=False)

hj_js = """

var document = {};
document.attachEvent= function(a,b){debugger;}
setTimeout = function(){};
document.createElement = function(v){
    return {
        firstChild:{
            href:"https://www.python-spider.com/challenge/11"
        }
    }

}
location = {"ancestorOrigins":{},"href":"https://www.python-spider.com/challenge/11","origin":"https://www.python-spider.com","protocol":"https:","host":"www.python-spider.com","hostname":"www.python-spider.com","port":"","pathname":"/challenge/11","search":"","hash":""};


"""

add_js = """

function get_cookie(){
    _N();

    return document.cookie;
}
"""
js_code = ""
js_code += hj_js
resp_js = resp.text.replace('<script>','').replace('</script>','')

js_code += resp_js
js_code += add_js

js_obj = execjs.compile(js_code)

jsl = js_obj.call("get_cookie")


jsl_key,jsl_value = jsl.split(";")[0].split("=")

cookie[jsl_key] = jsl_value


# print(cookie)


# jsl = input("输入cookie")
# print(jsl)
# cookie['__jsl_clearance'] = jsl
#
resp = sess.get(url,cookies=cookie,verify=False,headers=headers)
#
# print(resp.text)


html = etree.HTML(resp.text)

info_list = html.xpath('//td[@class="info"]/text()')

print(info_list)
total = 0
for info in info_list:
    n = int(info.strip())

    total += n

print(total)