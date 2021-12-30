from typing import Optional, Awaitable
import tornado.web
import json


class BaseHandler(tornado.web.RequestHandler):
    def data_received(self, chunk: bytes) -> Optional[Awaitable[None]]:
        pass

    def set_default_headers(self):
        self.set_header("Content-Type", "application/json; charset=utf-8")
        pass
        # self.set_header("Access-Control-Allow-Origin", "*")
        # self.set_header("Content-Length", "*")
        # self.set_header("Access-Control-Allow-Headers", "X-Access-Token, Content-Type, access_token")
        # self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def write_error(self, status_code, **kwargs):
        reason = kwargs.get('reason')
        self.write({'code': status_code, 'error': reason})

    def success(self, data):
        self.write({'code': 200, 'data': data})

    def error(self, _reason=''):
        self.write_error(202, reason=_reason)

    def failure(self, _reason=''):
        self.send_error(500, reason=_reason)

    def parse_post(self):
        post_data = None
        try:
            post_data = json.loads(self.request.body, encoding='utf-8')
        except Exception as e:
            print(e)
        return post_data
