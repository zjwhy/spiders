import json,execjs,httpx,requests,time,re
from cv2_parse_img import backg_hk
from PIL import Image
from io import  BytesIO
import os,random

path_list = os.listdir('./track_save')

track_obj ={}

for path in path_list:
    l,t =path.split('_')
    if l not in track_obj:track_obj[l] = []

    track_obj[l].append(path)





with open('geetest_hk_gj.js','r') as f:
    data_js = f.read()

with open("geetest_hk_hy.js",'r') as ff:

    gj_js = ff.read()


def get_gj(track,c_arr,s_str):

    obj = execjs.compile(gj_js)

    encode_str = obj.call("main_gj",track,c_arr,s_str)

    return encode_str

def get_data(gt,challenge,gj_encode,x,passtime,imgload):
    obj = execjs.compile(data_js)

    encry_obj = obj.call("main_encry", gt,challenge,gj_encode,x,passtime,imgload) #gt,challenge,gj_encode,x


    return encry_obj

def img_back(img_bytes):



    img = Image.open(BytesIO(img_bytes))

    # width, height = img.size

    # print(width,height)
    cut_list = [39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51, 33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45, 43, 42,
                12, 13, 23, 22, 14, 15, 21, 20, 8, 9, 25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5, 19, 18, 16, 17]
    img2 = img.copy()
    img2 = img2.resize((260, 116))
    # img.save('tiany.jpg')

    for i in range(len(cut_list)):
        x = cut_list[i] % 26 * 12 + 1

        y = -int(116 / 2) if cut_list[i] > 25 else 0
        # print((x,y,x+10,y))
        if y < 0:
            y = 116
        else:
            y = 58
        rg = img.crop((x, y - 58, x + 10, y))
        # rg.show()

        pa_y = 0 if i < 26 else 58
        pa_x = i - 26 if i >= 26 else i

        img2.paste(rg, box=(pa_x * 10, pa_y, pa_x * 10 + 10, pa_y + 58))

        # rg.show()

        # break
    # img2.save('tiany.jpg')
    return img2

# x = 94 +5
# gt = "f5c10f395211c77e386566112c6abf21"
#
# challenge = "af430cbeb4466f99b03cd5b9f6b3c60ed8"
# gj_encode = get_gj(94)
#
#
# data = get_data(gt,challenge,gj_encode,x)

headers ={
"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
# "Content-Type":"application/json"
}
def get_gt_challenge():

    url ="https://www.tianyancha.com/verify/geetest.xhtml"
    data ={
        "uuid":str(int(time.time()*1000))
    }
    resp =  requests.post(url,headers=headers,json=data,verify=False).json()
    # print(resp)
    return resp['data']

def get_img_x(gt,challenge):

    url = "https://api.geetest.com/get.php"

    params ={
        'gt': gt,
        'challenge': challenge,
        'product': 'popup',
        'offline': 'false',
        'protocol': 'https://',
        'type': 'slide',
        'path': '/static/js/geetest.6.0.9.js',
        'callback': f'geetest_{int(time.time()*1000)}',
    }

    resp  = requests.get(url,params=params,headers=headers,verify=False)
    resp_json = json.loads(re.search('\{.+\}',resp.text).group())

    # print(resp_json)
    new_challenge = resp_json['challenge']

    c_arr = resp_json['c']

    s_str = resp_json['s']

    # url_refer = f"https://api.geetest.com/refresh.php?challenge={challenge}&gt={gt}&callback=geetest_{int(time.time()*1000)}"

    # new_resp = requests.get(url_refer, headers=headers, verify=False)
    # new_resp_json = json.loads(re.search('\{.+\}', new_resp.text).group())

    # new_challenge = new_resp_json['challenge']
    img_host = 'https://static.geetest.com/'

    # bg = img_host + new_resp_json['bg']

    # slice_ = img_host + new_resp_json['slice']
    bg = img_host + resp_json['bg']

    slice_ = img_host + resp_json['slice']
    bg_byte = requests.get(bg,headers=headers,verify=False).content

    slice_byte = requests.get(slice_,headers=headers,verify=False).content
    bg_new_img = img_back(bg_byte)

    new_img2 = bg_new_img.convert("RGB")

    new_byte = BytesIO()

    new_img2.save(new_byte, format="PNG")

    new_bg_by = new_byte.getvalue()

    x = backg_hk(new_bg_by, slice_byte)
    # with open('test.png','wb')  as w:
    #     w.write(new_bg_by)
    return  x,new_challenge,c_arr,s_str

def check_hk(params):
    url = "https://api.geetest.com/ajax.php"
    params['callback'] = f"geetest_{int(time.time()*1000)}"

    resp = requests.get(url,headers=headers,params=params,verify=False)
    result = json.loads(re.search('\((.+)\)',resp.text).group(1))
    print(params,resp.text)
    return result

def get_track(x):


    if str(x) in track_obj:

        find_ = str(x)
    elif str(x-2) in track_obj:

        find_ =str(x-2)

    elif str(x+2) in track_obj:
        find_ = str(x+2)


    else:
        find_ =None
    if find_:
        path_name = random.choice(track_obj[find_])
        print(f"----使用数据集：{path_name}-----")
        with open(f'track_save_old/{path_name}', 'r') as f:
            track = json.loads(f.read())
            return track
    else:
        raise Exception(f"{x}----未采集到")



def geettest_main(gt,challenge):

    x,challenge,c_arr,s_str = get_img_x(gt,challenge)
    track = get_track(x)
    gj_encode_obj = get_gj(track['track_list'],c_arr,s_str)
    # print(gj_encode_obj)
    gj_encode = gj_encode_obj['encode_str']
    passtime = track['passtime']
    imgload = track['imgload']
    data = get_data(gt,challenge,gj_encode,x,passtime,imgload)
    result = check_hk(data)
    result['challenge'] = challenge

    return result
if __name__ == '__main__':
    gt_chall = get_gt_challenge()

    gt = gt_chall['gt']
    challenge = gt_chall['challenge']

    geettest_main(gt,challenge)