import tornado.ioloop
import argparse,logging
from app import app
from tornado.options import define,define_logging_options
from tornado import options
from urls import urls
from settings import redlockObj,database,database_debug,redis_obj_debug,redis_obj_
from tornado.log import access_log

define('redlockObj',default=redlockObj)

route = urls

define('port',default=8000,type=int)
options.parse_command_line()
port = options.options.port
log_file = options.options.log_file_prefix
# log_file = "debug"

if "debug" in log_file:
    define("database", default=database_debug)
    define('redis_obj', default=redis_obj_debug)

else:
    define('redis_obj', default=redis_obj_)
    define("database", default=database)

"python3.7 main.py -port=8000 -log_file_prefix=./log/domino_web.log -log_rotate_when=D -log_rotate_interval=1 -log_rotate_mode=time"
# app(route).listen(port)
app(route).listen(port,address="172.17.188.33")
print('启动')
tornado.ioloop.IOLoop.current().start()