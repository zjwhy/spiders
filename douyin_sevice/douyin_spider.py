import requests,hashlib,time,re
from requests.packages.urllib3.exceptions import InsecureRequestWarning
from urllib.parse import quote_plus
from douyin_sevice.hook_code import *
from douyin_sevice.zijie_zhuanhuan import *
from pymssql import connect
from douyin_sevice.adb_kf import *
from uuid import uuid1
import random
from simplejson.errors import JSONDecodeError
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
class DouYin(object):

    search_url = "https://search-hl.amemv.com/aweme/v1/discover/search/?_rticket={}&host_abi=armeabi-v7a&ts={}&"
    session = requests.Session()

    def __init__(self,page,cookie_str=None,adb_name=None,emu=True):
        self.key = None
        self.page = page
        self.cookie_str = cookie_str
        # self.three_sign = self.get_md5(cookie_str)
        self.three_sign = None
        self.searchId = None
        self.cookie = {}
        self.parse_list =[]
        # self.conn = connect(host="localhost", user="root", password="z5487693", port=3306, charset='utf8',
        #                     database="qicc")
        self.conn = connect(server='123.56.26.226', user=r'db_bjartinadmin', password="db_gksq!@#$%100",
                            database='SpilderDataStorageDB')
        self.cur = self.conn.cursor()
        self.emu = emu

        self.adb_name=adb_name

    def main_run(self,key,key_id):
        self.key=key
        self.key_id =key_id
        self.start_adb__()
        # adb_start_app("com.ss.android.ugc.aweme/com.ss.android.ugc.aweme.main.MainActivity")
        self.deID = self.get_deID()
        self.get_cookie()
        self.get_searchId_()
        if self.page > 1:

            for i in range(1, self.page + 1):
                # self.start_adb__()
                # sub_str = "keyword={}&offset={}&count=10&source=video_search&is_pull_refresh=1&hot_search=0&search_id={}&query_correct_type=1&is_filter_search=0&sort_type=0&publish_time=0"
                sub_str = "cursor={}&keyword={}&count=10&type=1&is_pull_refresh=1&hot_search=0&search_source=&search_id={}&query_correct_type=1"
                          # "cursor={}&keyword={}&count=10&type=1&is_pull_refresh=1&hot_search=0&search_source=&search_id={}&query_correct_type=1"
                sub = self.get_md5(sub_str.format(str(i * 10 - 10),quote_plus(self.key) , self.searchId))
                parame = self.get_parame()
                from_time = parame['from_time']
                first_sign = parame['first_sign']
                khronos = parame['khronos']
                req_ticket = parame['req_ticket']
                x_gorgon = self.get_gorgon(khronos, first_sign, sub,adb_name=self.adb_name)
                if not x_gorgon:
                    print("生成gorgon失败>>>>>>>>关键字：%s"%self.key)
                else:
                    headers = self.get_headers(sub, req_ticket, khronos, x_gorgon, from_time)
                    data = self.get_data(page=i)
                    try:
                        resp = self.session.post(self.search_url.format(from_time['_rticket'],from_time['ts']), data=data, headers=headers,cookies=self.cookie,
                                                 verify=False).json()
                    except:
                        print(">>>>>%s>>>>第%d页未抓取到<<<<<<<"%(key,i))
                        continue
                    try:
                        if not resp['user_list']:
                            print(resp)
                            break
                        self.parse_json(resp)
                    except :
                        print(resp)
                        continue


        # print(self.parse_list)
        self.sql_insert()
        sql = "update  AdouyinKW set rem='1' WHERE id={}".format(self.key_id)
        self.cur.execute(sql)
        self.conn.commit()
    def get_md5(self,str):
        return hashlib.new('md5',str.encode()).hexdigest()

    def get_gorgon(self,khronos,first_sign,sub,adb_name=None):
        gogron_str = first_sign+sub+self.three_sign+'00000000000000000000000000000000'
        # gogron_str = first_sign+sub+self.three_sign
        gogron_pb = [i for i in bytes.fromhex(gogron_str)]
        gogron_jb = pb2jb(gogron_pb)

        result_str = gorgon(khronos,gogron_jb,adb_name=adb_name,emu=self.emu)
        result_sign = None
        if not result_str:
            result_str = gorgon(khronos, gogron_jb, adb_name=adb_name, emu=self.emu)

        else:
            if result_str != -1:
                result = [int(i) for i in result_str.replace('[', '').replace(']', '').split(',')]
                result_pb = jb2pb(result)
                result_sign = bytearray(result_pb).hex()
        return result_sign
    def start_adb__(self):
        info = adb_select_port(emu=self.emu)
        if self.emu:
            if './data/local/tmp/fs12820' not in info:
                print("启动服务")
                adb_kill()
                adb_forwardAndStart(adb_name=self.adb_name)
        else:
            if 'fs12820' not in info:
                print("启动服务")
                adb_kill()
                adb_forwardAndStart(adb_name=self.adb_name)
    def get_parame(self):
        _rticket = int(time.time() * 1000)
        ts = int(time.time()) + 76
        # iid = "3632441401" + str(random.randint(500000, 600000))
        # openuid = self.get_md5(iid)[:16]
        # devices_id = "1204702706" + str(random.randint(400000, 500000))
        # test_dict = {"iid":iid,"devices_id":devices_id,"openuid":openuid}
        from_time = {"_rticket": _rticket, "ts": ts,"iid":self.deID['iid'],"devices_id":self.deID['devices_id'],"openuid":self.deID['openuid']}

        first_str = "_rticket={_rticket}&host_abi=armeabi-v7a&ts={ts}&os_api=27&device_platform=android&device_type=Pixel&iid={iid}&version_code=100900&app_name=aweme&openudid={openuid}&device_id={devices_id}&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7fc8bfbf-002e-41fc-819d-e7fb2f4d8294&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900"
        # first_str ="_rticket={_rticket}&host_abi=armeabi-v7a&ts={ts}&os_api=27&device_platform=android&device_type=Pixel&iid=3632441401546270&version_code=100900&app_name=aweme&openudid=3eb863a25bda42bb&device_id=184360745574087&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7fc8bfbf-002e-41fc-819d-e7fb2f4d8294&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900&uuid=352531082417591"
        first_sign = self.get_md5(first_str.format(**from_time))
        khronos_time = time.time()
        khronos = int(khronos_time)
        req_ticket = int(khronos_time * 1000)
        return {'from_time':from_time,"first_sign":first_sign,"khronos":khronos,"req_ticket":req_ticket}

    def get_deID(self):
        iid = "3632441401" + str(random.randint(500000, 600000))
        openuid = self.get_md5(iid)[:16]
        devices_id = "120" +str(random.randint(1000000,7000000))+ str(random.randint(400000, 500000))
        return {"iid":iid,"openuid":openuid,"devices_id":devices_id}
    def get_searchId_(self):
        # sub_str = "keyword={}&offset=0&count=10&source=video_search&is_pull_refresh=0&hot_search=0&search_id=&query_correct_type=1&is_filter_search=0&sort_type=0&publish_time=0"
        sub_str = "cursor=0&keyword={}&count=10&type=1&is_pull_refresh=1&hot_search=0&search_source=&search_id=&query_correct_type=1"
        sub = self.get_md5(sub_str.format(quote_plus(self.key)))
        parame = self.get_parame()
        from_time = parame['from_time']
        first_sign = parame['first_sign']
        khronos = parame['khronos']
        req_ticket = parame['req_ticket']
        x_gorgon = self.get_gorgon(khronos,first_sign,sub,adb_name=self.adb_name)
        if not x_gorgon:
            print("生成gorgon失败>>>>>>>>关键字：%s"%self.key)
        else:
            headers = self.get_headers(sub,req_ticket,khronos,x_gorgon,from_time)
            # self.set_cookie()
            data = self.get_data()

            resp= requests.post(self.search_url.format(from_time['_rticket'],from_time['ts']),
                                data=data,headers=headers,verify=False).json()
            # print()
            try:
                self.searchId = resp['log_pb']['impr_id']
                if not self.searchId:
                    print("未能获取到searchId>>>>>>>关键字：%s"%self.key)
                # if not resp['user_list']: print(resp)
                # else:
                #     self.parse_json(resp)

            except Exception as e:
                print(resp)
                print(e)

        # return parse_list
    def parse_json(self,resp):
        # parse_list = []
        for obj in resp['user_list']:
            parse_ok = {}
            obj = obj['user_info']
            try:
                title = obj['nickname']
                desc ="".join( re.findall('[\u4e00-\u9fa5]',obj['signature']))
                video_count = obj['aweme_count'] #作品数量

                following_count = obj['following_count'] if 'following_count' in obj else None  #关注数量

                fans_count = obj['follower_count'] if 'follower_count' in obj else None #粉丝数
                total_favorited = obj['total_favorited'] if 'total_favorited' in obj else None #点赞数量
                custom_verify = obj['custom_verify'] if 'custom_verify' in obj else None #作者类别
                author_headImg = obj['avatar_thumb']['url_list'][0] #头像
                author_id = obj['unique_id'] #抖音id
                author_web_id = obj['uid']

                parse_ok['title'] = title
                parse_ok['desc'] = desc
                parse_ok['video_count'] = video_count
                parse_ok['following_count'] = following_count
                parse_ok['fans_count'] = fans_count
                parse_ok['author_id'] = author_id
                parse_ok['author_headImg'] = author_headImg
                parse_ok['total_favorited'] = total_favorited
                parse_ok['custom_verify'] = custom_verify
                parse_ok['ID'] = uuid1().hex
                parse_ok['ReleaseTime'] = self.key   #对应的关键字
                self.parse_list.append(parse_ok)
            except KeyError as e:
                print(e)
        # return parse_list
    def get_headers(self,sub,req_ticket,khronos,x_gorgon,from_time={}):

        headers = {
            'Host': 'search-hl.amemv.com',
            'Connection': 'keep-alive',
            'X-SS-REQ-TICKET': str(req_ticket),
            'sdk-version': '1',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-SS-STUB': sub.upper(),
            'X-SS-DP': '1128',
            'x-tt-trace-id': '00-035a6f310d447abb4e02997a37de0468-035a6f310d447abb-01',
            # 'x-tt-trace-id': '00-231610710d447abb4e029977e7d70468-231610710d447abb-01',
            'User-Agent': 'com.ss.android.ugc.aweme/100901 (Linux; U; Android 8.1.0; zh_CN_#Hans; Pixel; Build/OPM4.171019.021.P1; Cronet/TTNetVersion:8109b77c 2020-04-15 QuicVersion:0144d358 2020-03-24)',
            'Accept-Encoding': 'gzip, deflate',
            'X-Khronos': str(khronos),
            'X-Gorgon': x_gorgon,
            'x-common-params-v2': 'os_api=27&device_platform=android&device_type=Pixel&iid={}&version_code=100900&app_name=aweme&openudid={}&device_id={}&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7fc8bfbf-002e-41fc-819d-e7fb2f4d8294&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900'.format(from_time['iid'],from_time['openuid'],from_time['devices_id']),
            # 'x-common-params-v2':   'os_api=27&device_platform=android&device_type=Pixel&iid=3632441401546270&version_code=100900&app_name=aweme&openudid=3eb863a25bda42bb&device_id=184360745574087&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7fc8bfbf-002e-41fc-819d-e7fb2f4d8294&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900&uuid=352531082417591'
        }
        # headers = {
        #     'Host': 'search-hl.amemv.com',
        #     'Connection': 'keep-alive',
        #     # 'Content-Length': '129',
        #     'X-SS-REQ-TICKET': str(req_ticket),
        #     'X-Tt-Token': '00dde23f471d3f7cc9e4901784edcd166e0d91515172885fd90eb7da1f0f376e629c2cd3a49a210d99e3a041c36003e05757',
        #     'sdk-version': '1',
        #     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        #     'X-SS-STUB': sub.upper(),
        #     'X-SS-DP': '1128',
        #     'x-tt-trace-id': '00-085b157a0d447abb4e029977baef0468-085b157a0d447abb-01',
        #     'User-Agent': 'com.ss.android.ugc.aweme/100901 (Linux; U; Android 8.1.0; zh_CN_#Hans; Pixel; Build/OPM4.171019.021.P1; Cronet/TTNetVersion:8109b77c 2020-04-15 QuicVersion:0144d358 2020-03-24)',
        #     'Accept-Encoding': 'gzip, deflate, br',
        #     'X-Khronos': str(khronos),
        #     'X-Gorgon': x_gorgon,
        #     'x-common-params-v2': 'os_api=27&device_platform=android&device_type=Pixel&iid=3632441401546270&version_code=100900&app_name=aweme&openudid=3eb863a25bda42bb&device_id=1204702706411927&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7fc8bfbf-002e-41fc-819d-e7fb2f4d8294&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900&uuid=352531082417591',
        # }
        return headers

    def set_cookie(self):
        cookie_list = self.cookie_str.split('; ')
        for obj in cookie_list:
            k,v = obj.split('=')
            self.cookie[k] = v

    def get_data(self,page=1):
        data = {
            'cursor': '0',
            'keyword': self.key,
            'count': '10',
            'type': '1',
            'is_pull_refresh': '1',
            'hot_search': '0',
            'search_source': '',
            'search_id': '',
            'query_correct_type': '1',
        }
        if self.searchId :
            data['cursor'] = str(page*10-10)
            data['is_pull_refresh'] = '1'
            data['search_id'] = self.searchId
        return data
    def sql_insert(self):
        sql = "insert into AdouyinMsg(ID,TitleContent,AuthorContent,PictureAddress,VideoThumbnail,PlaybackVolume,Lntroduction,ChapterName,NovelNumber,NovelCategories,ReleaseTime) VALUES" \
              " ('{ID}','{title}','{author_id}','{author_headImg}','{video_count}','{following_count}','{desc}','{fans_count}','{total_favorited}','{custom_verify}','{ReleaseTime}')"
        if  self.parse_list:

            cat = "select AuthorContent from AdouyinMsg"
            self.cur.execute(cat)
            flag =[i[0] for i in self.cur.fetchall()]
            print(self.parse_list)
            for obj in self.parse_list:
                if obj['author_id'] not in flag:
                    try:
                        self.cur.execute(sql.format(**obj))
                        self.conn.commit()
                        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n")
                        print(obj,'\n')
                        print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                    except Exception as e:
                        print(e)
                        continue
            self.parse_list = []
            self.searchId =None
            print('>>>>>>>>>%s>>>>>>数据插入完成>>>>>>>>>>>>本次抓取%s页完成'%(self.key,self.page))
        else:
            print("未抓取到数据关键字>>>>>>>>%s"%self.key)
    def get_cookie(self):
        cookie_url = "https://aweme.snssdk.com/aweme/v1/abtest/param/?last_settings_version=%7B%22version_code%22%3A%22100900%22%7D&_rticket={}&host_abi=armeabi-v7a&ts={}&"
        headers ={
            "x-common-params-v2":"os_api=27&device_platform=android&device_type=Pixel&iid=3632441401546270&version_code=100900&app_name=aweme&openudid=3eb863a25bda42bb&device_id=184360745574087&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7a3c542a-3c26-47b2-9375-cbf60d9857d1&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900"
        }
        # headers ={
        #     "x-common-params-v2":"os_api=27&device_platform=android&device_type=Pixel&iid={iid}&version_code=100900&app_name=aweme&openudid={openuid}&device_id={devices_id}&os_version=8.1.0&aid=1128&channel=aweGW&ssmix=a&manifest_version_code=100901&dpi=420&cdid=7a3c542a-3c26-47b2-9375-cbf60d9867d1&version_name=10.9.0&resolution=1080*1794&language=zh&device_brand=google&app_type=normal&ac=wifi&update_version_code=10909900".format(**self.deID)
        # }

        resp = requests.get(cookie_url.format(int(time.time()*1000),int(time.time())),headers=headers,verify=False)
        cookie_v = requests.utils.dict_from_cookiejar(resp.cookies)['odin_tt']
        self.cookie_str = "odin_tt={}; SLARDAR_WEB_ID=03cc19b2-0fea-42f6-8df6-f8c3d1b560d9; install_id=3949083730655720; ttreq=1$f291c4a82aa64d447c275b969c1ce432f891ff7a".format(cookie_v)
        self.three_sign = self.get_md5(self.cookie_str)
        self.set_cookie()
        print("设置cookie完成")
        # print(resp.url)
    def __del__(self):

        self.cur.close()
        self.conn.close()

