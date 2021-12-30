from handler.base import BaseHandler
import json,time,hashlib,re
from json.decoder import JSONDecodeError
from tornado.options import options
from validator import Required,validate,InstanceOf,Pattern
from tornado.log import access_log
from moudles.logicModel import LogicBaseModel
from models.order import Order
from models.task import Task
from moudles.utils import UtilWorker
from moudles.invoke import Invoke
logicModel = LogicBaseModel()

class OrderHandler(BaseHandler):
    def initialize(self) -> None:
        define_obj = dict(options.items())
        self.database = define_obj['database']
        self.redlockObj = define_obj['redlockObj']
        self.invoke = Invoke(debug=True) if self.database.database =="domino_test"  else Invoke()
    def get(self):
        headers = self.request.headers._dict

        check = UtilWorker.check_headers(headers=headers)

        if not check:
            return self.write_error(244, reason=headers)
        params = self.request.arguments
        params = {key: params[key][0].decode() for key in params}
        params_rule = {
            'proj': [InstanceOf(str)],
            'app': [InstanceOf(str)],
            'task': [InstanceOf(str)],
            'status':[Pattern('\d')]
        }
        try:

            check = validate(params_rule, params)
            if not check[0]:
                return self.write_error(244, reason=params)
            Order.bind(self.database)
            keys_dict = {}
            keys_list = []
            for key in params:
                value = params[key]
                if key =='status':
                    value = int(value)

                keys_list.append(getattr(Order,key)==value)
            keys_list.append(Order.vendor == headers['Vendor'])
            keys_dict['data'] = keys_list
            result_list = logicModel.query(Order.proj, Order.app, Order.task, Order.id, Order.status, Order.worker,Order.created_at,
                                      keys_dict=keys_dict, Model=Order)
            for obj in result_list:
                obj['created_at'] = obj['created_at'].strftime('%Y-%m-%d %H:%M:%S')
            sort_result = []
            if result_list:
                sort_result = sorted(result_list,key=lambda result:result["created_at"],reverse=True)
            return self.success({"list_order": sort_result})


        except Exception:
            self.write_error(500, reason='获取订单列表错误')
            access_log.error({'body': params, 'tag': '获取订单列表错误'})
    def post(self):
        headers = self.request.headers._dict

        check = UtilWorker.check_headers(headers=headers)

        if not check:
            return self.write_error(244, reason=headers)
        body = self.request.body
        try:

            body_json = json.loads(body.decode())
            rules_for_push = {

                "id": [Required, Pattern('[^\u4e00-\u9fa5]{32}')]
            }
            check = validate(rules_for_push, body_json)
            if not check[0]:
                return self.write_error(244, reason=body_json)
            order_id = body_json['id']
            Order.bind(self.database)
            keys_dict = {'data': (Order.id == order_id,)}
            select_set = (
            Order.id, Order.proj, Order.app, Order.task, Order.worker, Order.created_at, Order.data, Order.status)
            select_result = logicModel.query(*select_set, keys_dict=keys_dict, Model=Order)
            access_log.info(f"order_post_body:{body.decode()}")
            if not select_result:
                return self.write_error(288,reason='未查到该订单')
            select_result = select_result[0]
            if select_result['status'] != 0:
                return self.write_error(288, reason="%s订单号已被上报或者已经逾期,不能被拉取!" % order_id)
            sign = UtilWorker.signature_ed(select_result['data'])
            select_result['signature'] = sign
            select_result['created_at'] = select_result['created_at'].strftime('%Y-%m-%d %H:%M:%S')
            return self.success(select_result)
        except JSONDecodeError:
            self.write_error(233, reason=body.decode())
            access_log.error({'body': body.decode(), 'tag': 'json错误'})

    def put(self):
        """
        上报
        :return:
        """
        body =self.request.body
        try:
            headers = self.request.headers._dict

            check = UtilWorker.check_headers(headers=headers)

            if not check:
                return self.write_error(244, reason=headers)
            rules = {
                "id": [Required, InstanceOf(str)],
                "data": [Required, InstanceOf(list)],
                "signature": [Required, InstanceOf(str)],
            }

            body_json = json.loads(body.decode())

            check = validate(rules,body_json)

            if not check[0]:
                check[1]['data'] =  body_json
                return self.write_error(244, reason=check[1])
            Order.bind(self.database)
            order_id = body_json['id']
            keys_dict = {'data': (Order.id == order_id,)}
            select_set = ( Order.id, Order.proj, Order.app, Order.task, Order.worker, Order.created_at, Order.data, Order.status)
            select_result = logicModel.query(*select_set, keys_dict=keys_dict, Model=Order)
            access_log.info(f"order_put_body:{body.decode()}")

            if not select_result:
                return self.write_error(288,reason='上报的订单未知')
            select_result = select_result[0]
            if select_result['status'] != 0:
                return self.write_error(288, reason="%s订单号已被上报,不要重复上报!" % order_id)
            result_list = body_json['data']
            self.success("上报成功")
            self.finish()
            Task.bind(self.database)

            for result in result_list:
                task_id = result['id']
                code = result['code']
                update_dict = {'result': result, "stage": 3, }
                if code == 1:
                    status = 1
                else:
                    status = 0

                update_dict['status'] = status
                where_list = [Task.id==task_id]
                del update_dict['result']['code']
                del update_dict['result']['id']
                flag,flag_str = logicModel.update(Model=Task,where_list=where_list,update_dict=update_dict)
                if flag:
                    invoke_result = self.invoke.invoke_task(task_id)
                    invoke_update = {'stub':invoke_result}
                    flag, flag_str = logicModel.update(Model=Task, where_list=where_list, update_dict=invoke_update)
                else:
                    access_log.error(f"上报错;task_id:{task_id},status:{status},update:{update_dict}")
            Order.bind(self.database)
            logicModel.update(Model=Order,where_list=[Order.id==body_json['id']],update_dict={'status':1})


        except JSONDecodeError :
            print("json错误")

            self.write_error(233, reason=body.decode())
            access_log.error({'body': body.decode(), 'tag': 'json错误'})