
import jpype,os
"""
public class OooOo {
    public static int OooO00o(int i, int i2, int i3) {
        return ((i ^ -1) & i3) | (i2 & i);
    }

    public static int OooO0O0(int i, int i2, int i3, int i4, int i5, int i6) {
        return OooO0oo(i + OooO00o(i2, i3, i4) + i5, i6);
    }

    public static int OooO0OO(int i, int i2, int i3) {
        return (i & i3) | (i & i2) | (i2 & i3);
    }

    public static int OooO0Oo(int i, int i2, int i3, int i4, int i5, int i6) {
        return OooO0oo(i + OooO0OO(i2, i3, i4) + i5 + 1518500249, i6);
    }

    public static int OooO0o(int i, int i2, int i3, int i4, int i5, int i6) {
        return OooO0oo(i + OooO0o0(i2, i3, i4) + i5 + 1859775393, i6);
    }

    public static int OooO0o0(int i, int i2, int i3) {
        return (i ^ i2) ^ i3;
    }

    public static int OooO0oo(int i, int i2) {
        return (i >>> (32 - i2)) | (i << i2);
    }

    public String OooO(byte[] bArr) {
        ArrayList<Integer> OooO0oO2 = OooO0oO(bArr);
        int i = 1732584193;
        int i2 = -271733879;
        int i3 = -1732584194;
        int i4 = 271733878;
        for (int i5 = 0; i5 < OooO0oO2.size() / 64; i5++) {
            int[] iArr = new int[16];
            for (int i6 = 0; i6 < 16; i6++) {
                int i7 = (i5 * 64) + (i6 * 4);
                iArr[i6] = (OooO0oO2.get(i7 + 3).intValue() << 24) | OooO0oO2.get(i7).intValue() | (OooO0oO2.get(i7 + 1).intValue() << 8) | (OooO0oO2.get(i7 + 2).intValue() << 16);
            }
            int[] iArr2 = {0, 4, 8, 12};
            int i8 = i;
            int i9 = i2;
            int i10 = i3;
            int i11 = i4;
            int i12 = 0;
            while (i12 < 4) {
                int i13 = iArr2[i12];
                i8 = OooO0O0(i8, i9, i10, i11, iArr[i13], 3);
                int OooO0O02 = OooO0O0(i11, i8, i9, i10, iArr[i13 + 1], 7);
                i10 = OooO0O0(i10, OooO0O02, i8, i9, iArr[i13 + 2], 11);
                i9 = OooO0O0(i9, i10, OooO0O02, i8, iArr[i13 + 3], 19);
                i12++;
                i11 = OooO0O02;
            }
            int[] iArr3 = {0, 1, 2, 3};
            int i14 = i8;
            int i15 = i11;
            for (int i16 = 0; i16 < 4; i16++) {
                int i17 = iArr3[i16];
                i14 = OooO0Oo(i14, i9, i10, i15, iArr[i17], 3);
                i15 = OooO0Oo(i15, i14, i9, i10, iArr[i17 + 4], 5);
                i10 = OooO0Oo(i10, i15, i14, i9, iArr[i17 + 8], 9);
                i9 = OooO0Oo(i9, i10, i15, i14, iArr[i17 + 12], 13);
            }
            int[] iArr4 = {0, 2, 1, 3};
            int i18 = i14;
            int i19 = 0;
            while (i19 < 4) {
                int i20 = iArr4[i19];
                int OooO0o2 = OooO0o(i18, i9, i10, i15, iArr[i20], 3);
                i15 = OooO0o(i15, OooO0o2, i9, i10, iArr[i20 + 8], 9);
                i10 = OooO0o(i10, i15, OooO0o2, i9, iArr[i20 + 4], 11);
                i9 = OooO0o(i9, i10, i15, OooO0o2, iArr[i20 + 12], 15);
                i19++;
                i18 = OooO0o2;
            }
            i += i18;
            i2 += i9;
            i3 += i10;
            i4 += i15;
        }
        return String.format("%02x%02x%02x%02x", Integer.valueOf(i), Integer.valueOf(i2), Integer.valueOf(i3), Integer.valueOf(i4));
    }

    public final ArrayList<Integer> OooO0oO(byte[] bArr) {
        int length = bArr.length * 8;
        ArrayList<Integer> arrayList = new ArrayList<>();
        for (byte b : bArr) {
            arrayList.add(Integer.valueOf(b));
        }
        arrayList.add(128);
        while (((arrayList.size() * 8) + 64) % 512 != 0) {
            arrayList.add(0);
        }
        for (int i = 0; i < 8; i++) {
            arrayList.add(Integer.valueOf((int) ((((long) length) >>> (i * 8)) & 255)));
        }
        return arrayList;
    }
}




"""


