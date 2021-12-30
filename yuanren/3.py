import execjs,requests

with open('y_3_new.js','r') as f:

    js_code = f.read()



def get_m():

    js_obj = execjs.compile(js_code)

    return js_obj.call("my_m")


cookies ={
    "sessionid":"37sj5cs1bj3zejhqjl90mpr55szngv0t"
}
url = "https://www.python-spider.com/api/challenge3"
total = 0
for i in range(1,101):
    data ={
        "page":str(i)
    }
    m = get_m()
    cookies['m'] = m
    resp = requests.post(url,data=data,cookies=cookies,verify=False).json()
    for obj in resp['data']:
        value = obj['value'].replace('\r','').strip()
        total += int(value)

print(total)