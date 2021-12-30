from peewee import *
from peewee import Field,CharField
from tornado.log import access_log
import json


class BaseModel(Model):
    pass






class JsonField(Field):

    def __init__(self,*args,**kwargs):
        super(JsonField,self).__init__(*args,**kwargs)


    def db_value(self, value):
        try:
            return value if value is None else json.dumps(value,ensure_ascii=False)
        except Exception as e:
            access_log.error("JSONField错误：%s;value：%s"%(e,value))
            return None
    def python_value(self, value):
        try:
            return value if value is None else json.loads(value)

        except Exception as e:
            access_log.error("JSONField错误：%s;value：%s" % (e, value))
            return None