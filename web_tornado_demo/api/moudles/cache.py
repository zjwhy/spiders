import json
import redis


class Cache:
    def __init__(self):
        self.conn = None
        self.db = 11

    def connect(self, _conf):
        host = _conf['host']
        port = _conf['port']
        password = _conf['password']
        db = _conf['db']
        self.conn = redis.Redis(host=host, port=port, password=password, decode_responses=True,
                                db=db)

    def set(self, key, _value):
        return self.conn.setex(key,60, _value)

    def get(self, key):
        value = self.conn.get(key)
        return value

    def remove(self, _key):
        return self.conn.delete(_key)



    def close(self):
        return self.conn.close()
