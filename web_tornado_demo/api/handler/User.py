from handler.base import BaseHandler
import json,time,hashlib
from json.decoder import JSONDecodeError
from tornado.options import options
from validator import Required,validate,InstanceOf,In,Pattern
from tornado.log import access_log
from moudles.logicModel import LogicBaseModel
from models.vendor import Vendor
from moudles.code import Code

logicModel = LogicBaseModel()

class UserHandler(BaseHandler):


    def initialize(self) -> None:
        define_obj = dict(options.items())
        self.database = define_obj['database']
        self.redlockObj = define_obj['redlockObj']

    def post(self):
        body = self.request.body
        try:

            body_json = json.loads(body.decode())
            rules_for_push =  {
                "name": [Required, InstanceOf(str)],
                "mobile": [Required, InstanceOf(str)],
                "code": [Required, InstanceOf(str)],

            }
            check = validate(rules_for_push,body_json)
            if not check[0]:
                check[1]['data'] = body_json
                return self.write_error(244, reason=check[1])
            code_obj = Code()
            mobile = body_json['mobile']
            name = body_json['name']
            code = body_json['code']
            code_flag = code_obj.Verify(mobile,code)
            if not code_flag:
                return self.write_error(235,reason="验证错误")
            Vendor.bind(self.database)

            result = logicModel.query(Vendor.status,keys_dict={'data':[Vendor.account==mobile]},Model=Vendor)
            if result:
                return self.write_error(236,reason="账号已注册")
            body_json['account'] =body_json['mobile']
            del body_json['mobile']
            del body_json['code']
            insert_result,str_ = logicModel.insert(_data_insert=body_json,Model=Vendor)
            if insert_result:
                return self.success(data="注册成功")
            return self.write_error(237,reason="系统问题,请重试")

        except JSONDecodeError:
            self.write_error(233, reason=body.decode())
            access_log.error({'body': body.decode(), 'tag': 'json错误'})


    def get(self):
        params = self.request.arguments
        params = {key:params[key][0].decode() for key in params}
        params_rule = {
            'mobile':[Required, InstanceOf(str)],
            'code':[Required, InstanceOf(str)],

        }
        check = validate(params_rule, params)

        if not check[0]:
            check[1]['data'] = params
            return self.write_error(244, reason=params)

        code_obj = Code()
        mobile = params['mobile']
        code = params['code']
        code_flag = code_obj.Verify(mobile, code)
        if not code_flag:
            return self.write_error(235, reason="验证错误")

        Vendor.bind(self.database)

        result = logicModel.query(Vendor.account, Vendor.name, Vendor.handle, Vendor.constraint, Vendor.status,
                                      keys_dict={'data': [Vendor.account == mobile]}, Model=Vendor)

        if result:
            return self.success(data=result[0])

        return self.write_error(238, reason="用户未注册")
