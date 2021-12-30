
import execjs,time,requests,json,re
from urllib.parse import quote_plus
import base64
with open('weibo_login.js','r') as f:
    js_code = f.read()




def get_pwd(pwd,rsakey,servetime,nonce):
    js_obj = execjs.compile(js_code)

    result = js_obj.call("get_pwd",pwd,rsakey,servetime,nonce)

    return result


def get_rsakey(account):
    stamp = int(time.time() *1000)


    headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Host": "login.sina.com.cn",
        "Referer": "https://weibo.com/",
        "sec-ch-ua": 'Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    }


    url = f"https://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su={account}&rsakt=mod&checkpin=1&client=ssologin.js(v1.4.19)&_={stamp}"
    resp = requests.get(url,headers=headers)
    html = resp.text.replace("sinaSSOController.preloginCallBack(","").replace(")","")

    # print(html)
    return json.loads(html)

def login(account,pwd,rsa_obj):

    data = {

        "entry": "weibo",
        "gateway": "1",
        "from": "",
        "savestate": "7",
        "qrcode_flag": "false",
        "useticket": "1",
        "pagerefer": "https://login.sina.com.cn/",
        "vsnf": "1",
        "su": account,
        "service": "miniblog",
        "servertime": rsa_obj['servertime'],
        "nonce": rsa_obj['nonce'],
        "pwencode": "rsa2",
        "rsakv": rsa_obj['rsakv'],
        "sp": pwd,
        "sr": "1920*1200",
        "encoding": "UTF-8",
        "prelt": "28",
        "url": "https://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack",
        "returntype": "META",
    }

    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "login.sina.com.cn",
        "Origin": "https://weibo.com",
        "Referer": "https://weibo.com/",
        "sec-ch-ua": 'Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "Sec-Fetch-Dest": "iframe",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    }

    url = "https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.19)"

    resp = requests.post(url,headers=headers,data=data)

    print(resp.text)


