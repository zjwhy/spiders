from Crypto.Cipher import AES
import binascii,time,requests
key = 'wdf2ff*TG@*(F4)*YH)g430HWR(*)' + 'wse'




url = "https://www.python-spider.com/api/challenge14"
crp = AES.new(key.encode(),mode=AES.MODE_ECB)

encode_str = "mVeYOghwLgqyUox6CjmvzA=="
encode_str = "Heqvd23jJqqzQWBb7Md+MA=="
encode_str = "k7azPXKOJtDLwLPa0KjIeA=="

# decode_str = crp.decrypt(binascii.a2b_base64(encode_str))
#
# print(decode_str)

def tc(str_byte:bytes):

    num_ = 16 - len(str_byte)
    if num_ ==4:
        t = b"\x04"

    elif num_ == 3:
        t = b"\x03"

    elif num_ == 2:
        t = b'\x02'

    for i in range(num_):
        str_byte += t
    return str_byte

# print(b'\x03'.decode())
total = 0
for i in range(1,101):

    time_ = int(time.time())

    str_ = str(time_) +"|"+ str(i)
    encode_str = str_.encode()
    encode_str = tc(encode_str)


    crp_byte = crp.encrypt(encode_str)
    b_64 = binascii.b2a_base64(crp_byte)
    b_64 =b_64.decode().strip()
    # print(b_64)
    # break
    data =  {
        "page":str(i),
        'uc':b_64
    }
    cookies = {
    "sessionid":"z5b5tcbvpz5eb3dp1tw5gui6t2jwxsiy"

    }
    resp = requests.post(url,data=data,cookies=cookies,verify=False)
    body = resp.json()
    print(body)
    for obj in body['data']:
        value = obj['value'].strip()
        total += int(value)
    # time.sleep(1)
print(total)