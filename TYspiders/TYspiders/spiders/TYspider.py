# -*- coding: utf-8 -*-
import scrapy,time,json,re,hashlib,requests,logging
from scrapy import signals,Request,FormRequest
from ..items import AllItem
from .sign_worker import SignWorker
from urllib.parse import urljoin,quote_plus,unquote_plus

class TyspiderSpider(scrapy.Spider):
    name = 'TYspider'
    allowed_domains = []
    custom_settings = {
        'DOWNLOADER_MIDDLEWARES': { 'TYspiders.middlewares.TYspiderMiddleware': 543},
        'RETRY_ENABLED': False,
        'DOWNLOAD_TIMEOUT':20,

    }

    def __init__(self, keyword=None, clue=None, waste=None, relevantwork=None,app_name=None,start_page=0,search_url='',
                 next_url='',url_xpath='',content_xpath='',other_xpath='',page_type=False,page_num=10,join_type=False,
                 encode_='',bytes_=False,method_=False,data_='',
                 onlyoneclue=None, whitelist=None, report=None, md5=None, id=None, Storage=None, *args, **kwargs):
        super(TyspiderSpider, self).__init__(*args, **kwargs)
        """
                :param   search_url 把拼接位子预留出来
                         next_url 需要把keyword和页数位置预留出来
                         content_xpath 传入一个字典样式的字符串
                         例:<div_id="content2"://div[@id="content2"]|<div_class="ccc"://div[@class="ccc"]
                             :key value 必须是这样的格式,可以更换标签名和标签属性 空格还用$代替,多个key vule用|隔开
                             
                         other_xpath 字典类型的字符串  key值包括(title_xpath,author_xpath,ctime_xpath,page_xpath) 传入格式等同conten_xpath
                         page_type 默认为False 表示直接可以获取总页数,相反就需要结合page_num进行计算得到 参数暂时不用
                         join_type 默认为False 表示拼接时keyword在前面,page数在后面,True就相反
                         page_num  每一页展示的数量，默认为10
                         encode_   传入编码方式，默认是空字符串
                         data_     传入POST表单参数，keyword和翻页page 作为key，提交的key值作为value
                                   例：{"a":"1","keyword":"kw","page":"pg"}
                         method_   默认False为GET请求,相反为POST请求
                        
                        start_page 翻页开始位置,默认为0
        """
        self.keyword = quote_plus(keyword.encode(encode_)) if encode_!='' else quote_plus(keyword)
        self.tableName = Storage
        self.abandoned = waste
        self.relevant = relevantwork
        self.dealwith = onlyoneclue
        self.trust = whitelist
        self.results = report
        self.crawl_md5 = md5
        self.PlantFormID = id
        self.app_name = app_name
        self.start_page = int(start_page)
        self.search_url = search_url
        self.next_url = next_url
        self.url_xpath = url_xpath.replace('$',' ')
        self.content_xpath_str = content_xpath
        self.content_xpath = {}
        self.other_xpath_str = other_xpath
        self.other_xpath = {}
        self.page_type = page_type
        self.join_type = join_type
        self.page_num = int(page_num)
        self.proxy_list = set()
        self.method_ = method_
        self.data_ = json.loads(data_) if data_!="" else ""
        self.sign_worker = SignWorker()

    def start_requests(self):
        self.item = AllItem()
        self.item['tableName'] = self.tableName
        self.item['abandoned'] = self.abandoned
        self.item['relevant'] = self.relevant
        self.item['results'] = self.results
        self.item['dealwith'] = self.dealwith
        self.item['PlantFormID'] = self.PlantFormID
        for xpath_str in self.content_xpath_str.replace('$',' ').split('|'):
            k,v = xpath_str.split(':')
            self.content_xpath[k] = v
        for other_str in self.other_xpath_str.split('|'):
            k,v = other_str.split(':')
            self.other_xpath[k] = v.replace('$',' ')
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0'
        }
        if not self.method_:
            url = self.search_url.format(self.keyword)
            yield Request(url,headers=headers,callback=self.parse,meta={'M':1})
        else:
            url = self.search_url
            data = {}
            for k in self.data_:
                if k =='keyword':
                    data[self.data_['keyword']] = unquote_plus(self.keyword)
                elif k =='page':
                    data[self.data_['page']] = str(self.start_page)
                else:
                    data[k] = self.data_[k]
            yield FormRequest(url,formdata=data,method='POST',dont_filter=True,
                              headers=headers,callback=self.parse,meta={'M':1,'method':1})

    def parse(self, response):
        if 'proxy' in response.meta:
            self.proxy_list.add(response.meta['proxy'])
        url_list = response.xpath(self.url_xpath).extract()
        for url in url_list:
            if not url.startswith('http'):
                url = urljoin(response.url,url)
            yield Request(url,callback=self.info,headers=response.request.headers,)
        # headers = {
        #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'
        # }
        if len(url_list) >= self.page_num:
            self.start_page += 1
            if 'method' not in response.meta:

                if not self.join_type:
                    next_url = self.next_url.format(self.keyword,self.start_page)
                else:
                    next_url = self.next_url.format(self.start_page,self.keyword)

                yield Request(next_url,callback=self.parse,headers=response.request.headers)
            else:

                url = self.search_url
                data = {}
                for k in self.data_:
                    if k == 'keyword':
                        data[self.data_['keyword']] = unquote_plus(self.keyword)
                    elif k == 'page':
                        data[self.data_['page']] = str(self.start_page)
                    else:
                        data[k] = self.data_[k]
                yield FormRequest(url, formdata=data, method='POST', dont_filter=True,
                                  headers=response.request.headers, callback=self.parse, meta={'M': 1, 'method': 1})

        # if 'M' in response.meta:
        #     pages_str = response.xpath(self.other_xpath['page_xpath']).extract_first()
        #     if not self.page_type:
        #         pages = int(pages_str) if pages_str else 1
        #     else:
        #         total = ''.join(re.findall('\d+',pages_str)) if pages_str else 1
        #         total = int(total) if total !='' else 1
        #         pages = total//self.page_num +1 if total > self.page_num else 1
        #
        #
        #     if pages >1:
        #         for i in range(self.start_page+1,pages+1):
        #             if not self.join_type:
        #                 next_url = self.next_url.format(self.keyword,i)
        #             else:
        #                 next_url = self.next_url.format(i,self.keyword)
        #
        #             yield Request(next_url,callback=self.parse,headers=response.request.headers)


    def info(self,response):
        if 'proxy' in response.meta:
            self.proxy_list.add(response.meta['proxy'])

        self.item['url'] = response.url
        self.item['TitleContent'] = response.xpath(self.other_xpath['title_xpath']).extract_first()
        self.item['AuthorContent'] = response.xpath(self.other_xpath['author_xpath']).extract_first()
        self.item['Lntroduction'] = None
        self.item['NovelCategories'] = None
        self.item['ctime'] = response.xpath(self.other_xpath['ctime_xpath']).extract_first()
        xpath = ''
        for k in self.content_xpath:
            if k in response.text:
                xpath = self.content_xpath[k]
                break
        if xpath != '':

            content = response.xpath(xpath).extract()[0]
            img_url = response.xpath('{}//img/@src'.format(xpath)).extract()

            self.item['content'] = ''.join(
                re.findall(r'\d*\w*[\u4e00-\u9fa5]+\d*\w*', content))
            self.item['img_url'] = '|'.join(
                [i if i.startswith('http') else  urljoin(response.url,i) for i in img_url if img_url])
            yield self.item
        else:
            logging.error('未匹配到符合条件的xpath,url为:%s'%response.url)


    def proxy(self):
        url = 'xxxx'
        resp = requests.get(url).json()
        set_ = set()
        for i in resp['data']['proxy_list']:
            set_.add(i)
        return set_