def get_img():
    img_headers = {
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "zh-CN,zh;q=0.9",
              "Cache-Control": "max-age=0",
              "Connection": "keep-alive",
              # "Cookie": "U_TRS1=0000001b.73949ad1.5faa2eb4.dd72b866; UOR=www.baidu.com,blog.sina.com.cn,; SINAGLOBAL=114.248.74.195_1604988597.946939; U_TRS2=00000049.428c980c.5fd34595.10931d2d; Apache=223.70.163.88_1607681797.997993; ULV=1609826382862:3:1:1:223.70.163.88_1607681797.997993:1607681797952; SCF=Ai_sbKbdbsFuVqcdiGHfU7rjkhdgu-ieGSl2TgLWxDU_y7tOqgX1LXWN1JOVhWnqdhc8d_uVsUz5Pt_hmVM5tRs.; SessionID=a4m6cs8ugsrtl8c3mbus252oj6; SUB=_2AkMXshtJdcPxrAZVkfgcxGLlaIVH-jykZ3K_An7tJhMyAhh77nYIqSVutBF-XCl2kcMq7P5T999nhDcrl_q2SRBQ; SUBP=0033WrSXqPxfM72wWs9jqgMF55529P9D9WhwI2BPWK3PJ4N.6l9K.PkM5JpVF02RSo2Eeh2R1hnX",
        "Host":"login.sina.com.cn",
                             "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
         }

    headers = {
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Host": "v2.qr.weibo.cn",
        "Referer": "https://passport.weibo.com/",
        "sec-ch-ua": 'Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "Sec-Fetch-Dest": "image",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    }
    headers['Cookie'] = "U_TRS1=0000001b.73949ad1.5faa2eb4.dd72b866; UOR=www.baidu.com,blog.sina.com.cn,; SINAGLOBAL=114.248.74.195_1604988597.946939; U_TRS2=00000049.428c980c.5fd34595.10931d2d; Apache=223.70.163.88_1607681797.997993; ULV=1609826382862:3:1:1:223.70.163.88_1607681797.997993:1607681797952; SCF=Ai_sbKbdbsFuVqcdiGHfU7rjkhdgu-ieGSl2TgLWxDU_y7tOqgX1LXWN1JOVhWnqdhc8d_uVsUz5Pt_hmVM5tRs.; SessionID=a4m6cs8ugsrtl8c3mbus252oj6; SUB=_2AkMXshtJdcPxrAZVkfgcxGLlaIVH-jykZ3K_An7tJhMyAhh77nYIqSVutBF-XCl2kcMq7P5T999nhDcrl_q2SRBQ; SUBP=0033WrSXqPxfM72wWs9jqgMF55529P9D9WhwI2BPWK3PJ4N.6l9K.PkM5JpVF02RSo2Eeh2R1hnX"
    img_json_url = f"https://login.sina.com.cn/sso/qrcode/image?entry=sso&size=180&service_id=pc_protection&callback=STK_{int(time.time()*1000)}"
    img_json_obj = requests.get(img_json_url,headers=img_headers)

    img_json_html = re.search("\{.+\}",img_json_obj.text).group()

    img_url = json.loads(img_json_html)['data']['image']
    img_obj = requests.get("https"+img_url[4:],headers=headers)
    with open("login.png",'wb') as f:
        f.write(img_obj.content)
    # print(img_url)
    # url = "https://v2.qr.weibo.cn/inf/gen?api_key=a0241ed0d922e7286303ea5818292a76&data=https%3A%2F%2Fpassport.weibo.cn%2Fsignin%2Fqrcode%2Fscan%3Fqr%3D2ZTZg7pT5AAN-aLc8scpdOYlMxHNPOKR9BnFyY29kZQ..%26sinainternalbrowser%3Dtopnav%26showmenu%3D0&datetime=1626248441&deadline=0&level=M&logo=http%3A%2F%2Fimg.t.sinajs.cn%2Ft6%2Fstyle%2Fimages%2Findex%2Fweibo-logo.png&output_type=img&redirect=0&sign=845e56b85f3f150853334bf27d3e8a26&size=180&start_time=0&title=sso&type=url"
    # url = "https://v2.qr.weibo.cn/inf/gen?api_key=a0241ed0d922e7286303ea5818292a76&data=https%3A%2F%2Fpassport.weibo.cn%2Fsignin%2Fqrcode%2Fscan%3Fqr%3D2ZTZg7pT5AAN-aLc8scpdOYlMxHNPOKR9BnFyY29kZQ..%26sinainternalbrowser%3Dtopnav%26showmenu%3D0&datetime=1626248441&deadline=0&level=M&logo=http%3A%2F%2Fimg.t.sinajs.cn%2Ft6%2Fstyle%2Fimages%2Findex%2Fweibo-logo.png&output_type=img&redirect=0&sign=845e56b85f3f150853334bf27d3e8a26&size=180&start_time=0&title=sso&type=url"
    # url = "https://v2.qr.weibo.cn/inf/gen?api_key=a0241ed0d922e7286303ea5818292a76&data=https%3A%2F%2Fpassport.weibo.cn%2Fsignin%2Fqrcode%2Fscan%3Fqr%3D2Y2Rg7pmAAAM4ey10YvtyoCSDhqXc0Pu4BnFyY29kZQ..%26sinainternalbrowser%3Dtopnav%26showmenu%3D0&datetime=1626249600&deadline=0&level=M&logo=http%3A%2F%2Fimg.t.sinajs.cn%2Ft6%2Fstyle%2Fimages%2Findex%2Fweibo-logo.png&output_type=img&redirect=0&sign=64310c035c3617a92ec2cdee26387eb2&size=180&start_time=0&title=sso&type=url"
    print()
account = "xxxx"
pwd = "xxx."

# get_img()
base_account = base64.b64encode(quote_plus(account).encode()).decode()

rsa_obj = get_rsakey(base_account)

rsa_key = rsa_obj['pubkey']

servertime = rsa_obj['servertime']

nonce = rsa_obj['nonce']

rsakv = rsa_obj['rsakv']
rsa_pwd = get_pwd(pwd,rsa_key,servertime,nonce)

login(base_account,rsa_pwd,rsa_obj)
