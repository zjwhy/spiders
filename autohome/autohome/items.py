# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class AutohomeItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    author = scrapy.Field()
    from_community = scrapy.Field()
    publish_time = scrapy.Field()
    time = scrapy.Field()
    location = scrapy.Field()
    base_content = scrapy.Field()
    other_people_content = scrapy.Field()
    imgs = scrapy.Field()
    car_name = scrapy.Field()
    comment_num = scrapy.Field()
    views = scrapy.Field()
    coll_name = scrapy.Field()
    car_tag = scrapy.Field()
    domain_tag = scrapy.Field()
    brand_tag = scrapy.Field()
    crawl_time = scrapy.Field()
    author_id = scrapy.Field()
    area = scrapy.Field()
