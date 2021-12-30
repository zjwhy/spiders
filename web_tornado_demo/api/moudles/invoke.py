import json
from celery import Celery
from celery.result import AsyncResult
from celery import signature
import pymongo


class Invoke:
    def __init__(self,debug=False):
        broker_url = 'amqp://celery:as()zxOP@123.56.247.67:5672//'
        if debug:
            broker_url ="amqp://celery:as()zxOP@172.17.188.12:5672/test"
        self.app = Celery('broker',
                          broker=broker_url,
                          backend='mongodb://192.168.1.202:27017/',
                          )

        self.app.conf.mongodb_backend_settings = {
            'database': 'domino',
            'taskmeta_collection': 'broker',
        }
        self.app.conf.task_serializer = 'json'
        self.app.conf.result_serializer = 'json'
        self.app.conf.accept_content = ['json']

    def invoke_task(self, _task_id):
        job = signature(
            'broker.tasks.assign_task',
            queue='broker.assign_task',
            kwargs={
                'task_id': _task_id
            }
        )
        result = job.apply_async()
        return str(result)
