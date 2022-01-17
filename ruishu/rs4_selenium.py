from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options


with open('selelnium_tz.js','r') as f:
    tz_js = f.read()


with open('rpc_.js','r') as rf:
    rpc_js = rf.read()
tz_js = tz_js+"\n" + rpc_js
# tz_js = tz_js
chrome_options = Options()
chrome_options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36')

web = Chrome(options=chrome_options)


# web.execute_script(rpc_js)
web.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
  "source": tz_js
})

print("rpc selenium 服务端 启动")
url = "http://www.fangdi.com.cn"
web.get(url)
print(f"80S->:{web.get_cookie('FSSBBIl1UgzbN7N80S')}")

a = input()

# print(web.page_source)
web.quit()