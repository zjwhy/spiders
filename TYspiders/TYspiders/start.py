from scrapy.cmdline import execute
#爱思想通用爬虫适配参数


aisix = 'scrapy crawl TYspider -a keyword=思想 -a app_name=爱思想 -a content_xpath=<div_id="content2"://div[@id="content2"]|<div_class="ccc"://div[@class="ccc"] -a other_xpath=title_xpath://div[@class="show_text"]/h3/text()|author_xpath://div[@class="about"]/div/strong/text()|ctime_xpath://div[@class="info"]/text()[last()] ' \
    '-a search_url=http://www.aisixiang.com/data/search.php?keyWords={}&searchfield=keywords -a next_url=http://www.aisixiang.com/data/search.php?keyWords={}&searchfield=keywords&page={} -a encode_=gbk -a start_page=1 -a url_xpath=//div[@class="search_list"]/ul/li/a[2]/@href -a Storage=baidu_image ' \
    '-a page_num=30'.split()

#社会科学报 通用爬虫参数
shehuikxb = 'scrapy crawl TYspider -a keyword=功夫 -a app_name=社会科学报 -a content_xpath=<div_class="grey14"://div[@class="grey14"] -a other_xpath=title_xpath://p[@class="fc_green20"]/text()|author_xpath:""|ctime_xpath:"" ' \
    '-a search_url=http://searchgov2.eastday.com/searchskb/search?q={}&page=1&stype=2&cid=8 -a next_url=http://searchgov2.eastday.com/searchskb/search?q={}&page={}&stype=2&cid=8 -a encode_=gb2312 -a start_page=1 -a url_xpath=//div[@class="resultItem"]/a/@href -a Storage=baidu_image ' \
    '-a page_num=20'.split()
#第一财税网
diyicsw = 'scrapy crawl TYspider -a keyword=功夫 -a app_name=第一财税网 -a content_xpath=<div$id="wordContent"://div[@id="wordContent"]|id=fontzoom://td[@id="fontzoom"]|#hiweb_dataBody://div[@id="hiweb_dataBody"] -a other_xpath=title_xpath://title/text()|author_xpath:""|ctime_xpath:"" ' \
    '-a search_url=http://s.tax.org.cn/search.aspx?q={}&s=ALL -a next_url=http://s.tax.org.cn/search.aspx?q={}&s=ALL&p={} -a start_page=1 -a url_xpath=//div[@class="list"]//div[@class="i-title"]/a/@href -a Storage=baidu_image ' \
    '-a page_num=10'.split()

#中国改革网
zhongguoggw = 'scrapy crawl TYspider -a keyword=四川 -a app_name=中国改革网 -a content_xpath=<div$class="$pt-25"://div[@class="$pt-25"] -a other_xpath=title_xpath://div[@class="$pt-25"]/h3/text()|author_xpath://div[@class="$pt-25"]/p/span[2]/text()|ctime_xpath://div[@class="$pt-25"]/p/text() ' \
    '-a search_url=http://chinareform.net/index.php?m=search&c=index&a=init&typeid=1&siteid=1&q={} -a next_url=http://chinareform.net/index.php?m=search&c=index&a=init&typeid=1&siteid=1&q={}&page={} -a start_page=1 -a url_xpath=//div[@class="fr$w880"]/ul/li/a/@href -a Storage=baidu_image ' \
    '-a page_num=6'.split()
#爱妮微

ainiw = 'scrapy crawl TYspider -a keyword=社会 -a app_name=爱妮微 -a search_url=http://web.anyv.net/batch.search.php?searchkey={}&searchname=message&page=1 -a content_xpath=<div$id="article"://div[@id="article"]|div$class="product-desc"://div[@class="product-desc"] -a other_xpath=title_xpath://h1/text()|author_xpath://div[@class="desc$span_3_of_2"]/p[1]/text()|ctime_xpath://div[@class="desc$span_3_of_2"]/p[2]/text() ' \
    '-a next_url=http://web.anyv.net/batch.search.php?searchkey={}&searchname=message&page={} -a encode_=gbk -a start_page=1 -a url_xpath=//ul[@id="sarch_list"]/li/a[1]/@href -a Storage=baidu_image ' \
    '-a page_num=30'.split()

execute(ainiw)
# print(ainiw)

