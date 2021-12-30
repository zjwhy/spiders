
from peewee import *
import pymysql
from pymysql import Connection
from dbutils.pooled_db import PooledDB
from config import *
from redlock import Redlock
from playhouse.pool import PooledMySQLDatabase
from redis import Redis
from moudles.logicModel import LogicBaseModel
from models.task import Task
from models.job import Job
l = LogicBaseModel()




redlockObj = Redlock([redis_config_aliyun])
database_debug = PooledMySQLDatabase(**test_mysql_config)
database = PooledMySQLDatabase(**mysql_config)

redis_obj_debug = Redis(**redis_config_aliyun_job_debug,health_check_interval=30)
redis_obj_ = Redis(**redis_config_aliyun_job,health_check_interval=30)