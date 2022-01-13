import requests,re
from requests.utils import dict_from_cookiejar




url ="http://www.fangdi.com.cn/"

headers={

    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
}

resp = requests.get(url,headers=headers)

ts_url = "http://www.fangdi.com.cn/4QbVtADbnLVIc/d.FxJzG50F.dfe1675.js"

re_js = re.search('<meta content=".+\}\}\}\}\}\}\}\}\)\(\)</script>',resp.text)
with open('test_js.html','w') as w:
    w.write(re_js.group())

print(dict_from_cookiejar(resp.cookies))

# resp_2 = requests.get(ts_url,headers=headers)
# print(resp_2.text)