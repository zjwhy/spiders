import requests,execjs,time

with open('yuan_16.js','r') as f:
    js_code = f.read()

js_obj = execjs.compile(js_code)




cookies = {
    "sessionid":"tow6o6n740c1l1xqjozzgyiob0t0yu0m"

    }
url = "https://www.python-spider.com/api/challenge16"
total = 0
for i in range(1,101):
    stamp = str(int(time.time()))
    token = js_obj.call("get_token",stamp)
    print(token)
    data = {
        "page":str(i)
    }
    headers = {
        "referer":"https://www.python-spider.com/challenge/16",
        "safe":token
    }
    resp = requests.post(url,data=data,cookies=cookies,verify=False,headers=headers)

    print(resp.json())
    for obj in resp.json()['data']:
        value_ = obj['value'].strip()


        total += int(value_)

print(total)

""