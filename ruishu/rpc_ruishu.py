import requests


headers= {
    # "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"

}

cookies = "FSSBBIl1UgzbN7N80S=5xdiDtWZAgwcKZYVcrux00LfqpGrFPZUZn.MccUxh2j9Re1Nc.YrYECi0ewl1tFu; "


rpc_url = "http://127.0.0.1:5620/business-demo/invoke?group=test_rs4&action=rs_test&method=POST&url=/service/getNewsList.action"
rpc_json = requests.get(rpc_url).json()
print(rpc_json)
cookies += rpc_json['cookie']


post_url = rpc_json['mmew']

headers['cookie'] = cookies

data = {
"title": "",
"currentPage": "1",
"typea": "3b88037bb8b3f908"

}
print(headers)
resp = requests.post(post_url,data=data,headers=headers)

print(resp.status_code,resp.text)