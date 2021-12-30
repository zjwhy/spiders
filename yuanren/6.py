
import requests
url = "https://www.python-spider.com/api/challenge6"

sess = requests.session()

total = 0
for i in range(1,101):
    data = {"page":str(i)}

    resp = sess.post(url,data=data,verify=False)

    body = resp.json()
    print(body['data'])
    for obj in body['data']:
        value = obj['value'].strip()
        total += int(value)


print(total)

