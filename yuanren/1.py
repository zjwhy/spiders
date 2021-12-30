import time,requests,hashlib,binascii,base64


url = 'https://www.python-spider.com/challenge/api/json?page={}&count=14'





cookies = {
    "sessionid":"6xhfte4jj5f7o3znv6mjhcrf42wl0lww"
}


total= 0
for i in range(1,86):
    stamp = int(time.time())

    md5_str = base64.b64encode(("9622" + str(stamp)).encode())

    safe = hashlib.new('md5',md5_str).hexdigest()
    headers = {
        "timestamp": str(stamp),
        "safe":safe,
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"

    }
    resp = requests.get(url.format(i),headers=headers,cookies=cookies).json()
    try:
        print(i)
        for obj in resp['infos']:
            if "招" in obj['message']:total +=1
    except:
        print(resp)
print(total)