class OooOo:
    def OooO00o(self,i, i2, i3):
        return ((i ^ -1) & i3) | (i2 & i)


    def OooO0O0(self, i, i2, i3, i4, i5, i6):
        #负负得正等问题
        left_s = int(bin((i + self.OooO00o(i2, i3, i4)) & 0xffffffff)[-31:],2)
        # return self.OooO0oo(i + self.OooO00o(i2, i3, i4) + i5, i6)
        return self.OooO0oo(left_s + i5, i6)


    def OooO0OO(self, i, i2, i3):
        return (i & i3) | (i & i2) | (i2 & i3)


    def OooO0Oo(self, i,  i2, i3, i4, i5, i6):
        return self.OooO0oo(i + self.OooO0OO(i2, i3, i4) + i5 + 1518500249, i6)


    def OooO0o(self, i, i2, i3, i4, i5, i6):
        return self.OooO0oo(i + self.OooO0o0(i2, i3, i4) + i5 + 1859775393, i6)


    def OooO0o0(self, i,  i2, i3):
        return (i ^ i2) ^ i3


    def OooO0oo(self, i, i2):

        #        return (i >>> (32 - i2)) | (i << i2);
        #无符号位移

        if i < 0 :
            new_i = self.fs_2(i)
            right_move = 32 - i2
            right_b = ''.join(["0" for i in range(right_move)])
            right_b   += new_i

            left_s = int(right_b[:32],2)

            right_s_bm = ''.join(["0" for i in range(i2)])

            new_i += right_s_bm

            right_s_2 = new_i[-32:]
            if right_s_2[0]=="1":
                right_s_j = -int(right_s_2,2)
            else:
                right_s_j = int(right_s_2,2)


            return left_s | right_s_j

        else:

            # right_s_2 = "{0:b}".format(i << i2).zfill(32)
            # print()
            #
            return (i >> (32 - i2)) | int("0"+"{0:b}".format((i << i2))[-31:],2)
    def fs_2(self,num):
        num_2 =  "{0:b}".format(num).zfill(32)
        new_num = ""
        for i in num_2[1:]:
            if i =="0":
                new_num += "1"

            else:
                new_num += "0"

        r_0_index = new_num.rfind('0')
        bm_num = len(new_num)-len(new_num[:r_0_index+1])
        bm = ''.join(["0" for i in range(bm_num)])
        return "1" + new_num[:r_0_index] + "1" + bm

    def b_2_fs(self,b_str):

        r_1_index = b_str.rfind('1')

        bm_num = len(b_str) - len(b_str[:r_1_index + 1])
        bm = ''.join(["1" for i in range(bm_num)])
        b_str =  b_str[:r_1_index] + "0" + bm

        new_num = ""
        for i in b_str[1:]:
            if i == "0":
                new_num += "1"

            else:
                new_num += "0"


        return  new_num

    def OooO(self,bArr):
        OooO0oO2 = self.OooO0oO(bArr)
        print(OooO0oO2,len(OooO0oO2))
        i = 1732584193
        i2 = -271733879
        i3 = -1732584194
        i4 = 271733878
        for  i5 in range(int(len(OooO0oO2) / 64)):
            iArr = list(bytearray(16))
            for  i6 in range( 16):
                i7 = (i5 * 64) + (i6 * 4)
                # print(i7)
                iArr[i6] = (OooO0oO2[i7 + 3] << 24) | OooO0oO2[i7] | (OooO0oO2[i7 + 1] << 8) | (OooO0oO2[i7 + 2] << 16)

            iArr2 = [0, 4, 8, 12]
            i8 = i
            i9 = i2
            i10 = i3
            i11 = i4
            i12 = 0
            while (i12 < 4):
                i13 = iArr2[i12]
                i8 = self.OooO0O0(i8, i9, i10, i11, iArr[i13], 3)
                OooO0O02 = self.OooO0O0(i11, i8, i9, i10, iArr[i13 + 1], 7)
                i10 = self.OooO0O0(i10, OooO0O02, i8, i9, iArr[i13 + 2], 11)
                i9 = self.OooO0O0(i9, i10, OooO0O02, i8, iArr[i13 + 3], 19)
                i12 += 1
                i11 = OooO0O02

            iArr3 = [0, 1, 2, 3]
            i14 = i8
            i15 = i11
            for i16 in range (4):
                i17 = iArr3[i16]
                i14 = self.OooO0Oo(i14, i9, i10, i15, iArr[i17], 3)
                i15 = self.OooO0Oo(i15, i14, i9, i10, iArr[i17 + 4], 5)
                i10 = self.OooO0Oo(i10, i15, i14, i9, iArr[i17 + 8], 9)
                i9 = self.OooO0Oo(i9, i10, i15, i14, iArr[i17 + 12], 13)

            iArr4 = [0, 2, 1, 3]
            i18 = i14
            i19 = 0
            while (i19 < 4):
                i20 = iArr4[i19]
                OooO0o2 = self.OooO0o(i18, i9, i10, i15, iArr[i20], 3)
                i15 = self.OooO0o(i15, OooO0o2, i9, i10, iArr[i20 + 8], 9)
                i10 = self.OooO0o(i10, i15, OooO0o2, i9, iArr[i20 + 4], 11)
                i9 = self.OooO0o(i9, i10, i15, OooO0o2, iArr[i20 + 12], 15)
                i19 += 1
                i18 = OooO0o2

            i += i18
            i2 += i9
            i3 += i10
            i4 += i15


        #String.format("%02x%02x%02x%02x", Integer.valueOf(i), Integer.valueOf(i2), Integer.valueOf(i3), Integer.valueOf(i4));
        return


    def OooO0oO(self, bArr):
        length = len(bArr) * 8
        arrayList = []
        for  b in  bArr:
            arrayList.append(b)

        arrayList.append(128)
        while (((len(arrayList) * 8) + 64) % 512 != 0):
            arrayList.append(0)

        for i in range(8):
            arrayList.append(int(length >> ((i * 8) & 255)))

        return arrayList

# 加载刚才打包的jar文件

# 获取jvm.dll 的文件路径
jvmPath = jpype.getDefaultJVMPath()

# 开启jvm
jpype.startJVM(jvmPath,"-ea", "-Djava.class.path=%s" % ('/Users/jinzeng/PycharmProjects/studyPro/yuanren/t.jar'))

# ②、加载java类（参数是java的长类名）
javaClass = jpype.JClass("yuan_26.OooOo")

# 实例化java对象
# javaInstance = javaClass()

# ③、调用java方法，由于我写的是静态方法，直接使用类名就可以调用方法
javaClass.OooO(list(bytearray("11111".encode())))

# ④、关闭jvm
jpype.shutdownJVM()

if __name__ == '__main__':
    pass
    # en = "page=111639464262304"
    # a = list(bytearray(en.encode()))
    # # print(a)
    #
    # test = OooOo()
    #
    # test.OooO(a)