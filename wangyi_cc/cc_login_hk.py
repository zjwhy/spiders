import execjs,requests,json,random
from urllib.parse import quote_plus,urlencode
from PIL import Image
import cv2,io,time
import numpy as np
from requests.utils import cookiejar_from_dict,dict_from_cookiejar
from wangyi_hk_.drag_detector import detection
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
with open('wangyi_ck.js', 'r') as f:
    ck_code_js = f.read()

with open('wangyi_hk_cb.js', 'r') as f:
        cb_code_js = f.read()

with open('wangyi_hk.js', 'r') as f:
    hk_gj_code_js = f.read()

with open("wangyi_d.js",'r') as f:
    d_code_js = f.read()

with open("wangyi_jsf_2.js",'r') as f:
    jsf_code_js = f.read()

with open("wangyi_fp.js",'r') as f:
    fp_code_js = f.read()

with open("wangyi_nike.js",'r') as f:
    nike_code_js = f.read()

with open("wangyi_pwd.js",'r') as f:
    pwd_code_js = f.read()

# with open('wangyi_validate.js', 'r') as f:
#     alidate_code_js = f.read()

actoken_code_js = None
drag_x = None

def get_validate(data_str):
    js_obj = execjs.compile(hk_gj_code_js)

    return js_obj.call("get_validate", data_str)

def get_pwd(pwd):
    js_obj = execjs.compile(pwd_code_js)

    return js_obj.call("get_pwd", pwd)


def get_nike(data_str):
    js_obj = execjs.compile(nike_code_js)

    return js_obj.call("get_nike",data_str)

def get_fp(ua):
    js_obj = execjs.compile(fp_code_js)

    return js_obj.call("get_fp",ua)

def get_tid():
    js_obj = execjs.compile(jsf_code_js)

    return js_obj.call("my_rtid")

def get_d():
    js_obj = execjs.compile(d_code_js)

    return js_obj.call("get_my_d")

def init_config():
    global actoken_code_js
    img_headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
    }
    url = "https://webzjac.reg.163.com/v2/d"
    d_str = get_d()
    print(d_str)
    data = {
        "d": d_str,
        "v": "c0bda046",
        "cb": "_WM_",

    }
    resp = requests.post(url,headers=img_headers,verify=False,data=data)
    resp_json = json.loads(resp.text.replace("_WM_(","").replace(")",""))
    print(resp_json)
    with open('wangyi_watchm_actoken.js', 'r') as f:
        actoken_code_js = f.read()

        actoken_code_js = actoken_code_js.replace("zj_tihuan_oa", resp_json['result']['dt']).replace("zj_tihuan_ya",resp_json['result']['tid']).replace("zj_tihuan_kb",resp_json['result']['ni'])
        # actoken_code_js = actoken_code_js.replace("zj_tihuan_oa", "/GG9W8Nus8xERRBBEAM/i1swgFxYVvGy")
    return resp_json
def get_cookie():



    js_obj = execjs.compile(ck_code_js)

    return js_obj.call("getCookie").split("&&&&&")

def get_cb():


    js_obj = execjs.compile(cb_code_js)

    return js_obj.call("get_my_uuid")

def get_hk_p(js_token,gj_str):
    js_obj = execjs.compile(hk_gj_code_js)

    return js_obj.call("my_hk_gj",js_token,gj_str)

def get_hk_da(data_str):
    js_obj = execjs.compile(hk_gj_code_js)

    return js_obj.call("my_hk_encrypt_da", data_str)

def get_callback():
    js_code = """
        function get_callback(){
            return Math.random().toString(36).slice(2, 9);
        }
        
    """
    js_obj = execjs.compile(js_code)

    return js_obj.call("get_callback")

def get_actoken():
    js_obj = execjs.compile(actoken_code_js)

    return js_obj.call("my_actoken")




def get_img_url(get_img_url:str,parmas:dict):
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"

    }
    resp = requests.get(get_img_url,headers=headers,params=parmas,verify=False)

    return json.loads(resp.text.replace(f"{parmas['callback']}(","").replace(")","").replace(";",""))

def get_img_byte(img_url:str):
    img_headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
    }
    resp = requests.get(img_url,headers=img_headers,verify=False)

    return resp.content

# drag_x = []
# b = []


