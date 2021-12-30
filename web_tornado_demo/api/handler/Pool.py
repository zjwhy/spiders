from handler.base import BaseHandler
import json,hashlib
from json.decoder import JSONDecodeError
from tornado.log import access_log
from tornado.options import options
from validator import Required,validate,InstanceOf,In
from moudles.logicModel import LogicBaseModel
from models.pool import Pool
from models.task import Task
from moudles.utils import UtilWorker
logicModel = LogicBaseModel()

class DoPoolHandler(BaseHandler):

    def initialize(self) -> None:
        define_obj = dict(options.items())
        self.database = define_obj['database']
    def post(self):

        body = self.request.body
        try:
            body_json = json.loads(body.decode())
            rules_for_push = {
                "proj": [Required, InstanceOf(str)],
                "app": [Required, InstanceOf(str)],
                "type": [Required, InstanceOf(str),In(['period','timeoff','oneoff'])],
                "data": [Required, InstanceOf(dict)]
            }
            check = validate(rules_for_push,body_json)
            if not check[0]:
                check[1]['data'] = body_json
                return self.write_error(244, reason=check[1])

            data = body_json['data']
            if body_json['type'] == "period" or body_json['type'] =="timeoff":
                rules = {
                    'begin_time':[Required,InstanceOf(str)],
                    'end_time':[Required,InstanceOf(str)],
                    'id':[Required,InstanceOf(str)],
                    'task':[Required,InstanceOf(str)]
                        }
            else:
                rules = {
                    'task': [Required, InstanceOf(str)]
                    }
            check_data = UtilWorker.check_data(rules=rules,data=data)
            if not check_data[0]:
                check_data[1]['data'] = body_json
                return self.write_error(244, reason=check_data[1])
            task = data['task']
            del data['task']
            body_json['job_id'] = data.get('job_id','')
            body_json['data_id'] = data['id']
            if 'begin_time' in data:
                body_json['begin_time'] = data['begin_time']
                body_json['end_time'] = data['end_time']
            pool_id = hashlib.new('md5',(body_json['job_id']+body_json['data_id']).encode()).hexdigest()
            body_json['id'] = pool_id
            body_json['task'] = task
            Pool.bind(self.database)
            flag,result = logicModel.insert(body_json,Model=Pool)
            if flag:
                self.success({"id":pool_id})
            else:
                self.write_error(500,reason=result,stack_info=True)

        except JSONDecodeError:
            self.write_error(233,reason=body.decode())
        except  Exception as e:
            access_log.error("288 未知错误：%s;上传body:%s"%(e,body.decode()))
            self.write_error(288,reason=body.decode())
        self.finish()




    def delete(self):

        body_json = self.request.arguments
        try:
            rules_for_push = {
                "id": [Required, InstanceOf(list)],
            }
            check = list(validate(rules_for_push,body_json))
            if not check[0]:
                return self.write_error(244, reason=check[1])

            pool_id = body_json['id'][0].decode() if body_json['id'] else ""

            Pool.bind(self.database)
            Task.bind(self.database)
            where_list_pool = [Pool.id==pool_id,Pool.status!=0]
            where_list_task = [Task.pool_id==pool_id,Task.stage==1]
            pool_flag,pool_1 = logicModel.update(Model=Pool,where_list=where_list_pool,update_dict={"status":-2})
            task_flag,task_1 = logicModel.update(Model=Task,where_list=where_list_task,update_dict={"status":-2,"stage":-2})
            if task_flag:
                return self.success({"id":pool_id})
            return self.write_error(288, reason={"id": pool_id})


        except  Exception as e:
            access_log.error(f"288 未知错误：{e};上传body:{body_json}")
            pool_id = body_json['id'][0].decode() if body_json['id'] else ""

            self.write_error(288,reason={"id":pool_id})

    def query_handle(self,body_json,model=None):

        proj = body_json['proj']
        app = body_json['app']
        task = body_json['task']
        select_dict = {
            'data': (model.proj==proj,model.app==app,model.task==task),
        }
        query_result = logicModel.query(model.mode,model.handle,
                                        keys_dict=select_dict,Model=model)


        return query_result

