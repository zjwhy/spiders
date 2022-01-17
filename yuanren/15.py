import requests,execjs,re,time,js2py,retry

from requests.utils import cookiejar_from_dict
head_js = """
var window = global;

var setInterval = function(){};
var eval = function(){};
var location = {"ancestorOrigins":{},"href":"https://www.python-spider.com/challenge/15","origin":"https://www.python-spider.com","protocol":"https:","host":"www.python-spider.com","hostname":"www.python-spider.com","port":"","pathname":"/challenge/15","search":"","hash":""};

Function.prototype.constructor = function(){};
var document = {
    "createElement":{}

};
var navigator =  {
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Google Inc.",
    "maxTouchPoints": 0,
    "hardwareConcurrency": 8,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "platform": "MacIntel",
    "product": "Gecko",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "language": "zh-CN",
    "languages": [
        "zh-CN",
        "zh"
    ],
    "deviceMemory": 8,
    webkitPersistentStorage:function(){},
    mimeTypes:{
      "0": {},
      "1": {},
      "2": {},
      "3": {}
      },
      getBattery:function(){
          return {
              then:function(v){
                  debugger;
                  v({
                    level:0.94,
                    charging:true,
                    chargingTime:2520
                  })
              }
          }
  
      }
          
      
    
  };
  window['navigator'] = navigator;


"""


wei_js = """
function get_sign(timestamp){
    if (window.z){
        return window.z(timestamp)
    }else{
        return document.cookie
    }
    
}
return get_sign("")
"""


headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
}

cookies = {
    "sessionid":"wxo5ap4pb5upg8lydaubnn68ig3pdpg0"
}
stamp_url = "https://www.python-spider.com/cityjson"

sign_js_url = "https://www.python-spider.com/api/challenge15/js?_t={}&_={}"

post_url = "https://www.python-spider.com/api/challenge15"

sess = requests.Session()
sess.cookies = cookiejar_from_dict(cookies)
sess.headers = headers
sess.verify = False
total = 0
@retry.retry(tries=10,delay=3)
def get_total(i):

    global total

    tmp_stamp = sess.get(stamp_url).text

    tmp_stamp = re.search('var returnCitySN = \{"cip": "106.38.79.74", "timestamp": "(\d+)"};',tmp_stamp).group(1)

    sign_js = sess.get(sign_js_url.format(tmp_stamp,str(int(time.time())*1000))).text

    tmp_js = head_js +"\n"+sign_js+"\n"+wei_js

    js_obj = execjs.compile(tmp_js)

    sign = js_obj.call("get_sign",tmp_stamp)
    print(sign)

    data = {
        "page":	str(i),
        "sign":	sign
    }

    resp = sess.post(post_url,data=data)

    body = resp.json()
    print(body)
    for obj in body['data']:
        value = obj['value'].strip()
        total += int(value)
    # time.sleep(1)


for i in range(1,101):
    get_total(i)
print(total)