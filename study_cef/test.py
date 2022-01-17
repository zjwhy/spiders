from cefpython3 import cefpython as cef
import sys


sys.excepthook = cef.ExceptHook


cef.Initialize()

cef.CreateBrowser(url="http://www.fangdi.com.cn")

cef.MessageLoop()

cef.Shutdown()