if __name__ == '__main__':
    # cookie_str = "odin_tt=8ede74070306d7e0455da8a96aaec8ddedf4e5c74975c3f4248ad82385906e56b859836b74ccde06bfff5e4ecc1eb495c5be491d7d184e57a30e45e8fa1b0916; SLARDAR_WEB_ID=03cc19b2-0fea-42f6-8df6-f8c3d1b560d9; install_id=3949083730655720; ttreq=1$f291c4a82aa64d447c275b969c1ce432f891ff7a"

    # cookie_str ="SLARDAR_WEB_ID=92c938d4-9c9a-4379-badb-f364f3f1a9cb; passport_csrf_token=0840a2c0b85c983ce9efda73a1cf2d30; d_ticket=a20e3a3728c735ad4b76355621aaa4dee9125; odin_tt=7a6f1b4279d3bcbe10832365af964733fd64cc0d35e17dfb9a7eb6a0c23e9a288145fef36242d377cc9de01113bc1706d2b2eeef9200e736dd5b9be9bb9e3f79; sid_guard=dde23f471d3f7cc9e4901784edcd166e%7C1593573102%7C5184000%7CSun%2C+30-Aug-2020+03%3A11%3A42+GMT; uid_tt=137a438d6627e4910c53d678390b8c5f; uid_tt_ss=137a438d6627e4910c53d678390b8c5f; sid_tt=dde23f471d3f7cc9e4901784edcd166e; sessionid=dde23f471d3f7cc9e4901784edcd166e; sessionid_ss=dde23f471d3f7cc9e4901784edcd166e; install_id=3632441401546270; ttreq=1$c935c179138d7bb293d41d715d4303284db1aa14"
    test = DouYin(10,cookie_str=None,adb_name="emulator-5556",emu=True)
    # test.main_run("大姐是朵花",2)
    # test.deID = test.get_deID()
    # test.get_cookie()
    sql = "select * from AdouyinKW"
    test.cur.execute(sql)
    all_ky = test.cur.fetchall()

    for obj in all_ky:
        key_id,kw ,rem= obj
        if rem != '1':
            try:
                test.main_run(key=kw,key_id=key_id)
            except JSONDecodeError:
                 print("未能获取到searchId>>>>>>>关键字：%s"%kw)


    print("本次任务完成")
    # print(uuid1().hex)
    # iid = "3632441401" + str(random.randint(500000, 600000))
    # print(iid)