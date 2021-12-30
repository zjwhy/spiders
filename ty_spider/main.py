import tornado.ioloop
import tornado.web,hashlib
from pywebio.platform.tornado import webio_handler
from pywebio.input import *
from pywebio.output import *
from tiany_spider import TYSpider
import json
from pywebio.session import *

class IndexHandler(tornado.web.RequestHandler):


    def get(self):

        self.write("我就看看行不行！！！！！！")



class SpiderHandler:


    @classmethod

    def get_auth(cls):
        ac_pwd = input("输入用户名和密码(xxx;xxxxx)")

        ac,pwd = ac_pwd.split(';')

        ac_obj = getattr(cls,ac,None)

        if ac_obj == None:

            ac_obj = TYSpider(ac,pwd)
            setattr(cls,ac,ac_obj)

        set_localstorage = lambda key, value: run_js("localStorage.setItem(key, value)", key=key, value=value)

        set_localstorage('account', ac)

        query =eval_js('window.location.href = window.location.protocol +"//" +window.location.host+"/search"')


        put_text(query)

    @classmethod

    def search(cls):
        get_localstorage = lambda key: eval_js("localStorage.getItem(key)", key=key)

        ac = get_localstorage('account')
        # print(ac)
        key = input("输入搜索关键字")

        key_md5 = hashlib.new('md5',key.encode()).hexdigest()

        key_result = getattr(cls,key_md5,None)

        if key_result != None:
             put_text(key_result)
             button =  put_button('重新输入',onclick=lambda :eval_js('window.location.href = window.location.protocol +"//" +window.location.host+"/search"'),color='info',outline=True)
             return  button

        ac_obj = getattr(cls,ac,None)

        if ac_obj == None:

            query = eval_js('window.location.href = window.location.protocol +"//" +window.location.host+"/auth"')

            return put_text(query)

        result = ac_obj.run(key)
        result = json.dumps(result,ensure_ascii=False)
        setattr(cls,key_md5,result)

        put_text(result)

        button = put_button('重新输入', onclick=lambda: eval_js(
            'window.location.href = window.location.protocol +"//" +window.location.host+"/search"'), color='info',
                            outline=True)
        return button

    @classmethod
    def index(cls):
        put_text("TY爬虫")

        button = put_button('用户授权', onclick=lambda: eval_js(
            'window.location.href = window.location.protocol +"//" +window.location.host+"/auth"'), color='info',
                            outline=True)
        return button



if __name__ == '__main__':
    app = tornado.web.Application(
        [
            (r'/',webio_handler(SpiderHandler.index)),
            (r'/auth',webio_handler(SpiderHandler.get_auth)),

            (r'/search', webio_handler(SpiderHandler.search))

        ]
    )

    app.listen(port=8001, address='localhost')
    tornado.ioloop.IOLoop.current().start()
    # SpiderHandler.get_auth()

