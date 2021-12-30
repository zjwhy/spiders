import scrapy,json,re,time,requests,io,os
from scrapy import Request
from ..items import AutohomeItem
from ..utils.check_font import check_font
from copy import deepcopy
from fontTools.ttLib import TTFont
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
from xvfbwrapper import Xvfb


class QichehomeSpider(scrapy.Spider):
    name = 'qichehome'
    allowed_domains = ['autohome.com']
    custom_settings = {
        "DOWNLOADER_MIDDLEWARES": {
            'beyoncaClub.middlewares.QiCheHomeClubDownloaderMiddleware': 543
        }
    }

    # start_urls = ['http://qiche.com/']

    def __init__(self, *args, **kwargs):
        super(QichehomeSpider, self).__init__(*args, **kwargs)
        self.keyword_list = json.loads(kwargs['keyword_list'].replace('$$split$$', " "))
        self.pages = int(kwargs.get('pages')) if kwargs.get('pages', None) else None
        self.solt_key = kwargs.get('solt_key', None)
        self.base_key = kwargs.get('base_key', None)
        self.coll_name = kwargs.get('coll_name', None)

        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
        }
        op = Options()
        # op.add_argument('--headless')
        # op.add_argument('--window-size=1920,1080')
        if "debug" not in kwargs:
            self.v_display = Xvfb(width=1200, height=740)
            self.v_display.start()

        self.web = Chrome(options=op)
        self.wait = WebDriverWait(self.web, 10)

    def start_requests(self):

        url = "https://club.autohome.com.cn/frontapi/bbs/getSeriesByLetter?firstLetter="

        yield Request(url, dont_filter=True, callback=self.one_parse)

    def one_parse(self, response):
        json_body = json.loads(response.text)

        html_keyword_list = []
        for letter_obj in json_body['result']:
            for bbs_brand_obj in letter_obj['bbsBrand']:
                bbs_list = bbs_brand_obj['bbsList']
                html_keyword_list += bbs_list
        flag_count = 0
        for html_keyword_obj in html_keyword_list:
            html_keyword = html_keyword_obj['bbsName']
            for brand_tag, keyword in self.keyword_list:
                if keyword + "论坛" == html_keyword:
                    flag_count += 1
                    bbs_id = html_keyword_obj['bbsId']
                    key = keyword

                    bbs_base_url = "https://club.autohome.com.cn/frontapi/data/page/club_get_topics_list?page_num=1&page_size=50&club_bbs_type=c&club_bbs_id={}&club_order_type=1"

                    url = bbs_base_url.format(bbs_id)

                    meta = {"first": 1, "keyword": key, "club": html_keyword, "base_url": url, "bbs_id": bbs_id,
                            "brand_tag": brand_tag}

                    yield Request(url, meta=meta, dont_filter=True, callback=self.parse_list)

                    break
            if flag_count == len(self.keyword_list): break

    def parse_list(self, response):
        meta = response.meta
        json_body = json.loads(response.text)
        brand_tag = meta['brand_tag']
        for obj in json_body['result']['items']:
            url = obj['pc_url']
            if not url:
                continue
            item = AutohomeItem()
            item['area'] = ""
            item['crawl_time'] = datetime.now().strftime("%Y-%m-%d")
            item['author_id'] = str(obj['author_id'])
            item['coll_name'] = self.coll_name
            item['title'] = obj["title"]
            item['author'] = obj['author_name'] if obj['author_name'] else ""
            item['from_community'] = obj['club_bbs_name']
            item['time'] = obj['publish_time'].replace('/', '-') if len(obj['publish_time'].replace('/', '-')) > 10 else \
            obj['publish_time'].replace('/', '-') + " 00:00:00"
            item['location'] = url
            item['comment_num'] = int(obj['reply_count']) if obj['reply_count'] else 0
            item['views'] = obj['pv']
            item['car_name'] = meta['keyword']
            car_name = meta['keyword']

            car_tag = car_name

            item['car_tag'] = car_tag
            item['domain_tag'] = "autohome"
            item['brand_tag'] = brand_tag
            second_meta = {'item': item, "comment": 1, "base_url": url, "club_is_video": obj['club_is_video']}
            yield Request(url, meta=second_meta, callback=self.parse_content)
            # break
        if "first" in meta:
            total = json_body['result']['total']
            pages = self.pages if self.pages else total // 50 + 2
            if pages > 200:
                pages = 200
            bbs_base_url = "https://club.autohome.com.cn/frontapi/data/page/club_get_topics_list?page_num={}&page_size=50&club_bbs_type=c&club_bbs_id={}&club_order_type=1"
            bbs_id = meta['bbs_id']
            next_meta = deepcopy(meta)
            next_meta.pop("first")
            if pages:
                for i in range(2, pages):
                    next_url = bbs_base_url.format(i, bbs_id)
                    next_meta['base_url'] = next_url
                    yield Request(next_url, dont_filter=True, callback=self.parse_list, meta=next_meta)

    def parse_content(self, response):

        meta = response.meta

        item = meta['item']
        re_obj = re.search(",url\('(.+)?'\) format\('woff'\)", response.text)
        if re_obj:
            ttf_url = "https:" + re_obj.group(1)
            ttf_content = requests.get(ttf_url, headers=self.headers, verify=False).content
            font = TTFont(io.BytesIO(ttf_content))
            tmp_name = check_font(font)

            tmp_uni_name = {}
            for tmp_key in tmp_name:
                uni_str = eval("'\\u" + tmp_key[3:] + "'").encode().decode()
                tmp_uni_name[uni_str] = tmp_name[tmp_key]

            # other_people_content_list = response.xpath('//li[@class="js-reply-floor-container "]')
            # print(f"other_p:{other_p}")
            other_people_views = response.xpath('//li[@class="js-reply-floor-container "]')
            # base_id = None
            if meta['comment'] == 1:
                base_content = ''.join(
                    response.xpath('//div[@class="tz-paragraph"]').extract())
                base_content = re.sub('<.+?>', "", base_content)
                base_content = self.parse_font(base_content, tmp_uni_name)
                # if meta['club_is_video'] != 1:
                #     base_id = response.xpath(
                #         '//section[@class="fn-container fn-main"]/div[@class="post-wrap"]//div/@data-user-id').extract_first()
                #     publish_time = response.xpath('//span[@class="post-handle-publish"]/strong/text()').extract_first()
                #
                # else:
                #     base_id = response.xpath(
                #         '//div[@class="post"]//div[@class="user-brief-name"]/a/@title').extract_first()
                #     publish_time = response.xpath('//div[@class="post-info"]/span[2]/strong/text()').extract_first()

                imgs = response.xpath('//div[@class="tz-picture"]//img/@data-src').extract()
                item['other_people_content'] = []
                # item['time'] = publish_time
                item['base_content'] = base_content.strip()
                # item['author'] = base_id

                item['imgs'] = [img if img.startswith("http") or img.startswith('https') else "https:" + img for img in
                                imgs]
            other_people_id = []
            # if base_id:other_people_id.append(base_id)
            li_id_list = []
            for view in other_people_views:
                # .xpath('.//span[@class="reply-static-text fn-fl"]/strong/text()')[0].root
                # 发表时间
                # response.xpath('//li[@class="js-reply-floor-container "]')[0].xpath('.//span[@class="reply-static-text fn-fl"]/strong/text()').extract_first()
                # 发表内容
                # response.xpath('//li[@class="js-reply-floor-container "]')[0].xpath('.//div[@class="reply-detail"]').extract_first()
                # 用户id
                # response.xpath('//li[@class="js-reply-floor-container "]')[0].xpath('.//div[@class="js-user-info-container"]/@data-user-id').extract_first()

                # 楼主id
                # //section[@class="fn-container fn-main"]/div[@class="post-wrap"]//div/@data-user-id

                other_time = view.xpath('.//span[@class="reply-static-text fn-fl"]/strong/text()').extract_first()
                other_content = view.xpath('.//div[@class="reply-detail"]').extract_first()
                li_id = view.xpath('./@id').extract_first()
                if li_id and li_id in li_id_list:
                    break
                elif li_id and li_id not in li_id_list:
                    li_id_list.append(li_id)
                other_content = self.parse_font(other_content, tmp_uni_name)
                other_content = re.sub('<.+?>', "", other_content)
                if meta['club_is_video'] != 1:

                    other_id = view.xpath('.//div[@class="js-user-info-container"]/@data-user-id').extract_first()

                else:
                    other_id = view.xpath('./@data-member-id').extract_first()

                other_people_id.append(other_id)
                item['other_people_content'].append({"time": other_time, "author_id": str(other_id),
                                                     "content": other_content.strip(), "name": str(other_id),
                                                     "area": ""})

            "https://club.autohome.com.cn/frontapi/getUserInfoByIds?userids=189641091,196771802,187549"
            if other_people_id:
                try:
                    user_info_url = "https://club.autohome.com.cn/frontapi/getUserInfoByIds?userids=" + ",".join(
                        other_people_id)
                    self.web.get(user_info_url)
                    html_text = self.web.page_source
                    user_info_json = json.loads(re.search('\{.+\}', html_text).group())
                    user_info_json = user_info_json['result']
                    # if meta['comment'] == 1:
                    #     other_len = len(user_info_json)
                    #     # item['author'] = user_info_json[0]['Nickname']
                    #     user_info_json = user_info_json
                    #
                    # else:

                    other_len = len(user_info_json)

                    for i in range(other_len):
                        item['other_people_content'][i]['name'] = user_info_json[i]['Nickname']
                        # item['other_people_content'][i]['author_id'] = other_people_id

                except:
                    pass
            #
            # params = {
            #     "userids":",".join(other_people_id),
            # }
            # user_info_json_resp = requests.get(user_info_url, headers=self.headers, params=params, verify=False)
            # time.sleep(3)
            # try:
            #     user_info_json = user_info_json_resp.json()['result']
            # except:
            #     #没有代理IP获取用户名太容易直接频繁
            #     print()
            # if base_id :
            #     other_len = len(user_info_json[1:])
            #     item['author'] = user_info_json[0]['Nickname']
            #     user_info_json = user_info_json[1:]
            #
            #
            # else:
            #     other_len = len(user_info_json)
            #
            # for i  in range(other_len):
            #     item['other_people_content'][i]['name'] = user_info_json[i]['Nickname']

            next_url = response.xpath('//a[@class="athm-page__next "]/@href').extract_first()
            # self.wait.until(EC.presence_of_all_elements_located((By.XPATH,'//div[@class="user-name"]/a[@class="name"]/@title')))

            if next_url:
                # https://club.autohome.com.cn/bbs/thread/21c824586c8fd075/99077104-2.html#pvareaid=6835679
                next_url = "https://club.autohome.com.cn/" + next_url
                meta['comment'] += 1
                meta['item'] = item
                meta['base_url'] = next_url
                yield Request(next_url, meta=meta, callback=self.parse_content)

            else:

                yield item

    def parse_font(self, content, tmp_name):

        for name_ in tmp_name:
            content = content.replace(name_, tmp_name[name_])

        return content

    def close(self, spider, reason):

        self.web.quit()
        if getattr(self, 'v_display', None):
            print("display 关闭")
            self.logger.info("display 关闭")
            self.v_display.stop()
        print("selenium 关闭")
        self.logger.info("selenium 关闭")