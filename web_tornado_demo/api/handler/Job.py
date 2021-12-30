from handler.base import BaseHandler
import json,hashlib
from json.decoder import JSONDecodeError
from tornado.log import access_log
from tornado.options import options
from validator import Required,validate,InstanceOf
from moudles.logicModel import LogicBaseModel
from models.job import Job
from moudles.utils import UtilWorker
logicModel = LogicBaseModel()

class JobHandler(BaseHandler):

    def initialize(self) -> None:
        define_obj = dict(options.items())
        self.database = define_obj['database']
        self.redis_obj = define_obj['redis_obj']

    def post(self):

        body = self.request.body
        try:
            body_json = json.loads(body.decode())
            rules_for_push = {
                "id": [Required, InstanceOf(str)],
                "proj": [Required, InstanceOf(str)],
                "app": [Required, InstanceOf(str)],
                "task": [Required, InstanceOf(str)],
                "begin_time": [Required, InstanceOf(str)],
                "end_time": [Required, InstanceOf(str)],
                "title": [Required,InstanceOf(str)],
                "rejection": [Required,InstanceOf(list)],
                "specification":[Required,InstanceOf(list)]
            }
            check = validate(rules_for_push,body_json)

            # access_log.error(f"job_push:{check},{type(check)}")
            access_log.error(f"job_push:{body.decode()}")
            if not check[0]:
                return self.write_error(244, reason="缺少必要参数")

            Job.bind(database=self.database)
            flag,result = logicModel.insert(body_json,Model=Job)
            if flag:
                job_id = body_json['id']
                begin_time = body_json['begin_time']
                end_time = body_json['end_time']
                self.redis_obj.hset(job_id,"begin_time",begin_time)
                self.redis_obj.hset(job_id,"end_time",end_time)
                self.success(result)
            else:
                self.write_error(500,reason=result,stack_info=True)

        except JSONDecodeError:
            self.write_error(233,reason=body.decode())
        except  Exception as e:
            access_log.error("288 未知错误：%s;上传body:%s"%(e,body.decode()))
            self.write_error(288,reason=body.decode())
        self.finish()

    def get(self):
        try:
            job_id = self.get_argument('job_id',None)
            Job.bind(self.database)
            if not job_id:
                result = logicModel.query(Job.id,keys_dict={"data":[Job.status==1]},Model=Job)
            else:
                result = logicModel.query(Job.proj,Job.app,Job.task,Job.specification,Job.rejection, keys_dict={"data": [Job.id == job_id]}, Model=Job)
                result = result[0] if result else {}

            self.success(result)
        except Exception as e:
            self.write_error(500,reason="系统错误，稍后重试")
            access_log.error("500 获取资源错误%s"%self.request.body.decode())
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

class PushHandler(BaseHandler):

    def post(self):
        file = '/home/serv/local.json'
        # file = 'local.json'
        body = self.request.body.decode()

        with open(file,'a',encoding='utf8') as f:
            f.write(body+"\n")

        self.success("ok")