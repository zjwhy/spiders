from handler.base import BaseHandler
import json,time,hashlib
from json.decoder import JSONDecodeError
from tornado.options import options
from validator import Required,validate,InstanceOf,In,Pattern
from tornado.log import access_log
from moudles.logicModel import LogicBaseModel
from moudles.code import Code
from moudles.sms import SMS
logicModel = LogicBaseModel()

class CodeHandler(BaseHandler):


    def initialize(self) -> None:
        define_obj = dict(options.items())
        self.database = define_obj['database']
        self.redlockObj = define_obj['redlockObj']

    def post(self):
        body = self.request.body
        try:

            body_json = json.loads(body.decode())
            rules_for_push =  {
                "mobile": [Required, InstanceOf(str)],

            }
            check = validate(rules_for_push,body_json)
            if not check[0]:
                check[1]['data'] = body_json
                return self.write_error(244, reason=check[1])
            headers = self.request.headers._dict
            mobile = body_json['mobile']
            code_obj = Code()
            code = code_obj.Generate(mobile)
            if not code:
                return self.write_error(234,reason="网络问题请重试")
            send = SMS.Send(mobile,code)
            if not send :
                return self.write_error(234,reason="请求次数频繁,请稍后重试")
            return self.success(data="验证码发送成功")

        except JSONDecodeError:
            self.write_error(233, reason=body.decode())
            access_log.error({'body': body.decode(), 'tag': 'json错误'})







