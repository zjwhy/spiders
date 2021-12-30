const jsdom = require("jsdom");
const { Store, Cookie,CookieJar } = require("tough-cookie");



const {JSDOM} = jsdom;

const cookie_jar = new CookieJar();

const cookie = new Cookie({key:"UR3ZMlLdcLIE80T",value:"42tt6.GKb_N1NpPfy87tstc.q8sRW9yAWXFJMBz6U4MocUUOB20unQFWu3CqGoxEIFVJMv9WEvZQ9kQMGVxc1WbYCtVxopFn3pbGAmp9.Dmu21FRC6sUF2YgreW2jv5BOE7Lm3_DBqUQNnP8Lm70kky4x5kxjOT5ndaHW9QdCSFjTUo5LxGnsP1acGZVUQ7L96IqSyLgfJv22SE7s36DWjMJYyGF1YY_dfufKcQ8JXTZDMIEAbfT7PBpPom_hgDkJUGu4eZuSwM04d4v.tctrd9l.dzKym4wwcugfxum4Fg0kV4MJcWPlmxzAOCk4.PHkL6esIzNHTWak.1ibPInmvaC_"});

cookie_jar.setCookie(cookie,"http://cpquery.cnipa.gov.cn/")


// const cookie_jar = new jsdom.CookieJar(store)

