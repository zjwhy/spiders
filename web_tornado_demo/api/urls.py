from handler.Pool import DoPoolHandler

from handler.Task import GoTaskHandler
from handler.Order import OrderHandler
from handler.Job import JobHandler,PushHandler
from handler.Code import CodeHandler
from handler.User import UserHandler
urls = [
    (r'/pool',DoPoolHandler),
    (r'/task',GoTaskHandler),
    (r'/order',OrderHandler),
    (r'/job',JobHandler),
    (r'/push',PushHandler),
    (r'/user',UserHandler),
    (r'/code',CodeHandler)
]