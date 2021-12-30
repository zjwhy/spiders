import cv2,requests,json,re,time
import numpy as np

# with open('tiany.jpg','rb') as b:
#     backg = b.read()
#
# with open('tiany_hk.png', 'rb') as h:
#     hk = h.read()

#滑块识别  目前看极验也可以识别 极验需要减去一个黑边长度
def backg_hk(backg,hk,num=1):
    backg = cv2.imdecode(np.frombuffer(backg, np.uint8), cv2.IMREAD_COLOR)
    hk = cv2.imdecode(np.frombuffer(hk, np.uint8), cv2.IMREAD_COLOR)
    backg_edg = cv2.Canny(backg,backg.shape[0],backg.shape[1])
    hk_edg = cv2.Canny(hk,hk.shape[0],hk.shape[1])


    backg_pic = cv2.cvtColor(backg_edg,cv2.COLOR_GRAY2BGR)
    hk_pic = cv2.cvtColor(hk_edg,cv2.COLOR_GRAY2BGR)
    # 缺口匹配
    res = cv2.matchTemplate(backg_pic, hk_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)  # 寻找最优匹配

    # 绘制方框
    th, tw = hk_pic.shape[:2]
    tl = max_loc  # 左上角点的坐标
    br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
    cv2.rectangle(backg, tl, br, (0, 0, 255), 2)

    # cv2.imshow(f'xx{num}',backg)
    # cv2.imshow(f'xx{num}.{num}',hk)
    return tl[0]

# tl = backg_hk(backg,hk)
# print(tl)
# cv2.waitKey()
#
# cv2.destroyAllWindows()