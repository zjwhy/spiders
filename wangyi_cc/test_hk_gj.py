from wangyi_cc.cc_login_hk import get_cookie,hk_gj,get_hk_da,get_actoken,get_cb,get_img_byte,img_show,drag_x,get_callback
import json
from wangyi_cc.cc_login_hk import *

# init_config()
data_str = '{"r":1,"d":"4z4l/rJI2alEAFREVVIujguDuj6CAXvn","i":"L8G6AikHiXl8wzOYlCh7KHS3BOJfwrlRO45De8SrSabaeW8K0FRDRaDoGHEKrc5PgGTLdoqCBT+G5MeQjiYm6wbKTAFuSi4oQHaU3yRURLuGMLFTxywbRyMDNPVbBqZ7M0I="}'
# print(json.dumps(data_str))
a = get_nike(data_str)
print(a)

b = '{"r":1,"d":"%(dt)s","i":"%(ni)s"}'%({"dt":1,"ni":2})
print(b)
# a = get_tid()
# print(a)
# fp_cookie, ua = get_cookie()

# fp = get_fp(ua)

# print(fp)
# login("asdasdasd@163.com",ua)

# img_b = get_img_byte("https://necaptcha.nosdn.127.net/0101e921abfa450194667cb68f58105a.jpg")
#
# dx = img_show(img_b)
#
# img_token = "2588199957f44739aaaeebe9848d1cdc"
# # dx  =drag_x
#
# gj_list , gj_p , gj_ext = hk_gj(img_token,dx)
#
# gj_50_str = ":".join(gj_list)
#
# da = get_hk_da(gj_50_str)
#
# p = get_hk_da(gj_p)
#
# ext = get_hk_da(gj_ext)
#
# print(json.dumps({"d":da,"m":"","p":p,"ext":ext}))

# print(get_actoken())

# print(json.dumps({"cb":get_cb()}))


a = '{"cb": "T\\KPz1Ygr4H/eN4a9jBayK9nioG1swT1YA0fkSobmYrZmOzs4/mnZIxFM5Eozx4Q"}'

# print(len(a.replace('{"cb": "',"").replace('"}','')))
# b = get_cb()
# print(b,len(b))
#
# # print(get_callback())
# print(get_cookie())