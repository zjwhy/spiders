
import requests

real_name = {
    "e458":1,
    "f375":2,
    "f80c":3,
    "f12f":4,
    "ee4a":5,
    "f295":6,
    "e449":7,
    "f0d6":8,
    "e44d":9,
    "f712":0

}
cookies = {
    "sessionid":"z5b5tcbvpz5eb3dp1tw5gui6t2jwxsiy"

    }
url = "https://www.python-spider.com/api/challenge12"
total = 0
for i in range(1,101):
    data = {
        "page":str(i)
    }
    resp = requests.post(url,data=data,cookies=cookies,verify=False)


    for obj in resp.json()['data']:
        value_list = obj['value'].strip().replace("&#x","").split(" ")
        tmp_str =""
        for value in value_list:
            tmp_str += str(real_name[value])


        total += int(tmp_str)

print(total)