def img_show(response_byte):
    def on_EVENT_LBUTTONDOWN(event, x, y, flags, param):
        global drag_x
        if event == cv2.EVENT_LBUTTONDOWN:
            xy = "%d,%d" % (x, y)
            drag_x = x
            # a.append(x)
            # b.append(y)
            cv2.circle(img, (x, y), 1, (0, 0, 255), thickness=-1)
            cv2.putText(img, xy, (x, y), cv2.FONT_HERSHEY_PLAIN,
                        1.0, (0, 0, 0), thickness=1)
            # print(img)
            cv2.imshow("capture_img", img)
    bytes_stream = io.BytesIO(response_byte)
    capture_img = Image.open(bytes_stream)
    capture_img_y,capture_img_x = capture_img.size
    # cv.imshow('resize0', img_test1)

    capture_img = cv2.cvtColor(np.asarray(capture_img), cv2.COLOR_RGB2BGR)
    capture_img = cv2.resize(src=capture_img, dsize=(220, 110))

    img = capture_img
    cv2.namedWindow("capture_img")
    cv2.setMouseCallback("capture_img", on_EVENT_LBUTTONDOWN)
    cv2.imshow("capture_img", capture_img)
    cv2.waitKey(0)
    return drag_x
# drag_x = 138

def hk_gj(img_token,drag_x):
    # global  drag_x

    pj = drag_x / 50 if drag_x > 50 else 1
    time_pj = random.randint(1500,2500) / 50
    sc_jl = pj + 3
    sc_time = 7 +time_pj
    gj_enrypt_list = []
    for i in range(50):
        fd_y = random.randint(0,1)

        if i ==0:
            hd_jl = 3
            time_ = 7
        else:
            hd_jl = round(random.uniform(sc_jl,sc_jl + pj))

            time_ = round(random.uniform(sc_time,sc_time + time_pj))
            sc_jl = sc_jl + pj
            sc_time = sc_time + time_pj
        js_hk_da = f"{hd_jl},{fd_y},{time_}"
        # print(js_hk_da)
        js_hk_da_str = get_hk_p(img_token,js_hk_da)
        gj_enrypt_list.append(js_hk_da_str)

    js_p_str = str((drag_x / 220) *100)
    # print(js_p_str)
    js_p_ = get_hk_p(img_token,js_p_str)
    js_ext_str = f"1,{int(drag_x*0.92)}"

    js_ext_ = get_hk_p(img_token,js_ext_str)

    return gj_enrypt_list,js_p_,js_ext_


def go_check(data):
    img_headers = {

        "User-Agent": ua
    }
    url = f"https://webzjcaptcha.reg.163.com/api/v2/check"
    tid_url = "https://webzjac.reg.163.com/v2/b"
    tid_json = requests.post(tid_url,headers=img_headers,verify=False)
    tid_obj = json.loads(tid_json.text.replace("null(","").replace(")",""))
    tid = tid_obj['result']['tid']

    check_resp = requests.get(url, headers=img_headers,params=data,verify=False)
    print(check_resp.text)
    check_obj = json.loads(check_resp.text.replace(f"{hk_check_data['callback']}(","").replace(");",""))
    check_token = check_obj['data']['token']
    check_validate = check_obj['data']['validate']

    return tid,check_token,check_validate

