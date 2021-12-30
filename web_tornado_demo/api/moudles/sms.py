from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
import json


class SMS:
    @staticmethod
    def Send(_mobile, _code):
        code = json.dumps({
            'code': _code
        }, ensure_ascii=True)
        client = AcsClient('LTAI4G2EHXW77CHSYhSDFYG7', 'RfcxnkocY4YrpKMOu2PC4WggTLavnL', 'cn-hangzhou')
        request = CommonRequest()
        request.set_accept_format('json')
        request.set_domain('dysmsapi.aliyuncs.com')
        request.set_method('POST')
        request.set_protocol_type('https')  # https | http
        request.set_version('2017-05-25')
        request.set_action_name('SendSms')

        request.add_query_param('RegionId', "cn-hangzhou")
        request.add_query_param('PhoneNumbers', _mobile)
        request.add_query_param('SignName', "曜辉科技")
        request.add_query_param('TemplateCode', "SMS_45535058")
        request.add_query_param('TemplateParam', code)

        response = client.do_action_with_exception(request)
        response_str = str(response, 'utf-8')
        if response_str:
            response_data = json.loads(response_str, encoding='utf-8')
            if 'OK' == response_data['Message'] and 'OK' == response_data['Code']:
                return True

        return False
