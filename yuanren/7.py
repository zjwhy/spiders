import requests
from requests.cookies import cookiejar_from_dict
from requests.utils import CaseInsensitiveDict
base_url = "https://www.python-spider.com/challenge/7"

url = "https://www.python-spider.com/api/challenge7"
headers = {
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
        'Accept-Encoding': ', '.join(('gzip', 'deflate')),
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'referer': 'https://www.python-spider.com/challenge/7'

}
sess = requests.session()
sess.cookies = cookiejar_from_dict({
    "sessionid":"z5b5tcbvpz5eb3dp1tw5gui6t2jwxsiy"
})



sess.headers = CaseInsensitiveDict(headers)

resp = sess.get(base_url,verify=False)

print(resp.text)

resp = sess.post(url,data={"page":"1"},verify=False)

print(resp.json())