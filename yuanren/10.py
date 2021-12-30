import requests,httpx,time

url = "https://www.python-spider.com/api/challenge7"


headers= {
'method':'POST',
'authority':'www.python-spider.com',
'scheme':'https',
'path':'/api/challenge7',
'pragma':'no-cache',
'cache-control':'no-cache',
'sec-ch-ua':'"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
'accept':'application/json, text/javascript, */*; q=0.01',
'x-requested-with':'XMLHttpRequest',
'sec-ch-ua-mobile':'?0',
'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
'origin':'https://www.python-spider.com',
'sec-fetch-site':'same-origin',
'sec-fetch-mode':'cors',
'sec-fetch-dest':'empty',
'referer':'https://www.python-spider.com/challenge/7',
'accept-encoding':'gzip, deflate, br',
'accept-language':'zh-CN,zh;q=0.9',

}
cookies = {
'Hm_lvt_337e99a01a907a08d00bed4a1a52e35d':'1636688152',
'no-alert':'true',
'm':'pua',
'sessionid':'sur80z2538ws1ws0mdmjvc6nyv8hpmhn',
'Hm_lpvt_337e99a01a907a08d00bed4a1a52e35d':'1638352931',
}

for i in range(1,5):
    post_data = {
        "page":"1",

    }
    cookies['Hm_lvt_337e99a01a907a08d00bed4a1a52e35d'] = str(int(time.time()))
    cookies['Hm_lpvt_337e99a01a907a08d00bed4a1a52e35d'] = str(int(time.time())+10)
    resp = requests.post(url,headers=headers,data=post_data,verify=False)


    print(resp.text)
    break