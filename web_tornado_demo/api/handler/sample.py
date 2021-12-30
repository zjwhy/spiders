from .base import BaseHandler
from validator import Required, InstanceOf, Equals, In, validate
from tornado.options import define, options


class Sample(BaseHandler):

    def validate(self, post_data):
        rules = {
            "int": [Required, InstanceOf(int)],
            "str": [Required, InstanceOf(str)]
        }
        check = validate(rules, post_data)
        if check[0] is False:
            return False
        else:
            return True

    def get(self, *args, **kwargs):
        self.error('no data')

    def post(self, *args, **kwargs):

        input = self.parse_post()
        if input is None:
            return self.failure('require data in body')

        if not self.validate(input):
            return self.failure('data validate failed')

        flag = True
        if flag:
            return self.success('success')
        else:
            return self.error('error')
