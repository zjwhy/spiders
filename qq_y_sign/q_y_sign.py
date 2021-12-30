import execjs

with open('qq_y.js','r') as f:
    js_code = f.read()

def get_sign(data):
    js_obj = execjs.compile(js_code)

    result = js_obj.call("get_sign",data)

    return result


data = '{"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":5381,"g_tk":5381},"req_1":{"module":"music.musichallSinger.SingerList","method":"GetSingerListIndex","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":400,"cur_page":6}}}'


result = get_sign(data)

print(result)