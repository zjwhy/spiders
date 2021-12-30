import base64,requests
from fontTools.ttLib import TTFont
import io

woff_str = "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"

b64_ = base64.b64decode(woff_str)

#获取字体带下范围的映射 和对应的ttf和xml文件
def get_coordinates(font_byte:bytes,export_name:str):
    font_obj = TTFont(io.BytesIO(font_byte))

    uni_name_list = font_obj['glyf'].glyphOrder[1:]  # 获取名字
    coor_dict = {}  # 字体的字形范围
    for uni_name in uni_name_list:
        coor_dict[uni_name] = list(font_obj['glyf'][uni_name].coordinates)

    font_obj.save(f'{export_name}.ttf')
    font_obj.saveXML(f'{export_name}.xml')
    return coor_dict

#在线网站http://font.qqe2.com/index-en.html 然后根据ttf文件映射真实的数据

real_name = {
    'unic789':8,
    'unie874':2,
    'unib839':7,
    'unic429':4,
    'unic496':6,
    'unic419':9,
    'unic354':0,
    'unib237':1,
    'unib945':3,
    'unic465':5


}

coordinates_dict = {'unic789': [(300, 728), (188, 728), (125, 670), (67, 617), (67, 539), (67, 482), (94, 443), (122, 401), (179, 381), (179, 379), (123, 365), (84, 317), (42, 266), (42, 197), (42, 102), (176, -14), (423, -14), (492, 45), (558, 102), (558, 197), (558, 266), (516, 317), (477, 365), (421, 379), (421, 381), (476, 401), (506, 443), (533, 482), (533, 539), (533, 617), (475, 670), (412, 728), (300, 661), (375, 661), (419, 622), (456, 589), (456, 482), (423, 448), (383, 409), (216, 409), (177, 448), (144, 482), (144, 589), (181, 622), (223, 661), (300, 344), (386, 344), (434, 301), (477, 262), (477, 134), (434, 95), (387, 53), (213, 53), (123, 134), (123, 262), (167, 301), (213, 344)], 'unie874': [(310, 728), (202, 728), (69, 585), (68, 465), (151, 465), (152, 560), (194, 608), (233, 659), (307, 658), (377, 658), (455, 587), (455, 521), (455, 452), (400, 393), (372, 364), (288, 304), (175, 226), (133, 177), (62, 98), (62, 0), (538, 0), (538, 73), (163, 73), (183, 145), (319, 237), (430, 313), (467, 352), (537, 427), (537, 614), (409, 728)], 'unib839': [(66, 714), (66, 639), (451, 639), (185, 0), (272, 0), (535, 647), (535, 714)], 'unic429': [(384, 714), (24, 240), (24, 162), (383, 162), (383, 0), (461, 0), (461, 162), (577, 162), (577, 229), (461, 229), (461, 714), (380, 607), (383, 607), (383, 229), (93, 229)], 'unic496': [(310, 728), (189, 728), (118, 616), (51, 509), (51, 338), (51, 175), (113, 83), (179, -13), (309, -14), (414, -13), (550, 126), (550, 336), (425, 467), (323, 467), (260, 467), (212, 436), (162, 406), (135, 350), (131, 350), (130, 376), (130, 498), (177, 576), (225, 660), (309, 659), (433, 660), (457, 537), (538, 537), (508, 729), (307, 399), (380, 400), (425, 352), (469, 307), (469, 155), (424, 104), (379, 56), (307, 55), (233, 55), (188, 106), (144, 154), (144, 304), (237, 399)], 'unic419': [(292, 728), (187, 728), (51, 589), (51, 483), (51, 380), (112, 315), (175, 247), (278, 247), (341, 248), (439, 310), (466, 364), (470, 364), (471, 338), (471, 218), (424, 138), (375, 55), (292, 55), (166, 55), (144, 177), (63, 177), (92, -14), (291, -14), (411, -13), (483, 98), (550, 206), (550, 376), (550, 542), (487, 632), (421, 728), (294, 659), (368, 659), (413, 608), (457, 560), (457, 411), (363, 315), (294, 315), (219, 315), (132, 408), (132, 483), (132, 561), (221, 659)], 'unic354': [(300, 728), (171, 729), (107, 615), (50, 519), (50, 195), (107, 99), (171, -14), (427, -14), (493, 99), (550, 195), (550, 519), (493, 615), (427, 729), (300, 658), (396, 658), (438, 555), (469, 483), (469, 233), (438, 159), (396, 57), (204, 57), (162, 159), (132, 233), (132, 483), (162, 555), (204, 658)], 'unib237': [(297, 714), (262, 674), (160, 612), (111, 598), (111, 516), (212, 546), (279, 614), (279, 0), (361, 0), (361, 714)], 'unib945': [(307, 728), (205, 728), (142, 670), (76, 612), (66, 508), (147, 508), (154, 580), (236, 658), (308, 657), (378, 658), (417, 622), (454, 589), (454, 469), (379, 404), (307, 404), (252, 404), (252, 340), (310, 340), (385, 341), (468, 269), (468, 142), (425, 100), (379, 56), (302, 56), (235, 57), (190, 93), (137, 137), (134, 221), (51, 221), (60, 101), (136, 38), (200, -13), (302, -14), (413, -14), (550, 111), (550, 208), (550, 271), (514, 313), (481, 355), (418, 374), (535, 414), (535, 534), (535, 624), (410, 728)], 'unic465': [(105, 714), (67, 320), (145, 320), (167, 363), (209, 384), (249, 406), (300, 406), (378, 407), (468, 313), (468, 227), (468, 152), (370, 56), (295, 56), (229, 56), (186, 88), (138, 124), (132, 192), (51, 192), (58, 94), (133, 37), (199, -14), (294, -14), (400, -14), (472, 51), (549, 120), (549, 228), (549, 343), (422, 473), (320, 473), (271, 474), (229, 456), (182, 438), (152, 402), (148, 402), (172, 641), (520, 641), (520, 714)]}


