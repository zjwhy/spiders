import frida,sys
# from subprocess import Popen
from douyin_sevice.adb_kf import *

reStartCount = 0
def message(message, data):
    if message['type'] == 'send':
        print(message['payload'])

    else:
        print(message)
def gorgon(stamp,sign,adb_name=None,emu=False):
    global reStartCount
    jsCode = """
    function hook_service(stamp,javaBytes){
        var result = null
        Java.perform(function(){
            var li = Java.use("com.ss.sys.ces.a");
            //var bytes = Java.use("java.lang.String").$new(jString).getBytes()
            result = JSON.stringify(li.leviathan(-1,stamp,javaBytes))
    
        })
        return result
    }
    rpc.exports = {
        hookDouyin:hook_service
    
    };
    
    """



    try:
        # process = frida.get_remote_device().attach("com.ss.android.ugc.aweme")
        process = frida.get_usb_device(10).attach("com.ss.android.ugc.aweme")

        script = process.create_script(jsCode)
        print("创建完成")
        script.on('message', message)
        rpc = script.exports

        script.load()
        result = rpc.hook_douyin(stamp,sign)

        return result
    except  frida.ServerNotRunningError:

        if reStartCount > 10:
            exit()
        reStartCount += 1
        Popen(r'python E:\work_space\douyin_sevice\adb_start.py {}'.format(adb_name), shell=True)
        Popen('adb forward tcp:27042 tcp:27042', shell=True)
        # adb_forwardAndStart()
        print("端口转发,重启服务")
        # # raise
        # print(e)
        return gorgon(stamp,sign,adb_name=adb_name,emu=emu)
    except frida.TransportError as e:
        if reStartCount > 10:
            exit()
        reStartCount += 1
        adb_kill()
        print("重启frida服务")
        Popen(r'python E:\work_space\douyin_sevice\adb_start.py {}'.format(adb_name), shell=True)
        # Popen('adb forward tcp:27042 tcp:27042', shell=True)
        return gorgon(stamp, sign,adb_name=adb_name,emu=emu)
    except frida.ProcessNotFoundError or frida.InvalidOperationError:
        info = adb_select_port(emu=emu)
        if emu:
            if './data/local/tmp/fs12820' not in info:
                print("启动服务")
                adb_kill()
                adb_forwardAndStart(adb_name="emulator-5556")
        else:
            if 'fs12820' not in info:
                print("启动服务")
                adb_kill()
                adb_forwardAndStart()
        if reStartCount > 10:
            exit()
        reStartCount += 1
        adb_start_app("com.ss.android.ugc.aweme/com.ss.android.ugc.aweme.main.MainActivity")
        time.sleep(10)
        return gorgon(stamp, sign, adb_name=adb_name, emu=emu)

if __name__ == '__main__':
    emu =True
    info = adb_select_port(emu=emu)
    if emu:
        if './data/local/tmp/fs12820' not in info:
            print("启动服务")
            adb_kill()
            adb_forwardAndStart(adb_name="emulator-5556")
    else:
        if 'fs12820' not in info:
            print("启动服务")
            adb_kill()
            adb_forwardAndStart()
    adb_start_app('com.ss.android.ugc.aweme/com.ss.android.ugc.aweme.main.MainActivity')
    a = gorgon(1590477886,[-124,-1,46,34,-107,57,-128,60,26,116,-121,-121,17,116,-69,-72,-87,55,6,25,87,-125,87,-115,-100,7,126,112,45,57,-109,-120,84,-99,-26,-28,-34,-73,84,-60,-8,92,49,107,-18,44,115,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],adb_name="emulator-5556")

    c = a.replace('[','').replace(']','').split(',')
    d = [int(i) for i in c]
    print(a)
    print(d,type(d[0]))
    # pass