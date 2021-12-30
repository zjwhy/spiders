# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals
import base64


class TyspidersSpiderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the spider middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        # Called for each response that goes through the spider
        # middleware and into the spider.

        # Should return None or raise an exception.
        return None

    def process_spider_output(self, response, result, spider):
        # Called with the results returned from the Spider, after
        # it has processed the response.

        # Must return an iterable of Request, dict or Item objects.
        for i in result:
            yield i

    def process_spider_exception(self, response, exception, spider):
        # Called when a spider or process_spider_input() method
        # (from other spider middleware) raises an exception.

        # Should return either None or an iterable of Response, dict
        # or Item objects.
        pass

    def process_start_requests(self, start_requests, spider):
        # Called with the start requests of the spider, and works
        # similarly to the process_spider_output() method, except
        # that it doesn’t have a response associated.

        # Must return only requests (not items).
        for r in start_requests:
            yield r

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)


class TyspidersDownloaderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        # Called for each request that goes through the downloader
        # middleware.

        # Must either:
        # - return None: continue processing this request
        # - or return a Response object
        # - or return a Request object
        # - or raise IgnoreRequest: process_exception() methods of
        #   installed downloader middleware will be called
        return None

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        pass

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)


from twisted.internet.error import TCPTimedOutError,ConnectionRefusedError,\
    ConnectionLost,TimeoutError,ConnectError,ConnectionRefusedError,ConnectionDone
from twisted.web._newclient import ResponseNeverReceived
class TYspiderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        # Called for each request that goes through the downloader
        # middleware.

        # Must either:
        # - return None: continue processing this request
        # - or return a Response object
        # - or return a Request object
        # - or raise IgnoreRequest: process_exception() methods of
        #   installed downloader middleware will be called
        # if 'Referer' in request.headers:
        #     del request.headers['Referer']
        #     request.dont_filter = True
        #     return request
        return None

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        if response.status ==403 or response.status==503 or response.status==405 or response.status==502:
            # meta = request.meta
            # if 'count' in meta:
            #     return response
            # else:
            #     request.meta['count'] = 1
                if spider.proxy_list:
                    ip = spider.proxy_list.pop()
                else:
                    spider.proxy_list = spider.proxy()
                    ip = spider.proxy_list.pop()
                headers = request.headers
                headers['Proxy-Authorization'] = 'Basic ' + base64.b64encode("li227433:yvczersz".encode()).decode()
                index = response.url.find(':')
                h = response.url[:index]
                # meta['proxy'] = '{}://{}'.format(h,spider.proxy_list.pop())
                request.meta['proxy'] = ip if ip.startswith('h') else '{}://{}'.format(h, ip)
                request.dont_filter = True
                # request.meta = meta
                return request
        else:
            return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        if isinstance(exception,TCPTimedOutError) or \
                isinstance(exception,ConnectionRefusedError) or isinstance(exception,ConnectionLost)\
                or isinstance(exception,TimeoutError) or isinstance(exception,ConnectionRefusedError) or isinstance(exception,ConnectError) or \
                isinstance(exception,ResponseNeverReceived) or isinstance(exception,ConnectionDone):
            # global proxy_list
            if 'exce_count' in request.meta:
                if request.meta['exce_count'] >1:
                    return None
                else:
                    request.meta['exce_count'] += 1
            else:
                request.meta['exce_count'] = 1
            if spider.proxy_list:
                ip = spider.proxy_list.pop()
            else:
                spider.proxy_list = spider.proxy()
                ip = spider.proxy_list.pop()

            index = request.url.find(':')
            h = request.url[:index]
            # meta['proxy'] = '{}://{}'.format(h, proxy_list.pop())
            request.meta['proxy'] = ip if ip.startswith('h') else '{}://{}'.format(h, ip)
            request.headers['Proxy-Authorization'] = 'Basic ' + base64.b64encode("li227433:yvczersz".encode()).decode()
            # ua = self.ua.random
            # request.headers['User-Agent'] = ua
            request.dont_filter = True
            return request
        # else:
        #     print()

        # elif isinstance(exception,ResponseNeverReceived):
        #     print()
    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)