const dom = new JSDOM(`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>中国及多国专利审查信息查询</title>
        
        <meta content="{qq~FUYg5Hu3xofA5lD3CDcZ.kslYH20ZrG7fDuWnoC3qhqqYkqLNcmAoiS2milA6mC3roka8hf7bFVJXhSfJokRzhD3Ii1QFsPdWRML.eDBsMw0gSCM5HhqgdOH7lMlSgkd.WeZU5CMXtzmLZuvZF_76esHDhJAB.D6tWtZ0ZPIylz3XnrOKFX2beA51r5ZS4uvol8a3vsn1mHgQnrIFmWpzbbM4DZ7YnrvvrJWRCrtEDwldCcsYcWqVer.MQe9ZOD_hRESuTc_lHNE.NrFVFHVHvpX7Q_VZZD4dRHfuLc4alElyep_9Rtq_baj8R.f.BOcQm4g7Nf82RiWiBnuLmt7yObPsmF2bqqqqqqr1QtyZwjrnpoyG89SbKDN0w9rPIoNg3qqVtQA3Zf.elIEMdfBaoIaR{mMkUAPnNvtVwBv_9oBApMsA;NK1tRVMH63AKZV_alvIddq;90w2CnIxgwCDYPiqg.C7Vq;qqr0c80qql3650Dca7379qqq{IlQqO5Psnt_TOjv1jRFp2.6_NQIL.d1vas.zy.U5yIjJSd1B2E8zd7C8_w.Y2XbHgR.xu76PzAMeOjoPBRMfdj9t.INxafvAqqr0l1738qql4096qqqhEsFjRhHLTVHk8gEqqk162HrWVTZsIuJBECdkAq!x7z,aac,amr,asm,avi,bak,bat,bmp,bin,c,cab,css,csv,com,cpp,dat,dll,doc,dot,docx,exe,eot,fla,flc,fon,fot,font,gdb,gif,gz,gho,hlp,hpp,htc,ico,ini,inf,ins,iso,js,jar,jpg,jpeg,json,java,lib,log,mid,mp4,mpa,m4a,mp3,mpg,mkv,mod,mov,mim,mpp,msi,mpeg,obj,ocx,ogg,olb,ole,otf,py,pyc,pas,pgm,ppm,pps,ppt,pdf,pptx,png,pic,pli,psd,qif,qtx,ra,rm,ram,rmvb,reg,res,rtf,rar,so,sbl,sfx,swa,swf,svg,sys,tar,taz,tif,tiff,torrent,txt,ttf,vsd,vss,vsw,vxd,woff,woff2,wmv,wma,wav,wps,xbm,xpm,xls,xlsx,xsl,xml,z,zip,apk,plist,ipat1074790464loOgSqqhoykAqLedR6_KNM9GdvxsBpH2p2KPzMMAHqqqJ1638842909496lx7QxqqqqqqYW4eCC6G.RYlp8uYCtnxKCqqq">
        <!--[if lt IE 9]><script r='m'>document.createElement("section")</script><![endif]-->
        <script type="text/javascript" charset="iso-8859-1" src="/a5IVAaJpIo06/cRveKV56RYFi.ca73791.js" r='m'></script>
        <script type="text/javascript" r="m">
            (function() {
                var _$PL = 0
                  , _$jB = [[2, 0, 5, 3, 7, 1, 4, 6], [82, 97, 85, 16, 71, 59, 84, 94, 84, 62, 67, 11, 84, 70, 7, 3, 25, 44, 89, 68, 86, 57, 87, 26, 52, 84, 24, 12, 98, 55, 0, 39, 22, 74, 63, 73, 28, 22, 61, 45, 18, 50, 49, 22, 100, 5, 88, 95, 20, 22, 47, 43, 31, 15, 21, 10, 29, 13, 22, 64, 96, 22, 65, 9, 95, 92, 69, 99, 1, 76, 36, 84, 4, 77, 80, 76, 53, 79, 84, 58, 76, 84, 66, 95, 37, 17, 78, 60, 51, 84, 35, 72, 19, 83, 46, 75, 33, 54, 8, 48, 23, 27, 38, 56, 42, 6, 30, 91, 2, 81, 32, 14, 34, 93, 90, 40, 41, 84], [31, 2, 0, 33, 10, 21, 5, 32, 6, 14, 30, 7, 29, 6, 19, 12, 11, 12, 22, 28, 23, 20, 18, 24, 13, 17, 13, 9, 25, 9, 13, 15, 13, 1, 8, 13, 27, 13, 16, 4, 3, 26, 6], [42, 0, 11, 18, 28, 35, 48, 44, 24, 34, 27, 40, 6, 37, 43, 22, 21, 31, 8, 25, 32, 47, 23, 41, 43, 39, 24, 38, 3, 30, 5, 16, 35, 20, 45, 13, 9, 20, 10, 7, 19, 7, 2, 33, 43, 7, 15, 33, 8, 36, 29, 1, 46, 17, 12, 19, 33, 15, 36, 2, 14, 4, 26, 28], [31, 19, 18, 23, 1, 9, 34, 17, 34, 8, 5, 19, 30, 33, 11, 2, 19, 35, 0, 2, 32, 20, 16, 12, 4, 13, 28, 24, 32, 10, 3, 14, 29, 22, 4, 6, 24, 26, 10, 19, 25, 27, 21, 15, 8, 7, 19]];
                function _$4y(_$3b, _$Qw) {
                    return _$0o.Math.abs(_$3b) % _$Qw;
                }
                function _$lb(_$y1) {
                    _$y1[_$4y(_$ij(), 16)] = _$y1[_$4y(_$EF() + _$94(), 16)];
                    _$aZ(_$y1);
                    var _$Oz = _$$7();
                    if (_$DO() - _$y1[_$4y(_$Bg(), 16)]) {
                        var _$Oz = _$N8() + _$Jo();
                    }
                    var _$Oz = _$DO();
                    if (_$EF() - _$y1[_$4y(_$d4(), 16)]) {
                        if (_$DO() + _$NP()) {
                            _$y1[_$4y(_$Mu(), 16)] = _$EF();
                        }
                    }
                    _$y1[_$4y(_$y1[_$4y(_$EF() + _$94(), 16)], 16)] = _$X7(_$y1);
                    return _$a6(_$y1);
                }
                function _$ij() {
                    return 1
                }
                function _$EF() {
                    return 13
                }
                function _$94() {
                    return 3
                }
                function _$aZ(_$y1) {
                    if (_$DO()) {
                        _$y1[_$4y(_$Bg(), 16)] = _$dz();
                    }
                    var _$Zt = _$N8();
                    if (_$y1[_$4y(_$d4(), 16)]) {
                        _$Ln(_$y1);
                    }
                    _$y1[_$4y(_$yw(_$y1), 16)] = _$y1[_$4y(_$K8(), 16)];
                    _$vr(_$y1);
                    var _$Zt = _$$7();
                    var _$s$ = _$N8() + _$Jo();
                    return _$Fg(_$y1);
                }
                function _$DO() {
                    return 5
                }
                function _$Bg() {
                    return 8
                }
                function _$dz() {
                    return 6
                }
                function _$SN(_$y1) {
                    _$y1[_$4y(_$94(), 16)] = _$N8();
                    _$y1[15] = _$DO();
                    _$y1[_$4y(_$Bg(), 16)] = _$dz();
                    return _$K8();
                }
                function _$N8() {
                    return 9
                }
                function _$K8() {
                    return 4
                }
                function _$d4() {
                    return 0
                }
                function _$Ln(_$y1) {
                    _$y1[_$4y(_$DO(), 16)] = _$NP();
                    _$y1[1] = _$Mu();
                    var _$s$ = _$d4();
                    var _$Zt = _$a0();
                    return _$6f();
                }
                function _$NP() {
                    return 11
                }
                function _$Mu() {
                    return 7
                }
                function _$a0() {
                    return 14
                }
                function _$6f() {
                    return 12
                }
                function _$Jo() {
                    return 15
                }
                function _$yw(_$y1) {
                    var _$s$ = _$Mu();
                    var _$Zt = _$EF();
                    _$y1[_$4y(_$d4(), 16)] = _$a0();
                    _$y1[_$4y(_$DO(), 16)] = _$NP();
                    return _$ij();
                }
                function _$vr(_$y1) {
                    var _$s$ = _$Jo();
                    var _$Oz = _$DO();
                    _$y1[11] = _$ij();
                    _$8O(_$y1);
                    _$y1[_$4y(_$a0(), 16)] = _$6f();
                    return _$3E(_$y1);
                }
                function _$8O(_$y1) {
                    _$y1[13] = _$94();
                    _$y1[_$4y(_$a0(), 16)] = _$6f();
                    _$y1[10] = _$Bg();
                    _$y1[_$4y(_$Mu(), 16)] = _$EF();
                    return _$94();
                }
                function _$3E(_$y1) {
                    var _$Oz = _$Mu();
                    var _$Zt = _$EF();
                    _$y1[_$4y(_$d4(), 16)] = _$a0();
                    _$y1[_$4y(_$DO(), 16)] = _$NP();
                    return _$ij();
                }
                function _$$7() {
                    return 2
                }
                function _$Fg(_$y1) {
                    _$y1[8] = _$dz();
                    if (_$EF()) {
                        _$y1[3] = _$N8();
                    }
                    _$y1[_$4y(_$Bg(), 16)] = _$dz();
                    _$5m(_$y1);
                    return _$N8();
                }
                function _$5m(_$y1) {
                    _$y1[_$4y(_$94(), 16)] = _$N8();
                    _$y1[_$4y(_$6f(), 16)] = _$UP();
                    var _$Oz = _$Mu();
                    var _$Zt = _$EF();
                    return _$94();
                }
                function _$UP() {
                    return 10
                }
                function _$AI(_$y1) {
                    _$y1[4] = _$$7();
                    _$y1[0] = _$a0();
                    _$y1[_$4y(_$DO(), 16)] = _$NP();
                    return _$ij();
                }
                function _$MA(_$y1) {
                    _$y1[0] = _$a0();
                    _$y1[_$4y(_$DO(), 16)] = _$NP();
                    var _$Oz = _$K8();
                    var _$Zt = _$$7();
                    return _$d4();
                }
                function _$X7(_$y1) {
                    if (_$DO()) {
                        _$y1[_$4y(_$Bg(), 16)] = _$dz();
                    }
                    _$y1[_$4y(_$N8(), 16)] = _$Jo();
                    if (_$UP()) {
                        _$y1[_$4y(_$ij(), 16)] = _$Mu();
                    }
                    if (_$a0()) {
                        _$y1[12] = _$UP();
                    }
                    _$y1[_$4y(_$$7(), 16)] = _$d4();
                    return _$Xe(_$y1);
                }
                function _$Xe(_$y1) {
                    _$y1[12] = _$UP();
                    var _$Oz = _$Mu();
                    var _$Oz = _$EF();
                    _$y1[_$4y(_$d4(), 16)] = _$a0();
                    return _$6f();
                }
                function _$a6(_$y1) {
                    var _$Oz = _$Mu();
                    var _$Oz = _$EF();
                    _$y1[_$4y(_$N8() + _$Jo(), 16)] = _$vb(_$y1);
                    _$y1[6] = _$EF() + _$94();
                    var _$Oz = _$EF();
                    if (_$y1[_$4y(_$6f(), 16)]) {
                        _$y1[10] = _$Bg();
                    }
                    if (_$hg(_$y1)) {
                        _$y1[15] = _$DO();
                    }
                    return _$y1[_$4y(_$EF() + _$94(), 16)];
                }
                function _$vb(_$y1) {
                    var _$Oz = _$Mu();
                    var _$Zt = _$EF();
                    _$y1[_$4y(_$d4(), 16)] = _$a0();
                    _$y1[12] = _$UP();
                    return _$Bg();
                }
                function _$hg(_$y1) {
                    _$y1[12] = _$UP();
                    _$y1[8] = _$dz();
                    _$y1[_$4y(_$EF(), 16)] = _$94();
                    return _$N8();
                }
                var _$Ra, _$XP, _$0o, _$m_, _$mk, _$lb, _$PA;
                var _$mZ, _$JM, _$Jj = _$PL, _$1m = _$jB[0];
                while (1) {
                    _$JM = _$1m[_$Jj++];
                    if (_$JM < 4) {
                        if (_$JM < 1) {
                            _$0o = window,
                            _$PA = String,
                            _$m_ = Array;
                        } else if (_$JM < 2) {
                            _$mk = _$0o['$_ts'] = {};
                        } else if (_$JM < 3) {
                            _$Ra = [4, 16, 64, 256, 1024, 4096, 16384, 65536];
                        } else {
                            _$mZ = !_$mk;
                        }
                    } else {
                        if (_$JM < 5) {
                            _$sQ(0);
                        } else if (_$JM < 6) {
                            _$mk = _$0o['$_ts'];
                        } else if (_$JM < 7) {
                            return;
                        } else {
                            if (!_$mZ)
                                _$Jj += 1;
                        }
                    }
                }
                function _$sQ(_$s$, _$3b) {
                    function _$0b() {
                        var _$PA = _$An.charCodeAt(_$pY++), _$4y;
                        if (_$PA < 128) {
                            return _$PA;
                        } else if (_$PA < 251) {
                            return _$PA - 32;
                        } else if (_$PA === 251) {
                            return 0;
                        } else if (_$PA === 254) {
                            _$PA = _$An.charCodeAt(_$pY++);
                            if (_$PA >= 128)
                                _$PA -= 32;
                            _$4y = _$An.charCodeAt(_$pY++);
                            if (_$4y >= 128)
                                _$4y -= 32;
                            return _$PA * 219 + _$4y;
                        } else if (_$PA === 255) {
                            _$PA = _$An.charCodeAt(_$pY++);
                            if (_$PA >= 128)
                                _$PA -= 32;
                            _$4y = _$An.charCodeAt(_$pY++);
                            if (_$4y >= 128)
                                _$4y -= 32;
                            _$PA = _$PA * 219 * 219 + _$4y * 219;
                            _$4y = _$An.charCodeAt(_$pY++);
                            if (_$4y >= 128)
                                _$4y -= 32;
                            return _$PA + _$4y;
                        } else if (_$PA === 252) {
                            _$4y = _$An.charCodeAt(_$pY++);
                            if (_$4y >= 128)
                                _$4y -= 32;
                            return -_$4y;
                        } else if (_$PA === 253) {
                            _$PA = _$An.charCodeAt(_$pY++);
                            if (_$PA >= 128)
                                _$PA -= 32;
                            _$4y = _$An.charCodeAt(_$pY++);
                            if (_$4y >= 128)
                                _$4y -= 32;
                            return _$PA * -219 - _$4y;
                        } else {}
                    }
                    var _$pY, _$An, _$aG, _$Cf, _$PA, _$4y, _$PL, _$Jj, _$mZ, _$9N, _$JM, _$1m, _$y1, _$5O, _$fC, _$Zt, _$Oz, _$6W, _$Ku, _$$g;
                    var _$EF, _$aZ, _$ij = _$s$, _$DO = _$jB[1];
                    while (1) {
                        _$aZ = _$DO[_$ij++];
                        if (_$aZ < 64) {
                            if (_$aZ < 16) {
                                if (_$aZ < 4) {
                                    if (_$aZ < 1) {
                                        var _$PA = _$sQ(7);
                                    } else if (_$aZ < 2) {
                                        _$ij += -63;
                                    } else if (_$aZ < 3) {
                                        _$3b._$9N = "D4_PCttkEohCPX4_HPfxbq";
                                    } else {
                                        _$PA += "1my1$gfCZtOzs$ijEF94aZDOBgdzSNN8K8d4LnNPMua06fJoywvr8O3E$7Fg5mUPAIMAX7Xea6vbhgtgEC9cvFTs2YHZn0fk_tvPfb";
                                    }
                                } else if (_$aZ < 8) {
                                    if (_$aZ < 5) {
                                        var _$PA = _$0o.eval.toString();
                                    } else if (_$aZ < 6) {
                                        var _$1m = _$0b();
                                    } else if (_$aZ < 7) {
                                        _$3b._$3b = "S.akjpuK3J1vIp9jqp9d6G";
                                    } else {
                                        _$PA += "RaXP0om_mklb3bQw0bAnaGCfpYKu5O6WDvBs3T_P9hHH0K$fpBMp0XtVzxVvHwgahuJBbs73Yb2NjBN6sQrKmGt4PA4yPLJjmZ9NJM";
                                    }
                                } else if (_$aZ < 12) {
                                    if (_$aZ < 9) {
                                        _$3b._$pa = "_$SN";
                                    } else if (_$aZ < 10) {
                                        _$ij += -60;
                                    } else if (_$aZ < 11) {
                                        _$y1.push(")();");
                                    } else {
                                        return _$Jj;
                                    }
                                } else {
                                    if (_$aZ < 13) {
                                        var _$An = _$mk["ca73791"];
                                    } else if (_$aZ < 14) {
                                        _$mk._$PA -= _$sQ(7);
                                    } else if (_$aZ < 15) {
                                        _$3b._$C1 = "_$2Z";
                                    } else {
                                        for (_$fC = 0; _$fC < _$$g; _$fC++) {
                                            _$rK(14, _$fC, _$y1);
                                        }
                                    }
                                }
                            } else if (_$aZ < 32) {
                                if (_$aZ < 20) {
                                    if (_$aZ < 17) {
                                        _$ij += 60;
                                    } else if (_$aZ < 18) {
                                        _$ij += 2;
                                    } else if (_$aZ < 19) {
                                        var _$Ku = _$0b();
                                    } else {
                                        _$3b._$JB = 4;
                                    }
                                } else if (_$aZ < 24) {
                                    if (_$aZ < 21) {
                                        _$6W = _$An.substr(_$pY, _$1m).split(String.fromCharCode(255));
                                    } else if (_$aZ < 22) {
                                        for (_$fC = 0; _$fC < _$$g; _$fC++) {
                                            _$y1.push("}");
                                        }
                                    } else if (_$aZ < 23) {} else {
                                        _$3b._$nF = "_$Ln";
                                    }
                                } else if (_$aZ < 28) {
                                    if (_$aZ < 25) {
                                        _$mk._$PA = new Date().getTime();
                                    } else if (_$aZ < 26) {
                                        _$PA += "APwtJO1ZwVDRqugRs9YFLR14uRRgnmfVKUaqEaAu2pbGfl5HEqEovOfUET64nD_4oUDfVn_rTPpaBoWkaWnFxnc37EKmCH9LMYaAE4";
                                    } else if (_$aZ < 27) {
                                        _$PA += "UNuADs9IWGFeQoqtwE2hi5zBKIWoiufZFdrtMN1nFhp7OemNRxurw4hsvsr3vUJ9fR5cM52_c47x7Gka0hQV1yhN6k96To2o$dmnHBbi";
                                    } else {
                                        _$3b._$ij = "_$d4";
                                    }
                                } else {
                                    if (_$aZ < 29) {
                                        var _$pY = 0;
                                    } else if (_$aZ < 30) {
                                        var _$Zt = _$y1.join('');
                                    } else if (_$aZ < 31) {
                                        _$3b._$8V = "";
                                    } else {
                                        var _$$g = _$0b();
                                    }
                                }
                            } else if (_$aZ < 48) {
                                if (_$aZ < 36) {
                                    if (_$aZ < 33) {
                                        _$3b._$JM = "_$9L";
                                    } else if (_$aZ < 34) {
                                        _$3b._$aW = "_$Bg";
                                    } else if (_$aZ < 35) {
                                        _$3b._$1m = "_$6A";
                                    } else {
                                        _$3b._$hu = 41;
                                    }
                                } else if (_$aZ < 40) {
                                    if (_$aZ < 37) {
                                        _$mk._$_L = 1;
                                    } else if (_$aZ < 38) {
                                        ret = _$0o.execScript(_$3b);
                                    } else if (_$aZ < 39) {
                                        _$3b._$s$ = "_$mZ";
                                    } else {
                                        var _$4y = _$sQ(7);
                                    }
                                } else if (_$aZ < 44) {
                                    if (_$aZ < 41) {
                                        _$3b._$K5 = "_$mD";
                                    } else if (_$aZ < 42) {
                                        _$3b._$y1 = "_$nq";
                                    } else if (_$aZ < 43) {
                                        _$3b._$bs = "8ExYo31umca";
                                    } else {
                                        var _$y1 = [];
                                    }
                                } else {
                                    if (_$aZ < 45) {
                                        _$PA += "U$BWknnqfK9BH9zW2X1O6ARBK1KYpS8V9Go408igIsX$BVo5YYnf5CNCual6D67Yxa5X9qDIgL4ng2yxIWY6potdxVnh0$be3QC3Zp";
                                    } else if (_$aZ < 46) {
                                        var _$9N = _$0b();
                                    } else if (_$aZ < 47) {
                                        _$3b._$Vn = "_$aZ";
                                    } else {
                                        _$pY += _$1m;
                                    }
                                }
                            } else {
                                if (_$aZ < 52) {
                                    if (_$aZ < 49) {
                                        _$3b._$Bo = "_$N8";
                                    } else if (_$aZ < 50) {
                                        var _$JM = _$0b();
                                    } else if (_$aZ < 51) {
                                        var _$5O = _$0b();
                                    } else {
                                        return ret;
                                    }
                                } else if (_$aZ < 56) {
                                    if (_$aZ < 53) {
                                        return _$sQ(9, _$PA);
                                    } else if (_$aZ < 54) {
                                        return 1;
                                    } else if (_$aZ < 55) {
                                        _$3b._$TP = "_$dz";
                                    } else {
                                        var _$aG = _$mk._$o4;
                                    }
                                } else if (_$aZ < 60) {
                                    if (_$aZ < 57) {
                                        _$3b._$mk = "irHDpMifMaA";
                                    } else if (_$aZ < 58) {
                                        _$PA += "6Un4dAUYrhyIyk69MBbSa$g6MeKKo3IgoRW$8wzqBAWU7n2B8sU4fNbVf0UAhbrZroRfH3Ef1CJI3G$xz63eKL_znEqsL8fBin85ED";
                                    } else if (_$aZ < 59) {
                                        _$EF = _$3b === undefined || _$3b === "";
                                    } else {
                                        _$ij += 63;
                                    }
                                } else {
                                    if (_$aZ < 61) {
                                        ret = _$PA.call(_$0o, _$3b);
                                    } else if (_$aZ < 62) {
                                        var _$mZ = _$0b();
                                    } else if (_$aZ < 63) {
                                        var _$PA, _$4y, _$PL = _$3b.length, _$Jj = new _$m_(_$PL / 2), _$mZ = '_$';
                                    } else {
                                        var _$PL = _$sQ(72);
                                    }
                                }
                            }
                        } else {
                            if (_$aZ < 80) {
                                if (_$aZ < 68) {
                                    if (_$aZ < 65) {
                                        _$4y = _$sQ(7);
                                    } else if (_$aZ < 66) {
                                        var _$Oz = _$sQ(7);
                                    } else if (_$aZ < 67) {
                                        _$EF = _$0o.execScript;
                                    } else {
                                        for (_$PA = 0,
                                        _$4y = 0; _$4y < _$PL; _$4y += 2) {
                                            _$Jj[_$PA++] = _$mZ + _$3b.substr(_$4y, 2);
                                        }
                                    }
                                } else if (_$aZ < 72) {
                                    if (_$aZ < 69) {
                                        _$PA += "AXIGp6edCwy2hV3iYM9YPvmXeGEpEU924vqkM$g4r$KFnov3k6DiUrb$Nunzu3kjrIwqy5CMEghAg9EHgTBTl5ss3NPsmBIQuKMjH6";
                                    } else if (_$aZ < 70) {
                                        _$ij += 1;
                                    } else if (_$aZ < 71) {
                                        var _$PA = '';
                                    } else {
                                        _$EF = _$Oz - _$PA > 12000;
                                    }
                                } else if (_$aZ < 76) {
                                    if (_$aZ < 73) {
                                        _$3b._$0o = 107;
                                    } else if (_$aZ < 74) {
                                        var _$Jj = _$An.length;
                                    } else if (_$aZ < 75) {
                                        var _$Cf = _$mk.aebi = [];
                                    } else {
                                        _$3b._$_r = "_$DO";
                                    }
                                } else {
                                    if (_$aZ < 77) {
                                        if (!_$EF)
                                            _$ij += 1;
                                    } else if (_$aZ < 78) {
                                        var reg = new RegExp("\\r||\\n||\\s" , "" )
                                        _$PA = _$PA.replace(reg, "");
                                      
                                    } else if (_$aZ < 79) {
                                        _$PA = _$0o.eval;
                                    } else {
                                        return 0;
                                    }
                                }
                            } else if (_$aZ < 96) {
                                if (_$aZ < 84) {
                                    if (_$aZ < 81) {
                                        _$EF = _$PA !== "functioneval(){[nativecode]}";
                                    } else if (_$aZ < 82) {
                                        _$3b._$XW = "_$RD";
                                    } else if (_$aZ < 83) {
                                        _$mk._$o4 = _$sQ(13);
                                    } else {
                                        _$3b._$Wk = "_$K8";
                                    }
                                } else if (_$aZ < 88) {
                                    if (_$aZ < 85) {
                                        return;
                                    } else if (_$aZ < 86) {
                                        _$EF = _$mk["ca73791"];
                                    } else if (_$aZ < 87) {
                                        _$PA += "0jP6daLHNbkcDmu1vDqrj8T4LTQnPOOUyF4rLiFY3cz3gBCWEBKs5prL29FtlUGO3nXDYciw7bnQgFzU7VlWhmeA0zJLW4jr1RAipU";
                                    } else {
                                        _$PA += "EQrTHJf2lQxGtaMlJ4UIyElDRsh_uS8U6e4Gfa7e7Lg_FIUDFqhoSZ9FnXNOTT8pjK4Cr_VKx3KBsxp8f8vk5L255TwlGivZc6tFSU";
                                    }
                                } else if (_$aZ < 92) {
                                    if (_$aZ < 89) {
                                        _$EF = _$$g > 0;
                                    } else if (_$aZ < 90) {
                                        _$PA += "1ofr_LXWC1uDK5Z5KJ3pvp44OZsgTcsajXeeSBf4nsximdqBMI$MdOGLEG$57qOO0BPwz4NyXSe64PdV3s7mgn68E_xBS_bmJQV39_";
                                    } else if (_$aZ < 91) {
                                        _$3b._$Jj = "_$fK";
                                    } else {
                                        _$3b._$m_ = _$lb;
                                    }
                                } else {
                                    if (_$aZ < 93) {
                                        _$sQ(26);
                                    } else if (_$aZ < 94) {
                                        _$3b._$uD = "_$hL";
                                    } else if (_$aZ < 95) {
                                        return new Date().getTime();
                                    } else {
                                        if (!_$EF)
                                            _$ij += 2;
                                    }
                                }
                            } else {
                                if (_$aZ < 100) {
                                    if (_$aZ < 97) {
                                        _$sQ(79, _$Zt);
                                    } else if (_$aZ < 98) {
                                        _$sQ(90, _$mk);
                                    } else if (_$aZ < 99) {
                                        _$mk["ca73791"] = _$XP;
                                    } else {
                                        _$rK(0);
                                    }
                                } else {
                                    _$$g = _$0b();
                                }
                            }
                        }
                    }
                    function _$rK(_$Jj, _$Dv, _$Bs) {
                        function _$3T() {
                            var _$JM = [0];
                            Array.prototype.push.apply(_$JM, arguments);
                            return _$mG.apply(this, _$JM);
                        }
                        var _$PA, _$4y, _$PL, _$_P, _$9h, _$HH, _$0K, _$$f, _$pB, _$Mp, _$0X, _$tV, _$zx, _$Vv, _$Hw, _$ga;
                        var _$9N, _$1m, _$mZ = _$Jj, _$y1 = _$jB[2];
                        while (1) {
                            _$1m = _$y1[_$mZ++];
                            if (_$1m < 16) {
                                if (_$1m < 4) {
                                    if (_$1m < 1) {
                                        _$9N = _$4y;
                                    } else if (_$1m < 2) {
                                        var _$PA = _$rK(9);
                                    } else if (_$1m < 3) {
                                        var _$4y = _$PA > 1 ? document.scripts[_$PA - 2].src : _$XP;
                                    } else {
                                        for (_$PL = 0; _$PL < _$4y; _$PL++) {
                                            _$ga[_$PL] = _$rK(9);
                                        }
                                    }
                                } else if (_$1m < 8) {
                                    if (_$1m < 5) {
                                        var _$ga = [];
                                    } else if (_$1m < 6) {
                                        _$_P.onreadystatechange = _$3T;
                                    } else if (_$1m < 7) {
                                        return;
                                    } else {
                                        for (_$PL = 0; _$PL < _$PA; _$PL++) {
                                            _$4y[_$PL] = _$0b();
                                        }
                                    }
                                } else if (_$1m < 12) {
                                    if (_$1m < 9) {
                                        _$Cf[_$Dv] = _$PA;
                                    } else if (_$1m < 10) {
                                        _$mZ += -12;
                                    } else if (_$1m < 11) {
                                        _$_P = _$0o.ActiveXObject ? new _$0o.ActiveXObject('Microsoft.XMLHTTP') : new _$0o.XMLHttpRequest();
                                    } else {
                                        var _$zx = _$rK(9);
                                    }
                                } else {
                                    if (_$1m < 13) {
                                        _$mZ += 12;
                                    } else if (_$1m < 14) {} else if (_$1m < 15) {
                                        var _$PA = _$0b();
                                    } else {
                                        var _$Vv = _$rK(9);
                                    }
                                }
                            } else if (_$1m < 32) {
                                if (_$1m < 20) {
                                    if (_$1m < 17) {
                                        var _$4y = _$0b();
                                    } else if (_$1m < 18) {
                                        var _$tV = _$rK(9);
                                    } else if (_$1m < 19) {
                                        var _$Mp = _$0b();
                                    } else {
                                        var _$_P = _$0b();
                                    }
                                } else if (_$1m < 24) {
                                    if (_$1m < 21) {
                                        var _$pB = _$0b();
                                    } else if (_$1m < 22) {
                                        _$_P.open('GET', _$4y, false);
                                    } else if (_$1m < 23) {
                                        var _$HH = _$0b();
                                    } else {
                                        var _$$f = _$0b();
                                    }
                                } else if (_$1m < 28) {
                                    if (_$1m < 25) {
                                        var _$0X = _$0b();
                                    } else if (_$1m < 26) {
                                        var _$9h = _$0b();
                                    } else if (_$1m < 27) {
                                        _$mG(2, _$Bs);
                                    } else {
                                        var _$Hw = _$rK(9);
                                    }
                                } else {
                                    if (_$1m < 29) {
                                        var _$0K = _$0b();
                                    } else if (_$1m < 30) {
                                        return _$4y;
                                    } else if (_$1m < 31) {
                                        var _$4y = new Array(_$PA);
                                    } else {
                                        var _$PA = document.scripts.length;
                                    }
                                }
                            } else {
                                if (_$1m < 33) {
                                    _$_P.send();
                                } else {
                                    if (!_$9N)
                                        _$mZ += 4;
                                }
                            }
                        }
                        function _$mG(_$4y, _$hu) {
                            var _$JB, _$PA;
                            var _$Jj, _$9N, _$PL = _$4y, _$JM = _$jB[3];
                            while (1) {
                                _$9N = _$JM[_$PL++];
                                if (_$9N < 16) {
                                    if (_$9N < 4) {
                                        if (_$9N < 1) {
                                            _$PL += 3;
                                        } else if (_$9N < 2) {
                                            _$hu.push("];");
                                        } else if (_$9N < 3) {
                                            _$hu.push(_$aG[_$_P]);
                                        } else {
                                            _$hu.push("){");
                                        }
                                    } else if (_$9N < 8) {
                                        if (_$9N < 5) {
                                            _$t4(7, 0, _$ga.length);
                                        } else if (_$9N < 6) {
                                            _$t4(40);
                                        } else if (_$9N < 7) {
                                            if (!_$Jj)
                                                _$PL += 8;
                                        } else {
                                            _$hu.push(",");
                                        }
                                    } else if (_$9N < 12) {
                                        if (_$9N < 9) {
                                            _$hu.push(_$aG[_$5O]);
                                        } else if (_$9N < 10) {
                                            _$hu.push(";");
                                        } else if (_$9N < 11) {
                                            _$hu.push(_$aG[_$HH]);
                                        } else {
                                            var _$PA, _$JB = 4;
                                        }
                                    } else {
                                        if (_$9N < 13) {
                                            _$hu.push("while(1){");
                                        } else if (_$9N < 14) {
                                            for (_$PA = 1; _$PA < _$zx.length; _$PA++) {
                                                _$hu.push(",");
                                                _$hu.push(_$aG[_$zx[_$PA]]);
                                            }
                                        } else if (_$9N < 15) {
                                            _$hu.push("++];");
                                        } else {
                                            _$hu.push(_$aG[_$0X]);
                                        }
                                    }
                                } else if (_$9N < 32) {
                                    if (_$9N < 20) {
                                        if (_$9N < 17) {
                                            _$Jj = _$zx.length;
                                        } else if (_$9N < 18) {
                                            if (!_$Jj)
                                                _$PL += 9;
                                        } else if (_$9N < 19) {
                                            _$PL += 7;
                                        } else {
                                            _$hu.push(_$aG[_$Mp]);
                                        }
                                    } else if (_$9N < 24) {
                                        if (_$9N < 21) {
                                            _$hu.push("var ");
                                        } else if (_$9N < 22) {
                                            _$hu.push(_$aG[_$Ku]);
                                        } else if (_$9N < 23) {
                                            _$hu.push("=0,");
                                        } else {
                                            _$hu.push(_$aG[_$$f]);
                                        }
                                    } else if (_$9N < 28) {
                                        if (_$9N < 25) {
                                            if (!_$Jj)
                                                _$PL += 1;
                                        } else if (_$9N < 26) {
                                            _$hu.push("=$_ts.aebi;");
                                        } else if (_$9N < 27) {
                                            _$hu.push("}");
                                        } else {
                                            _$PL += -7;
                                        }
                                    } else {
                                        if (_$9N < 29) {
                                            return;
                                        } else if (_$9N < 30) {
                                            _$hu.push(_$Dv);
                                        } else if (_$9N < 31) {
                                            for (_$PA = 0; _$PA < _$Vv.length; _$PA += 2) {
                                                _$t4(0, _$Vv[_$PA], _$Vv[_$PA + 1], _$hu);
                                            }
                                        } else {
                                            _$hu.push("=$_ts.scj,");
                                        }
                                    }
                                } else if (_$9N < 48) {
                                    if (_$9N < 36) {
                                        if (_$9N < 33) {
                                            _$PL += 8;
                                        } else if (_$9N < 34) {
                                            _$hu.push("=");
                                        } else if (_$9N < 35) {
                                            _$sQ(26);
                                        } else {
                                            if (!_$Jj)
                                                _$PL += 4;
                                        }
                                    } else if (_$9N < 40) {
                                        if (_$9N < 37) {
                                            _$hu.push("[");
                                        } else if (_$9N < 38) {
                                            _$hu.push("(function(){var ");
                                        } else if (_$9N < 39) {
                                            for (_$PA = 0; _$PA < _$tV.length; _$PA++) {
                                                _$hu.push(",");
                                                _$hu.push(_$aG[_$tV[_$PA]]);
                                            }
                                        } else {
                                            _$Jj = _$tV.length;
                                        }
                                    } else if (_$9N < 44) {
                                        if (_$9N < 41) {
                                            _$Jj = _$Dv == 0;
                                        } else if (_$9N < 42) {
                                            _$hu.push("(");
                                        } else if (_$9N < 43) {
                                            _$Jj = _$_P.readyState == 4;
                                        } else {
                                            _$hu.push(_$aG[_$9h]);
                                        }
                                    } else {
                                        if (_$9N < 45) {
                                            _$Jj = _$mk["ca73791"];
                                        } else if (_$9N < 46) {
                                            _$hu.push(_$aG[_$zx[0]]);
                                        } else if (_$9N < 47) {
                                            _$Jj = _$ga.length;
                                        } else {
                                            _$hu.push("function ");
                                        }
                                    }
                                } else {
                                    _$sQ(79, _$_P.responseText);
                                }
                            }
                            function _$t4(_$mZ, _$bs, _$73, _$Yb) {
                                var _$PA, _$4y, _$PL, _$Jj;
                                var _$JM, _$y1, _$9N = _$mZ, _$$g = _$jB[4];
                                while (1) {
                                    _$y1 = _$$g[_$9N++];
                                    if (_$y1 < 16) {
                                        if (_$y1 < 4) {
                                            if (_$y1 < 1) {
                                                _$JM = _$Jj == 1;
                                            } else if (_$y1 < 2) {
                                                _$4y -= _$4y % 2;
                                            } else if (_$y1 < 3) {
                                                if (!_$JM)
                                                    _$9N += 2;
                                            } else {
                                                _$9N += 8;
                                            }
                                        } else if (_$y1 < 8) {
                                            if (_$y1 < 5) {
                                                _$4y = "if(";
                                            } else if (_$y1 < 6) {
                                                _$hu.push(_$6W[_$PA[_$4y]]);
                                            } else if (_$y1 < 7) {
                                                for (; _$bs + _$PL < _$73; _$bs += _$PL) {
                                                    _$hu.push(_$4y);
                                                    _$hu.push(_$aG[_$Mp]);
                                                    _$hu.push('<');
                                                    _$hu.push(_$bs + _$PL);
                                                    _$hu.push("){");
                                                    _$t4(7, _$bs, _$bs + _$PL);
                                                    _$4y = "}else if(";
                                                }
                                            } else {
                                                _$hu.push(_$6W[_$Hw[_$PA]]);
                                            }
                                        } else if (_$y1 < 12) {
                                            if (_$y1 < 9) {
                                                if (!_$JM)
                                                    _$9N += 1;
                                            } else if (_$y1 < 10) {
                                                for (k = 0; k < _$4y; k += 2) {
                                                    _$hu.push(_$6W[_$PA[k]]);
                                                    _$hu.push(_$aG[_$PA[k + 1]]);
                                                }
                                            } else if (_$y1 < 11) {
                                                _$hu.push("}");
                                            } else {
                                                _$JM = _$Jj == 0;
                                            }
                                        } else {
                                            if (_$y1 < 13) {
                                                if (!_$JM)
                                                    _$9N += 7;
                                            } else if (_$y1 < 14) {
                                                _$73--;
                                            } else if (_$y1 < 15) {
                                                _$PL = 0;
                                            } else {
                                                _$JM = _$Hw.length != _$PA;
                                            }
                                        }
                                    } else if (_$y1 < 32) {
                                        if (_$y1 < 20) {
                                            if (_$y1 < 17) {
                                                _$JM = _$Jj <= _$JB;
                                            } else if (_$y1 < 18) {
                                                var _$PA, _$4y, _$PL, _$Jj = _$73 - _$bs;
                                            } else if (_$y1 < 19) {
                                                var _$PA = _$ga[_$bs];
                                            } else {
                                                return;
                                            }
                                        } else if (_$y1 < 24) {
                                            if (_$y1 < 21) {
                                                _$9N += 17;
                                            } else if (_$y1 < 22) {
                                                for (_$4y = 0; _$4y < _$PA; _$4y += 2) {
                                                    _$hu.push(_$6W[_$Hw[_$4y]]);
                                                    _$hu.push(_$aG[_$Hw[_$4y + 1]]);
                                                }
                                            } else if (_$y1 < 23) {} else {
                                                var _$4y = _$PA.length;
                                            }
                                        } else if (_$y1 < 28) {
                                            if (_$y1 < 25) {
                                                _$hu.push("}else{");
                                            } else if (_$y1 < 26) {
                                                var _$PA = _$Hw.length;
                                            } else if (_$y1 < 27) {
                                                _$t4(7, _$bs, _$73);
                                            } else {
                                                _$PA -= _$PA % 2;
                                            }
                                        } else {
                                            if (_$y1 < 29) {
                                                for (; _$bs < _$73; _$bs++) {
                                                    _$hu.push(_$4y);
                                                    _$hu.push(_$aG[_$Mp]);
                                                    _$hu.push('<');
                                                    _$hu.push(_$bs + 1);
                                                    _$hu.push("){");
                                                    _$t4(2, _$bs);
                                                    _$4y = "}else if(";
                                                }
                                            } else if (_$y1 < 30) {
                                                for (_$PA = 1; _$PA < 7; _$PA++) {
                                                    if (_$Jj <= _$Ra[_$PA]) {
                                                        _$PL = _$Ra[_$PA - 1];
                                                        break;
                                                    }
                                                }
                                            } else if (_$y1 < 31) {
                                                _$JM = _$PA.length != _$4y;
                                            } else {
                                                _$Yb.push(["function ", _$aG[_$bs], "(){var ", _$aG[_$0K], "=[", _$73, "];Array.prototype.push.apply(", _$aG[_$0K], ",arguments);return ", _$aG[_$pB], ".apply(this,", _$aG[_$0K], ");}"].join(''));
                                            }
                                        }
                                    } else {
                                        if (_$y1 < 33) {
                                            _$t4(2, _$bs);
                                        } else if (_$y1 < 34) {
                                            _$9N += -5;
                                        } else if (_$y1 < 35) {
                                            _$9N += 5;
                                        } else {
                                            _$9N += 21;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            )()
        </script>
        <script>
            var ctx = "http://cpquery.cnipa.gov.cn:80";
        </script>
       
    </body>
</html>
`, {
    url: "http://cpquery.cnipa.gov.cn/",
    referrer: "http://cpquery.cnipa.gov.cn/",
    contentType: "text/html",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36    ",
    includeNodeLocations: true,
    runScripts:"dangerously",
    // cookieJar:cookie_jar,
    localStorage:{"FSSBB3": "455242:p_CO06yF.r5tAW9CymWvta",
    "$_fh0": "zxF1H75Ks6Ud9Mlp2tFYghVUuLl",
    "FSSBB2": "455242:kLYrbg8y2kozJ74gEmL3fq",
    "FSSBB92": "455242:1",
    "$_fb": "c1KhypgMIPthOd7gXW0qKFHS3kqG1N5ElJRD9GYk9VHMuhgiEI0oF_E9gyAzwACe",
    "$_YWTU": "Vip3DK1N5FaaoSbqxEUpOR5HZc2hK7Psvg9vfu41v.V",
    "$_f1": "nNG1IYTVqrddmdOxx37uxqH12lA",
    "$_f0": "jIzjoGqiMeK78qzJoL9fSzIf2fZ",
    "FSSBB17": "455242:3RFF7HOLzT_OwJgbrjvkAa",
    "__#classType": "localStorage",
    "friends_with_mate": "true",
    "$_nd": "35982",
    "FSSBB42": "455242:2",
    "FSSBB18": "455242:CU8x3zaMyGH4PtKXylPqbq",
    "$_cDro": "33",
    "$_ck": "NM9GdvxsBpH2p2KPzMMAHq",
    "FSSBB43": "455242:2"},
    sessionStorage : {
        $_YWTU: "Vip3DK1N5FaaoSbqxEUpOR5HZc2hK7Psvg9vfu41v.V",
        $_cDro: "33"},
    resources:"usable"
  })

// dom.window.close()
console.log(dom.window.document.cookie)

dom.window.close()

// JSDOM.fromURL("http://cpquery.cnipa.gov.cn/",
// {
//     userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
//     includeNodeLocations: true,
//     runScripts:"dangerously",
//     resources:"usable"
// }).then(dom => {
//   console.log(dom.serialize());

//   dom.window.close()
// });