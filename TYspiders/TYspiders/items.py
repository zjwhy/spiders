# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class TyspidersItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class AllItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    url = scrapy.Field()
    aid = scrapy.Field()
    sp_url = scrapy.Field()
    abandoned = scrapy.Field()
    relevant = scrapy.Field()
    results = scrapy.Field()
    dealwith = scrapy.Field()
    tableName = scrapy.Field()
    md5 = scrapy.Field()
    PlantFormID = scrapy.Field()
    content = scrapy.Field()
    num = scrapy.Field()
    book_name = scrapy.Field()
    TitleContent = scrapy.Field()
    AuthorContent = scrapy.Field()
    Number = scrapy.Field()
    NovelCategories = scrapy.Field()
    NovelState = scrapy.Field()
    Lntroduction = scrapy.Field()
    ChapterName = scrapy.Field()
    ctime = scrapy.Field()
    img_url = scrapy.Field()