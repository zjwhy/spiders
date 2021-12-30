
"""

python  java 字节码相互转换
"""
def pb2jb(byte_arr):
    """
    python字节码转java字节码
    :param byte_arr:
    :return:
    """
    return [int(i) - 256 if int(i) > 127 else int(i) for i in byte_arr]


def jb2pb(byte_arr):
    """
    java 字节码转python字节码
    :return:
    """
    return [i + 256 if i < 0 else i for i in byte_arr]


def hex2jb(hex_str):
    """
    十六进制数据转java字节码
    eg:
        hex_str = "5f 3c f2 81 c8 0f 88 89 c7 b1 99 77 58 c5 4c 04"
    :return:
    """
    return [int(i, 16) - 256 if int(i, 16) > 127 else int(i, 16) for i in hex_str.split(" ")]


def hex2pb(hex_str):
    """
    十六进制数据转python字节码
    eg:
        hex_str = "5f 3c f2 81 c8 0f 88 89 c7 b1 99 77 58 c5 4c 04"
    :return:
    """
    return [int(i, 16) for i in hex_str.split(" ")]


def pb2str(byte_arr, encoding="utf-8"):
    """
    python字节码转str
    :return:
    """
    return bytes(byte_arr).decode(encoding)


def jb2str(byte_arr, encoding="utf-8"):
    """
    java字节码转str
    :return:
    """
    return bytes(jb2pb(byte_arr)).decode(encoding)


def hex2str(hex_str, encoding="utf-8"):
    """
    hex转str
    :param hex_str: "2c 22 70 61 79 63 68 65 63 6b 6d 6f 64 65 22 3a"
    :param encoding:
    :return:
    """
    return bytes(hex2pb(hex_str)).decode(encoding)


# a = "1bd6f8749e341f9563e84807bef9aeebA93706195783578D9C077E702D399388549de6e4deb754c4f85c316bee2c731b00000000000000000000000000000000"
# print(str(hex2pb(a)[0]).split())
if __name__ == '__main__':

    bytes_java = [-54,80,-86,-101,-25,37,83,-75,121,8,63,-113,-64,118,82,-126,-87,55,6,25,87,-125,87,-115,-100,7,126,112,45,57,-109,-120,84,-99,-26,-28,-34,-73,84,-60,-8,92,49,107,-18,44,115,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


    a = "040448d40000d17d50acc1ec410ad44f5e2cc70eed01240fdcda"
    import binascii
    c = [i for i in bytes.fromhex(a)]
    d = pb2jb(c)
    print(d)
    # print(bytearray(bytes.fromhex(a)))

    result = [4,4,72,84,0,0,58,-26,-10,-10,-50,-119,-28,-41,-55,47,53,124,-90,-115,-117,37,26,7,120,-84] #040450240000ca7860be7ff32e4ee06a92bd8f580859cabe67e0
    ja = [-124,-1,46,34,-107,57,-128,60,26,116,-121,-121,17,116,-69,-72, -87, 55, 6, 25, 87, -125, 87, -115, -100, 7, 126, 112, 45, 57, -109, -120, 84, -99, -26, -28, -34, -73, 84, -60, -8, 92, 49, 107, -18, 44, 115, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    p_b = jb2pb(ja)
    print(binascii.b2a_hex(bytearray(p_b)))
    # print(result)
    '84ff2e229539803c1a7487871174bbb8A93706195783578D9C077E702D399388549de6e4deb754c4f85c316bee2c731b00000000000000000000000000000000'
    '84ff2e229539803c1a7487871174bbb8a93706195783578d9c077e702d399388549de6e4deb754c4f85c316bee2c731b00000000000000000000000000000000'