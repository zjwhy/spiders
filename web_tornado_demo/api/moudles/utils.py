import time,json,hashlib
from validator import Required,validate,InstanceOf,In
from config import headers_config

class UtilWorker(object):


    @staticmethod
    def get_lock(redlockObj,handle):
        count = 0
        while 1:
            lock = redlockObj.lock(handle,1000)
            if lock:
                break
            if count == 600:
                return False,lock
            count += 1
            time.sleep(0.1)
        return True,lock

    @staticmethod
    def signature_ed( data=None):
        data_str = json.dumps(data)

        sign = hashlib.new('md5', data_str.encode()).hexdigest()

        return sign

    @staticmethod
    def check_data(rules={},data={}):

        result = validate(rules,data)
        return  result


    @staticmethod
    def check_headers(headers=None):
        headers_rule = {
            'Handle': [Required, In(headers_config)],
            'Vendor': [Required, InstanceOf(str)]
        }
        check = validate(headers_rule, headers)

        return check[0]