#在去获取一份字体对对比字体差距多少,好为后面算差值做准备

duibi_str = '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'
duibi_byte = base64.b64decode(duibi_str)

cor = get_coordinates(duibi_byte,'duibi')

# font_obj.save('13.ttf')
# font_obj.saveXML('13.xml')

# print(b64_)

#这个题不是真正意义的动态字体，汽车之家那个才是，需要根据字体大小的偏差来确定 这题偏差定在5以内

def check_font(font:TTFont):


    uni_name_list = font['glyf'].glyphOrder[1:]
    # print(uni_name_list)
    tmp_name = {}
    for uni_name in uni_name_list:
        potion_list = list(font['glyf'][uni_name].coordinates)
        tmp_potion_list = potion_list[:5] if len(potion_list) >=5 else potion_list

        for key, value in coordinates_dict.items():
            flag = True
            real = ''

            real_list = value[:len(tmp_potion_list)]
            for i in range(len(tmp_potion_list)):
                tmp_x,tmp_y = tmp_potion_list[i]
                x,y = real_list[i]
                if abs(abs(tmp_x) - abs(x)) <=3 and abs(abs(tmp_y)-abs(y)) <=3 :
                    pass
                else:
                    flag = False
                    break
            if flag :
                real = key

                break

        if flag:
            tmp_name[uni_name] = real_name[real]


    return tmp_name



base_url = 'https://www.python-spider.com/api/challenge13'

cookie = {
    "sessionid":"r2px0949lvy2ud4x6sws0pgaeesvh7f2"
}
total = 0
for i in range(1,101):

    # try:
        data = {
            "page": i
        }

        resp = requests.post(base_url,cookies=cookie,data=data)
        body = resp.json()



        data = body['data']

        font_str = body['woff']

        font_byte = base64.b64decode(font_str)
        font_tmp_obj = TTFont(io.BytesIO(font_byte))
        tmp_name = check_font(font_tmp_obj)
        tmp_num_  = ""
        for obj in data:
            value = obj['value'].replace('&#x','uni').strip()
            value_list = value.split(' ')
            tmp_str = ""
            for key in value_list:
                tmp_str += str(tmp_name[key])
            tmp_num_ += f"{tmp_str} "
            # print(tmp_str)

            total += int(tmp_str)
        print(f"当前第{i}页;数据分布:{tmp_num_}")
        # print(f"当前第{i}页;总数:{total}")
        # break
    # except:
    #     print(i)
    #
    #     break

print(total)