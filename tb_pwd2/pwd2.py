import execjs,requests


with open('tb_pwd2.js','r') as f:
    js_code = f.read()

def get_pwd(pwd):
    js_obj = execjs.compile(js_code)

    result = js_obj.call("getpwd",pwd)

    return result

data = {
"loginId":"222222",
"password2":get_pwd("11111111"),
"keepLogin":"false",
"ua":"140#N6sDPEqCzzPGjzo2LxHTA6SogBu12e3+vgGfp+W/XEt2gBEjiLZsHB5wKPqH2Fde9aqneU3VriT75lXJt0YpKketdbEqlbzxgkCt/hHEzzcz02PsU6OzzPzbVXlqlbrDanRm4rf8zFFy2XMvl61zzPNXp7tjwQcn2Pdk/61zxQKf2XGdlplfzPKUV2Tpmz4a2P+HDtQwzFKu2XGYrkQhOSvZrI7Zbvz6lsyczWHVvqWFB01vn/GyCz7AB7Bt/+KEn9czkTDHBl+rGIIy/ohSw3RqOZhooJas7tGQKs9yZ2kTyflvG7KI7uUh13RUMzTMEzYGQR7fjqFr2vzePIlydwjeQtFKXSF33tcOIFWWfGbMQmNjKbCo47n1gHYwEo2/uwnVF5bqwEXmSQ2nFo18glVKY2SqucjcCCr2BxXaGDRBexEdDOxr1K1j6U6n65qh+vr6f8GXEZMUBGhswFsZDHRFG2jq08bya0WrGkrUdSptsXr0N6R688GG7LH9Cu4j6UTgiFhy7eQn5QMeIRsGLZSbdwaJEQifbp5tQ1cW28dW49RLyO1gBg3pWMvnVW/XmpApYheeG6M/8jsJDuwd+DvpxCQPMAYrcKcc/OWKKvW+RX/0W+jy8So/+jB4oQWcPJLuQVYQduheGLfTJXwWumbrpU9mMThxajR+/wsKz4yZz23mLT7Dp0EDuZXK7+GahoZY8YMlZzMKfRc0KWF4sx1nRBxbkx+5tVD7nr1xiG2FH1zDC8Cwkre0DAKDzRzK/RfEMlNCmGUnXbQ9Jp7LaIOTPt0REVPdCIxoaqQ5yrQN+6OlBIQmcTmh5QSTGV6xFE6zULzd4AX1+WR0cQM1Lkxj6PmkzHnj8dTRqJArXtVyivPALKRm8iERzupIY/ZdHaVTzXUELQe6621IKvMW3hDBNtEB7qyIQEKbAiO2Vk8iCta5zJnHs1K6r3fSpsS/unJOUtreTcG4tGuq6pR4WzAlVvQW8cJcV8yfBettrRjb6aj+Ek/do96vW2buYY8t3inVabN46KStF0TPXG6XV4N1nA//Xq0NCcj0o8TK71ntDtQjn04Rc2EKuFABmrI9jSvwQCEUtF6RscNrYbLRYaAmuzG+vo2/m/9SctqfdLVocrcPRgKb04fF",
"umidGetStatusVal":"255",
"screenPixel":"1920x1200",
"navlanguage":"zh-CN",
"navUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
"navPlatform":"MacIntel",
"appName":"taobao",
"appEntrance":"taobao_pc",
"_csrf_token":"0HY4d4I7odvTXFh0DcVQRG",
"umidToken":"c9a310933ac52b0f301ee15388a8c0a43e23008a",
"hsiz":"12a0f97430c455b0e409c0f9ca748e68",
"bizParams":"",
"style": "default",
"appkey":"00000000",
"from":"tbTop",
"isMobile":"false",
"lang":"zh_CN",
"returnUrl": "https://www.taobao.com/",
"fromSite":"0",
# "bx-ua":"212!zCWWZp9TWWBCk/yRUB5oEY0ITO4wWWW6E9hZvA9Tu6Lw/PQ7xnlhfmpITO4wWWtv0eHXvAc9paBYORXivaEWEY0ul/m8KldcbI4bZme6Oanr12L7iLTTWOp5DQec5xfmgVZ96e34Q5OneYEZ9AbWg5CFz2k4KNEcuvbRNa5BqDk2XJZM33TiSn PAfUv7yecfGX5DTbklvoWPWkogMSDjlWQvtauUl9vXF/DF Ojp2Tjr03QF4q6hqO U2YmK4ZKJlnumBSebANOznKZ9gCkPSQMP2N5eov4INLhpdXOIwuBwG7qK7h5UqZlfomEbaXfYKoZY5 5MUDw2CZd7eVoIYjkQeVu91Kf79RDJFpyq4Rp0ZfqHViXLz2Gc0NdxuNkii2qZTzhhdRz3v0WhxVYs2tiNpoqqZqDoUe0dhaDIQoALDlbffOhYWVDEwla6ofBmysjcGuEA2rtdGA4IuUbtKFhxzYLRf0hUagMvSqeYxheShUYu/r3LzwJiYxHBkIeIRZWappAmQEKyLR97/g4pgY1qfhLkCPmsr21AmStsU3adD 50qrydtJRnAyHhlCeaHAM4w8xay9dNMsmLDiqcTfiQBlHJZv5LksQfyypwz56dcYObnLLlSyjWJJc/UzoUMmqlRxfRzZH5LeefGr374ElV2mvZzlO5IdO/YxXuFwdrBFrw7SCsd1R81LtxoyHnYCIFU9WC/21 r84UuPQu7qoV5DusCgmA3Xs 4KPmg3EeW9O0PjIj2wqrGxaDWnrQBd8kDP8Q kETzRzwGCtslRkpXwm fQNuKF n2Oc0chFAqYcnie7UI/rso643BgJpS186yduIq/oMT8DuMqO3pqtNywixo8 h4J36MCf0stAaAUWbhmkd/XCHBdvtEQH/KkCiYAuIocbARUBr4n2pSPmB8b8UartHVeXYpj7Dymyv3PF5sD87QtSLWiDfrgmfE2uOlbtUehtjuDHx1QdDEpBTquJkCCbP1LWPBlMveh2nM30qi/7Fy2qwndit NxwQVjdbUVCIy3gOXKM5hksro4wEjQvLjG/jg18nniJJc/I1FGFoLNYc6oenRUOo1nYXMkEHNiChvA9F1eEXwhOpNIXX9Tt2pVtso/9PyKD3Ai/tiSvggmAvGyMaKwGBy0mjizIz0GsJhswFvW1WatsB02y4A8GatW6ZEkkOhe2Vnc8bmqtRQz4xt3OZy8olyCkMnGAyKoqcVfDUTNhZu7e0cBzoyWB7u5Kd7a0Xoi70NoE3bfuHECjcunjmQ9KJJc86Aa27KXlzdjnQlNirA8z4Z7ETqrxG4NbJlA6fu3AMfD7qsike0tuliUOri3C6nq0Iyb0XJ0AZ1vRYOBUgHFeQpaTzPIpp/1SIot N4iOJmOFQkHzqYefOSN0XW/3AWNUTtqTZ qiXlFBjJI3a5P77Lxp35pIoaluvzAPRARgGKXtoca9F7GT930Xz8ajeBFwwzgVCBOgeQTJuyH46jOqKzCaTknDWI9sz14wzqMjSNJK0bdNJS27xo9fIyB 1Onjg79dQAd/DQUdlgSm7D/pBnxhpTOS2WYTQNctEjRxoKz2tIeiTQvfPz5IwL1Asay/F32zY0vFHDODgxvm9MNFt16CL nfH/pOnKYuIK ZneY8Lj2N5TZ W1xYUtTv0pTWT2v/K4 GPWUpLzGbdrjsax6EYWdbNf2v xKodn0IYXMILstf5KOy ngxmpPW9AT6E zT4p0Htn9kx5vJ570eHsyMPkJLx  8bA4s034OJ1EPEBjVncJGlx6jOfGz0mfZgiy84EXnt/N QN6q01QyQP9uqGr7gZc44IfDcolJCrLgOO6LUvz8El2hhqMp8UqvwaGK0YfW4FAMl1WMbxfQ8AXa/ nE9Si7GXjH PNikumvNjpjLXCRLrHpEakTNF4hv3BqAuJ1NAYdkZizBENfLtUN32MURocUWmEzy8UxdLgAlp06sMzqOKn5CAxD1c0KB==",
# "bx-umidtoken":"T2gAYSwqE6jL9Py7lBChpMEko0EO1PZ97zyEiRay8ANAm8lmFPkS2_dBod51C82RwXM=",
}

url = "https://login.taobao.com/newlogin/login.do?appName=taobao&fromSite=0&_bx-v=2.0.31"

headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
}
resp = requests.post(url,data=data,headers=headers)
print(resp.json())