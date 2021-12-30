# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
from pymssql import connect
from .sql_insert import sql_insert
from uuid import uuid1

class TyspidersPipeline(object):
    def open_spider(self, spider):

        self.conn = connect(server='127.0.0.1', user=r'LAPTOP-OQITIP8D\why_768', password=" ", database='test_db')

        self.cur = self.conn.cursor()
        self.all_sql = "select PrimaryClueAddress from {}"
        # self.i_sql = "insert into {}(Url,PlantFormID,ProcessingTime,VideoPath) VALUES ('{}','{}','{}','{}')"
        # self.i_sql = "insert into {}(PrimaryClueAddress,ID,CreateDate,PlantForm,ThreadType) VALUES ('{}','{}','{}','{}','{}')"
        self.i_sql = "insert into {}(PrimaryClueAddress,ID,CreateDate,PlantForm,TitleContent,AuthorContent,NovelCategories,Lntroduction,ThreadType) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')"
        self.count = 0
        self.ed_count = 0
        # sql = "insert into crawlstate(state,CrawlMd5Name) values(1,'{}')".format(spider.crawl_md5)
        # self.cur.execute(sql)
        # self.conn.commit()
        print('爬虫开始')

    def process_item(self, item, spider):
        # url = auth('{}/{}/{}.txt'.format(spider.app_name, item['book_name'], item['num']), item['content'])
        item['PlantFormID'] = uuid1()

        sql_insert(self.all_sql, self.i_sql, self.conn, self.cur, item, spider, )
        return item

    def close_spider(self, spider):
        sql = "update crawlstate set state=0 where CrawlMd5Name='{}'".format(spider.crawl_md5)
        self.cur.execute(sql)
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        # print(spider.flag)
        print('爬虫结束')