from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
import json


class SMS:
    @staticmethod
    def Send(_mobile, _code):
        code = json.dumps({
            'code': _code
        }, ensure_ascii=True)
        client = AcsClient('xxxxx', 'xxxxxx', 'cn-hangzhou')
        request = CommonRequest()


        response = client.do_action_with_exception(request)
        response_str = str(response, 'utf-8')
        if response_str:
            response_data = json.loads(response_str, encoding='utf-8')
            if 'OK' == response_data['Message'] and 'OK' == response_data['Code']:
                return True

        return False
