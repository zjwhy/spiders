import time,requests
from requests.utils import dict_from_cookiejar
from geetest_hk import geettest_main
from urllib.parse import quote_plus
import execjs
import hashlib,os,json
from lxml import etree
from copy import deepcopy

class TYSpider(object):

    def __init__(self,account,password):

        self.account = account
        self.password = password
        self.cookies = {}
        self.headers =  {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
        }
        self.check_login()
    def run(self,key):
        self.search_check()

        html_resp = self.search(key)

        parse_result = self.parse(html_resp)

        print(parse_result)
        return parse_result
    def parse(self,html_resp):

        result_list = []

        element = etree.HTML(html_resp.text)

        etree.strip_tags(element,'em')

        # a_list = element.xpath('//div[@class="header"]/a')

        div_list = element.xpath('//div[@class="result-list sv-search-container"]/div[@class="search-item sv-search-company  "]')

        # title_list = [i.text for i in a_list]
        #
        # legal_list = element.xpath('//div[@class="info row text-ellipsis"]/div[1]/a/text()')
        #
        # mon_list  = element.xpath('//div[@class="info row text-ellipsis"]/div[2]/span/text()')
        #
        # time_list = element.xpath('//div[@class="info row text-ellipsis"]/div[3]/span/text()')


        for div in div_list:

            try:
                title = div.xpath('.//div[@class="header"]/a')[0].text

                legal_name = div.xpath('.//a[@class="legalPersonName link-click"]/text()')[0]

                money = div.xpath('.//div[@class="title -narrow text-ellipsis"]/span/text()')[0]

                time_ = div.xpath('.//div[@class="title  text-ellipsis"]/span/text()')[0]


                phone_str = div.find('.//div[@class="contact row "]/div[1]//script').text if  div.find('.//div[@class="contact row "]/div[1]//script') != None else "".join( div.xpath('.//div[@class="contact row "]/div[1]/span[2]/span/text()'))

                phone_list = json.loads(phone_str) if phone_str.startswith('[') else phone_str

                '//div[@class="contact row"]/div[2]/script/text()'

                email_str = div.find('.//div[@class="contact row "]/div[2]//script').text if  div.find('.//div[@class="contact row "]/div[2]//script') != None else "".join( div.xpath('.//div[@class="contact row "]/div[2]/span[2]/text()'))


                email_list = json.loads(email_str) if email_str.startswith('[') else email_str

                address = "".join(div.xpath('.//div[@class="contact row"]/div/span[2]/text()'))

                result = {
                    "title":title,
                    'legal_name':legal_name,

                    "money":money,

                    "time_":time_,

                    "phone_list":phone_list,

                    "email_list":email_list,

                    "address":address


                }

                result_list.append(result)

            except:
                print()


        return result_list


    def search(self,key):
        url = f"https://www.tianyancha.com/search?key={key}"
        html_resp = requests.get(url, headers=self.headers, cookies=self.cookies, verify=False)

        return html_resp


    def search_check(self):

        tmp_headers = deepcopy(self.headers)

        tmp_headers['X-AUTH-TOKEN'] = self.cookies['auth_token']

        tmp_headers['version'] = "TYC-Web"

        check_login = f"https://capi.tianyancha.com/cloud-discuss/service/pic/question/getEditUserInfo?_={int(time.time()*1000)}"


        resp = requests.get(check_login,headers=tmp_headers,verify=False)

        if resp.status_code == 200 and resp.json()['state'] =="ok":
            print(f"{self.account}-----token可用------")
        else:

            user_info = self.login()
            self.cookies['auth_token'] = user_info['data']['token']
            print(f"{self.account}-----token已经刷新------")

    def check_login(self):
        if not os.path.exists(f"./cookies_save/{self.account}.json"):
            user_info = self.login()
            self.cookies['auth_token'] = user_info['data']['token']

        else:
            with open(f"./cookies_save/{self.account}.json", 'r') as f:

                user_info = json.loads(f.read())


        check_login = f"https://www.tianyancha.com/usercenter/modifyInfo"

        self.cookies['auth_token'] = user_info['data']['token']
        check_resp = requests.get(check_login, headers=self.headers, cookies=self.cookies, verify=False)

        if check_resp.status_code == 200 and self.account in check_resp.text:
            print(f"{self.account}-----token可用------")
        else:
            user_info = self.login()

            self.cookies['auth_token'] = user_info['data']['token']
            print(f"{self.account}-----token已刷新------")


    def login(self):
        self.set_cookies()
        gt_chall = self.get_gt_challenge()

        gt = gt_chall['gt']
        challenge = gt_chall['challenge']

        check_result = geettest_main(gt, challenge)

        pw_encode = hashlib.new("md5", self.password.encode()).hexdigest()
        data = {"mobile": self.account, "cdpassword": pw_encode,
                "loginway": "PL", "autoLogin": False, "type": "", "challenge": check_result['challenge'],
                "validate": check_result['validate'], "seccode": f"{check_result['validate']}|jordan"}
        url = "https://www.tianyancha.com/cd/login.json"
        # print(cookies)
        resp = requests.post(url, json=data, cookies=self.cookies, headers=self.headers, verify=False)
        with open(f'./cookies_save/{self.account}.json', 'w') as w:
            w.write(resp.text)
        return resp.json()

    def get_gt_challenge(self):
        url = "https://www.tianyancha.com/verify/geetest.xhtml"
        data = {
            "uuid": str(int(time.time() * 1000))
        }
        resp = requests.post(url, headers=self.headers, json=data, verify=False).json()
        # print(resp)
        return resp['data']

    def set_cookies(self):
        url = "https://www.tianyancha.com/?jsid=SEM-BAIDU-PZ-SY-2021112-JRGW"

        resp = requests.get(url, headers=self.headers, verify=False)

        tmp_cookies = dict_from_cookiejar(resp.cookies)
        self.cookies = {
            "sajssdk_2015_cross_new_user": "1",

        }
        uuid_obj = self.get_uuid()
        self.cookies['ssuid'] = str(uuid_obj['ssuid'])

        devices_id = quote_plus('{"distinct_id":"%s","first_id":"","props":{}}' % uuid_obj['uuid'])

        self.cookies['sensorsdata2015jssdkcross'] = devices_id
        self.cookies = dict(**self.cookies,**tmp_cookies)
    def get_uuid(self):
        with open("tiany_cookie.js", 'r') as ff:
            cookie_js = ff.read()
        js_obj = execjs.compile(cookie_js)

        return js_obj.call('ty_uuid')


if __name__ == '__main__':
    # main_("钢铁")
    name = "xxxxx"
    pwd = "xxxxx"
    test = TYSpider(name,pwd)
    test.run("钢铁")
    # test.check_login()

    pass