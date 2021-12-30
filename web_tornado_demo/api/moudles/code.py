import random
import redis

from .cache import Cache

redis_conf = {
    'host': 'r-2zevktd47sacpig5k6pd.redis.rds.aliyuncs.com',
    'port': 6379,
    'password': '&890uioP',
    'db': 16
}


class Code():
    _Cache = Cache()
    Flag = False

    def __init__(self):
        Code._Cache.connect(redis_conf)

    def generate(self):
        return ''.join([str(random.randint(0, 9)) for _ in range(6)])

    def Generate(self, _mobile):
        code = self.generate()
        if Code._Cache.set(_mobile, code):
            return code
        else:
            return None

    def Verify(self, _mobile, _code):
        code = Code._Cache.get(_mobile)
        return (code == _code)
