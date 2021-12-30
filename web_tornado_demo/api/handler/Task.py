from handler.base import BaseHandler
import json,time,hashlib
from json.decoder import JSONDecodeError
from tornado.options import options
from validator import Required,validate,InstanceOf,In,Pattern
from tornado.log import access_log
from moudles.logicModel import LogicBaseModel
from models.order import Order
from models.task import Task
from models.job import Job
from moudles.utils import UtilWorker
from config import headers_config
from datetime import datetime
logicModel = LogicBaseModel()

class GoTaskHandler(BaseHandler):


    def initialize(self) -> None:
        define_obj = dict(options.items())
        self.database = define_obj['database']
        self.redlockObj = define_obj['redlockObj']
        self.redis_obj = define_obj['redis_obj']

    def post(self):
        body = self.request.body
        try:

            body_json = json.loads(body.decode())
            rules_for_push =  {
                "proj": [Required, InstanceOf(str)],
                "app": [Required, InstanceOf(str)],
                "task": [Required, InstanceOf(str)],
                "job_id":[Required,InstanceOf(str)],
                "limit":[Pattern(r'\d+')]
            }
            check = validate(rules_for_push,body_json)
            if not check[0]:
                check[1]['data'] = body_json
                return self.write_error(244, reason=check[1])
            headers = self.request.headers._dict
            check = UtilWorker.check_headers(headers=headers)

            if not check:
                return self.write_error(244, reason=headers)
            handle = headers['Handle']
            body_json['handle'] = handle
            body_json['vendor'] = headers['Vendor']
            lock_flag, lock = UtilWorker.get_lock(self.redlockObj,handle)
            if not lock_flag:
                return self.write_error(500, reason='get_lock_Timeout')

            try:


                Task.bind(self.database)
                Order.bind(self.database)
                limit = body_json.get('limit',None)
                body_json['limit'] = limit
                result = logicModel.task_update(body_json=body_json, Model=Task, Order=Order)

                if isinstance(result, bool):
                    return self.write_error(500,reason='rollback')


                elif result ==[]:
                    return self.write_error(288,reason="无当前任务")

                else:
                    self.success({"order_id":result})
            finally:
                    self.redlockObj.unlock(lock)
        except JSONDecodeError:
            self.write_error(233, reason=body.decode())
            access_log.error({'body': body.decode(), 'tag': 'json错误'})


    def get(self):
        params = self.request.arguments
        params = {key:params[key][0].decode() for key in params}
        params_rule = {
            'page':[Pattern('\d+')],
            'orderby':[In(['begin_time','end_time','task_count'])],
            'sort':[In(['asc','desc'])],
            'proj':[InstanceOf(str)],
            'app':[InstanceOf(str)],
            'task':[InstanceOf(str)]
        }
        check = validate(params_rule, params)

        if not check[0]:
            check[1]['data'] = params
            return self.write_error(244, reason=params)
        page = params.get('page',1)
        order_by = params.get('orderby',"begin_time")
        sort = params.get('sort','asc')
        proj = params.get('proj',False)
        app = params.get('app',False)
        task = params.get('task',False)
        headers = self.request.headers._dict

        check = UtilWorker.check_headers(headers=headers)

        if not check:
            return self.write_error(244, reason=headers)
        handle = headers['Handle']
        if handle:
            where_list = [Task.handle==handle,Task.stage==1,Task.status==0]
            if proj:
                where_list.append(Task.proj==proj)
            if app:
                where_list.append(Task.app==app)
            if task:
                where_list.append(Task.task==task)
            result = logicModel.group_query(where_list=where_list,db_=self.database,order_by=order_by,page=int(page),sort=sort,redis_obj=self.redis_obj)
            # for obj in result:
            #     obj['begin_time'] =obj['begin_time'].strftime('%Y-%m-%d %H:%M:%S')
            #     obj['end_time'] =obj['end_time'].strftime('%Y-%m-%d %H:%M:%S')
            if isinstance(result,str):
                return self.write_error(277,reason=result)
            self.success(result)
            access_log.error(f"{order_by}_{sort}任务列表响应完成时间:{datetime.now()}")

        else:
            self.write_error(244,reason=handle)



