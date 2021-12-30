import sys,os,subprocess,time
from subprocess import Popen

def adb_start():
    obj = subprocess.Popen(['adb', 'shell'], shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE)
    obj.stdin.write('su\n'.encode('utf-8'))
    obj.stdin.write('./data/local/tmp/fs12820\n'.encode('utf-8'))
    obj.stdin.write('exit\n'.encode('utf-8'))  # 重点，一定要执行exit
    info, err = obj.communicate()

    return err.decode('gbk')



def adb_kill():
    Popen("adb kill-server",shell=True)
    Popen("adb start-server",shell=True)

def adb_forwardAndStart(adb_name=None,emu=False):

    Popen(r'python E:\work_space\douyin_sevice\adb_start.py {}'.format(adb_name), shell=True)
    time.sleep(20)
    subprocess.Popen('adb forward tcp:27042 tcp:27042',shell=True)


def adb_select_port(emu=True):
    obj = subprocess.Popen(['adb', 'shell'], shell=True, stdin=subprocess.PIPE,stdout=subprocess.PIPE ,
                           stderr=subprocess.PIPE)
    if not emu:
        obj.stdin.write('su\n'.encode('utf-8'))
        obj.stdin.write('netstat -apn | grep 27042\n'.encode('utf-8'))
    else:
        obj.stdin.write('ps | grep fs12820\n'.encode())
    obj.stdin.write('exit\n'.encode('utf-8'))

    info, err = obj.communicate()
    return info.decode()

def adb_start_app(start_str):
    print("启动app")
    obj = subprocess.Popen(['adb', 'shell'], shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE)
    obj.stdin.write('am start {}\n'.format(start_str).encode('utf-8'))
    # obj.stdin.write('./data/local/tmp/fs12820\n'.encode('utf-8'))
    obj.stdin.write('exit\n'.encode('utf-8'))
    info, err = obj.communicate()
    time.sleep(10)
    print("启动完成")
if __name__ == '__main__':
    # info = adb_select_port(emu=True)
    # "tcp        0      0 127.0.0.1:27042         0.0.0.0:*               LISTEN      \d+?/fs12820"
    # print(info)
    adb_forwardAndStart(adb_name="emulator-5556",emu=True)
    # s = "com.ss.android.ugc.aweme/com.ss.android.ugc.aweme.live.LiveBroadcastActivity"
    # start_info = adb_start_app(s)
    # print(start_info)