def login(account,pwd,ua,login_cookies:dict,check_validate):
    rtid =get_tid()
    utid = get_tid()
    login_cookies['utid'] = utid
    login_headers = {
        "User-Agent": ua,

    }
    l_params = {
        "pd":"cc",
        "pkid":"PFClpTB",
        "pkht":"cc.163.com",
        "channel":"0",
        "topURL": "https://cc.163.com/category/live/",
        "rtid":rtid,
        "nocache": str(int(time.time()*1000)),
    }
    l_s_ccPFClpTB_url = "https://dl.reg.163.com/dl/ini"
    ini_resp = requests.get(l_s_ccPFClpTB_url,headers=login_headers,params=l_params,verify=False)
    ini_cookies = dict_from_cookiejar(ini_resp.cookies)
    login_cookies = dict(login_cookies,**ini_cookies)

    hk_validate_url = "https://dl.reg.163.com/dl/vftcp"
    validate_str = f"{check_validate}::{login_cookies['gdxidpyhxdE']}"
    encode_validate = get_validate(validate_str)
    print(encode_validate)
    hk_validate_params = {
        'n': account,
        'capkey': '744e2a6324ec5370616241baf4507538',
        'pd': 'cc',
        'pkid': 'PFClpTB',
        'cap': encode_validate,
        'channel': '0',
        'topURL': 'https://cc.163.com/category/live/',
        'rtid': rtid,
        'nocache': f'{int(time.time()*1000)}',
    }
    hk_validate_headers ={
        'Host': 'dl.reg.163.com',
        'Connection': 'keep-alive',
        'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://dl.reg.163.com/webzj/v1.0.1/pub/index2_new.html?cd=https%3A%2F%2Fcc.res.netease.com%2F_next%2F_static%2Fstatic%2Fstyles%2F&cf=urs_component.css%3Fversion%3D20190904&MGID=1628838043271.5217&wdaId=&pkid=PFClpTB&product=cc',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    hk_validate_resp = requests.get(hk_validate_url,headers=hk_validate_headers,cookies=login_cookies,params=hk_validate_params,verify=False)
    # print(hk_validate_resp.text)

    tk_url = "https://dl.reg.163.com/dl/gt"
    tk_params = {
        "un": account,
        "pkid": "PFClpTB",
        "pd": "cc",
        "channel": "0",
        "topURL": "https://cc.163.com/category/live/",
        "rtid": rtid,
        "nocache":  str(int(time.time()*1000)),
    }
    tk_resp = requests.get(tk_url,headers=login_headers,cookies=login_cookies,params=tk_params,verify=False)
    tk = tk_resp.json()['tk']
    # print(tk)
    login_url = "https://dl.reg.163.com/dl/l"
    encode_pwd = get_pwd(pwd)
    login_json = {
        "un":account,
        "pw":encode_pwd,
        "pd":"cc","l":1,"d":30,"t":int(time.time()*1000),"pkid":"PFClpTB","domains":"",
        "tk":tk,"pwdKeyUp":0,"channel":0,
        "topURL":"https://cc.163.com/category/live/",
        "rtid":rtid
    }
    go_login_headers ={
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        # 'Content-Length': '427',
        'Content-Type': 'application/json',
        'Host': 'dl.reg.163.com',
        'Origin': 'https://dl.reg.163.com',
        'Referer': 'https://dl.reg.163.com/webzj/v1.0.1/pub/index2_new.html?cd=https%3A%2F%2Fcc.res.netease.com%2F_next%2F_static%2Fstatic%2Fstyles%2F&cf=urs_component.css%3Fversion%3D20190904&MGID=1628838043271.5217&wdaId=&pkid=PFClpTB&product=cc',
        'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        # 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
        'User-Agent': ua
    }
    login_resp = requests.post(login_url,headers=go_login_headers,json=login_json,verify=False,cookies=login_cookies)

    print(login_resp.text)


if __name__ == '__main__':
    fp_cookie,ua = get_cookie()
    callback_name = get_callback()
    # print(fp_cookie,ua)
    cb = get_cb()
    headers = {
        "Host":"webzjcaptcha.reg.163.com",
        "Connection":"keep-alive",
        "sec-ch-ua":'Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile":"?0",
        "User-Agent":ua,
        "Accept":"*/*",
        "Sec-Fetch-Site":"same-site",
        "Sec-Fetch-Mode":"no-cors",
        "Sec-Fetch-Dest":"script",
        "Referer":"https://dl.reg.163.com/",
        "Accept-Encoding":"gzip, deflate, br",
        "Accept-Language":"zh-CN,zh;q=0.9",
    }
    get_hk_url = "https://webzjcaptcha.reg.163.com/api/v2/get"
    parmas = {

        "referer":"https://dl.reg.163.com/webzj/v1.0.1/pub/index2_new.html",
        "zoneId":"CN31",
        "id":"744e2a6324ec5370616241baf4507538",
        "fp":fp_cookie,
        "https":"true",
        "type":"2",
        "version":"2.15.2",
        "dpr":"1",
        "dev":"1",
        "cb":cb,
        "ipv6":"false",
        "runEnv":"10",
        "group":"",
        "scene":"",
        "width":"220",
        "audio":"false",
        "token":"",
        "callback":f"__JSONP_{callback_name}_{random.randint(1,20)}",
    }

    img_json = get_img_url(get_hk_url,parmas)

    img_token = img_json['data']['token']
    img_byte = get_img_byte(img_json['data']['bg'][0])
    my_dx = img_show(img_byte)
    print("手动",my_dx)
    dx = detection(img_byte)
    print("自动",dx)
    gj_list , gj_p , gj_ext = hk_gj(img_token,dx)

    gj_50_str = ":".join(gj_list)

    da = get_hk_da(gj_50_str)

    p = get_hk_da(gj_p)

    ext = get_hk_da(gj_ext)


    hk_data = {"d":da,"m":"","p":p,"ext":ext}
    hk_data_str = json.dumps(hk_data).replace(" ","")
    ini_json = init_config()

    ac_t = get_actoken()
    # check_cb =  json.dumps({"cb":get_cb()}).replace('{"cb": "',"").replace('"}','')
    check_cb =  get_cb()

    print(check_cb,len(check_cb))
    login_callback_name = get_callback()
    hk_check_data ={

        "referer":"https://dl.reg.163.com/webzj/v1.0.1/pub/index2_new.html",
        "zoneId":"CN31",
        "id":"744e2a6324ec5370616241baf4507538",
        "token":img_token,
        "acToken":ac_t,
        # "data":json.dumps(hk_data,ensure_ascii=False).replace(" ","").replace(":","%3A")
        # "data":hk_data.replace(" ","").replace(":","%3A").replace(",","%2C").replace("+","%2B").replace('/','%2F').replace("\\","%5C%5C"),
        "data":hk_data_str,
        #"data":'{"d":"xohFRwwLzKAor6BsY9knap9diatXdOwGZXQrhYsvQEfQcyc/R/6v6rvO5XTotgXs50UOfpdOzKwgNwlg9eeAFxxheL4ggO6Ve0KtkJ17jxpVYNGkiISGeru+Z87K4JZ9e7wOHZDVoneghKJ/eCvM0\\jg1qHSKSb9OrEgsFn59nB8aF8Sm51Nlf+4fghMUDJz/VRUwRR7bOWPWaZWm9GBpvSoYeEV0xQ0YrByfp9+lBPXW5hvegI\\wXtpNitfHawY7+UGjQ+OeBI9f74wefgXRsUtfHw24+ngHmutEkEtXLZ0ce6seCUt4jnrnqO8PnGkjmWoeRlqe8kz4foYgDwmBg+VQiKyK0hnKgUm0vDFQxFWLvl9/mNvkFPehDxiPOP8RDvLTho14jrCsIHw1VLlmpy+R6aC+50pe7vqdXvL49HLr2ytxzs82IrJgjvahOvTqGhUofwryICI/67YkSNtPiVekZCYHNGw9LgO2El8ZroyFJaFy/jYdXrAiYBLRFezF\\RjH4VGB6xpZmtwCRbC0RwyYkmHoqKemmMyxEFgqbCXgnLNHcrBlbYeeJOyYiVIrIJVj8KdxM\\FtdRSO9WlEhQRbRMe1QrD\\atBVJxPGLzLK\\r9K0yxwzMJ64FIAfHwjsDTGnLt8Ep4nW/c+8HumufvkUtUTyDNFoD4CCF5dswMQ5Q\\aDLmJhjCeUQznJZFOppvoFrchmrsj\\/siJPgtK++brJRyLhgez+9S6G8B9BGWLsZyL6DWvl8rrByoycsyAO4p\\+LgMBM/9WzW5sp8YW9rhUDjX58OHOEwnmaAbd7tFOrTpbuqX/+QbDGgvEAY\\L4suHURDPyb05IrDwOj8ybK1Sx6Q\\SLfA\\IhNgQdQ5HD/wx0yN+r6NLjWRz7Bg8fg9GWiAg8yPP+Wk\\AvuejpvE2gbGVP9ezGjJClq6V\\jb0ekFH2t8hHeJIgMRRy9aArAy89Ve8aVuIj/sqAvmqIche5mj\\ik0YixOs+FjWY0bmIuBnFzRqdETuS3","m":"","p":"MRnhDnDg5BK74d9We/dmx595kMHzLoAj9AFzu7VKlA4fLWKr9PMfEc33","ext":"\\wJx\\y+5AXTkaolrs98daWh7CAqo5w9T"}',
        "width":"220",
        "type":"2",
        "version":"2.15.2",
        "cb":check_cb,
        "extraData":"",
        "runEnv":"10",
        "callback":f"__JSONP_{login_callback_name}_{random.randint(1,20)}",
    }

    tm_tid,check_token,check_validate = go_check(hk_check_data)
    nike_data_str = '{"r":1,"d":"%(dt)s","i":"%(ni)s"}'%(ini_json['result'])

    nike_cookie = get_nike(nike_data_str)
    web_fp = get_fp(ua)
    login_cookies = {
        "gdxidpyhxdE":fp_cookie,
        "_9755xjdesxxd_":"32",
        "D00000710348764:WM_NI":ini_json['result']['ni'],
        "YD00000710348764:WM_NIKE":nike_cookie,
        "YD00000710348764:WM_TID":ini_json['result']['tid'],
        "NTES_WEB_FP":web_fp

    }
    # login("1861201xxx4@163.com","123456789",ua,login_cookies,check_validate)