import sys,os,subprocess
from subprocess import Popen

def adb_start(adb_name):
    # if emu =="True":
    #     obj =  subprocess.Popen(['adb', 'devices'], shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
    #                        stderr=subprocess.PIPE)
    obj = subprocess.Popen(['adb','-s',adb_name, 'shell'], shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE)
    # obj.stdin.write('su\n'.encode('utf-8'))
    obj.stdin.write('./data/local/tmp/fs12820\n'.encode('utf-8'))
    obj.stdin.write('exit\n'.encode('utf-8'))
    info, err = obj.communicate()

    print(err.decode())
    print(info.decode())

adb_name = sys.argv[1]
# print(adb_name)
adb_start(adb_name=adb_name)