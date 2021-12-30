var  g = function() {
    return ["i", "/", "x", "1", "X", "g", "U", "0", "z", "7", "k", "8", "N", "+", "l", "C", "p", "O", "n", "P", "r", "v", "6", "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\", "q", "u", "2", "G", "j", "9", "H", "R", "c", "w", "T", "Y", "Z", "4", "b", "f", "S", "J", "B", "h", "a", "W", "s", "t", "A", "e", "o", "M", "I", "E", "Q", "5", "m", "D", "d", "V", "F", "L", "K", "y"]
}
  , b = function() {
    return "3"
};


var m = function(e, t, i) {
    var n, r, o, a = g(), s = b(), l = [];
    if (1 == i)
        n = e[t],
        r = 0,
        o = 0,
        l.push(a[n >>> 2 & 63]),
        l.push(a[(n << 4 & 48) + (r >>> 4 & 15)]),
        l.push(s),
        l.push(s);
    else if (2 == i)
        n = e[t],
        r = e[t + 1],
        o = 0,
        l.push(a[n >>> 2 & 63]),
        l.push(a[(n << 4 & 48) + (r >>> 4 & 15)]),
        l.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
        l.push(s);
    else {
        if (3 != i)
            throw new Error("1010");
        n = e[t],
        r = e[t + 1],
        o = e[t + 2],
        l.push(a[n >>> 2 & 63]),
        l.push(a[(n << 4 & 48) + (r >>> 4 & 15)]),
        l.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
        l.push(a[63 & o])
    }
    return l.join("")
};

var _ = function(e) {
    if (null == e || void 0 == e)
        return null;
    if (0 == e.length)
        return "";
    var t = 3;
    try {
        for (var i = [], n = 0; n < e.length; ) {
            if (!(n + t <= e.length)) {
                i.push(m(e, n, e.length - n));
                break
            }
            i.push(m(e, n, t)),
            n += t
        }
        return i.join("")
    } catch (r) {
        throw new Error("1010")
    }
};



var p = function i(e, t) {
    function i(e, t) {
        return e.charCodeAt(Math.floor(t % e.length))
    }
    function n(e, t) {
        return t.split("").map(function(t, n) {
            return t.charCodeAt(0) ^ i(e, n)
        })
    }
    return t = n(e, t),
    _(t)
};



function my_hk_gj(token,dragX,clientY,startY){
    var u = token;
    var beginTime = new Date().getTime() + 2;
    var dragX = dragX < 0 ? 0 : dragX;
    var f = p(u, [Math.round(dragX), Math.round(clientY - startY),new Date().getTime() - beginTime] + "");
    console.log(f)
}


var my_b = function(e, t) {
    function i(e, t) {
        function i(e, t) {
            return e.charCodeAt(Math.floor(t % e.length))
        }
        function n(e, t) {
            return t.split("").map(function(t, n) {
                return t.charCodeAt(0) ^ i(e, n)
            })
        }
        return t = n(e, t),
        _(t)
    }
    __toByte = function(e) {
        function t(t) {
            return e.apply(this, arguments)
        }
        return t.toString = function() {
            return e.toString()
        }
        ,
        t
    }(function(e) {
        if (e < -128)
            return __toByte(128 - (-128 - e));
        if (e >= -128 && e <= 127)
            return e;
        if (e > 127)
            return __toByte(-129 + e - 127);
        throw new Error("1001")
    });
    var n = function(e, t) {
        return __toByte(e + t)
    }
      , r = function(e, t) {
        if (null == e)
            return null;
        if (null == t)
            return e;
        for (var i = [], r = t.length, o = 0, a = e.length; o < a; o++)
            i[o] = n(e[o], t[o % r]);
        return i
    }
      , o = function(e, t) {
        return e = __toByte(e),
        t = __toByte(t),
        __toByte(e ^ t)
    }
      , a = function(e, t) {
        if (null == e || null == t || e.length != t.length)
            return e;
        for (var i = [], n = e.length, r = 0, a = n; r < a; r++)
            i[r] = o(e[r], t[r]);
        return i
    }
      , s = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
      , l = function(e) {
        var t = [];
        return t.push(s[e >>> 4 & 15]),
        t.push(s[15 & e]),
        t.join("")
    }
      , u = function(e) {
        var t = e.length;
        if (null == e || t < 0)
            return new String("");
        for (var i = [], n = 0; n < t; n++)
            i.push(l(e[n]));
        return i.join("")
    }
      , f = function(e) {
        if (null == e || 0 == e.length)
            return [];
        for (var t = new String(e), i = [], n = t.length / 2, r = 0, o = 0; o < n; o++) {
            var a = parseInt(t.charAt(r++), 16) << 4
              , s = parseInt(t.charAt(r++), 16);
            i[o] = __toByte(a + s)
        }
        return i
    }
      , c = function(e) {
        if (null == e || void 0 == e)
            return e;
        for (var t = encodeURIComponent(e), i = [], n = t.length, r = 0; r < n; r++)
            if ("%" == t.charAt(r)) {
                if (!(r + 2 < n))
                    throw new Error("1009");
                i.push(f(t.charAt(++r) + "" + t.charAt(++r))[0])
            } else
                i.push(t.charCodeAt(r));
        return i
    }
      , j = function(e) {
        var t = [];
        return t[0] = e >>> 24 & 255,
        t[1] = e >>> 16 & 255,
        t[2] = e >>> 8 & 255,
        t[3] = 255 & e,
        t
    }
      , d = function(e) {
        var t = j(e);
        return u(t)
    }
      , h = function(e, t, i) {
        var n = [];
        if (null == e || 0 == e.length)
            return n;
        if (e.length < i)
            throw new Error("1003");
        for (var r = 0; r < i; r++)
            n[r] = e[t + r];
        return n
    }
      , p = function(e, t, i, n, r) {
        if (null == e || 0 == e.length)
            return i;
        if (null == i)
            throw new Error("1004");
        if (e.length < r)
            throw new Error("1003");
        for (var o = 0; o < r; o++)
            i[n + o] = e[t + o];
        return i
    }
      , y = function(e) {
        for (var t = [], i = 0; i < e; i++)
            t[i] = 0;
        return t
    }
      , v = function(e) {
        return null == e || void 0 == e || "" == e
    }
      , g = function() {
        return ["i", "/", "x", "1", "X", "g", "U", "0", "z", "7", "k", "8", "N", "+", "l", "C", "p", "O", "n", "P", "r", "v", "6", "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\", "q", "u", "2", "G", "j", "9", "H", "R", "c", "w", "T", "Y", "Z", "4", "b", "f", "S", "J", "B", "h", "a", "W", "s", "t", "A", "e", "o", "M", "I", "E", "Q", "5", "m", "D", "d", "V", "F", "L", "K", "y"]
    }
      , b = function() {
        return "3"
    }
      , m = function(e, t, i) {
        var n, r, o, a = g(), s = b(), l = [];
        if (1 == i)
            n = e[t],
            r = 0,
            o = 0,
            l.push(a[n >>> 2 & 63]),
            l.push(a[(n << 4 & 48) + (r >>> 4 & 15)]),
            l.push(s),
            l.push(s);
        else if (2 == i)
            n = e[t],
            r = e[t + 1],
            o = 0,
            l.push(a[n >>> 2 & 63]),
            l.push(a[(n << 4 & 48) + (r >>> 4 & 15)]),
            l.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
            l.push(s);
        else {
            if (3 != i)
                throw new Error("1010");
            n = e[t],
            r = e[t + 1],
            o = e[t + 2],
            l.push(a[n >>> 2 & 63]),
            l.push(a[(n << 4 & 48) + (r >>> 4 & 15)]),
            l.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
            l.push(a[63 & o])
        }
        return l.join("")
    }
      , _ = function(e) {
        if (null == e || void 0 == e)
            return null;
        if (0 == e.length)
            return "";
        var t = 3;
        try {
            for (var i = [], n = 0; n < e.length; ) {
                if (!(n + t <= e.length)) {
                    i.push(m(e, n, e.length - n));
                    break
                }
                i.push(m(e, n, t)),
                n += t
            }
            return i.join("")
        } catch (r) {
            throw new Error("1010")
        }
    }
      , w = function(e) {
        return _(c(e))
    }
      , T = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]
      , S = function(e) {
        var t = 4294967295;
        if (null != e)
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                t = t >>> 8 ^ T[255 & (t ^ n)]
            }
        return d(4294967295 ^ t, 8)
    }
      , k = function(e) {
        return S(null == e ? [] : c(e))
    }
      , E = [120, 85, -95, -84, 122, 38, -16, -53, -11, 16, 55, 3, 125, -29, 32, -128, -94, 77, 15, 106, -88, -100, -34, 88, 78, 105, -104, -90, -70, 90, -119, -28, -19, -47, -111, 117, -105, -62, -35, 2, -14, -32, 114, 23, -21, 25, -7, -92, 96, -103, 126, 112, -113, -65, -109, -44, 47, 48, 86, 75, 62, -26, 72, -56, -27, 66, -42, 63, 14, 92, 59, -101, 19, -33, 12, -18, -126, -50, -67, 42, 7, -60, -81, -93, -86, 40, -69, -37, 98, -63, -59, 108, 46, -45, 93, 102, 65, -79, 73, -23, -46, 37, -114, -15, 44, -54, 99, -10, 60, -96, 76, 26, 61, -107, 18, -116, -55, -40, 57, -76, -82, 45, 0, -112, -77, 29, 43, -30, 109, -91, -83, 107, 101, 81, -52, -71, 84, 36, -41, 68, 39, -75, -122, -6, 11, -80, -17, -74, -73, 35, 49, -49, -127, 80, 103, 79, -25, 52, -43, 56, 41, -61, -24, 17, -118, 115, -38, 8, -78, 33, -85, -106, 58, -98, -108, 94, 116, -125, -51, -9, 71, 82, 87, -115, 9, 69, -123, 123, -117, 113, -22, -124, -87, 64, 13, 21, -89, -2, -99, -97, 1, -4, 34, 20, 83, 119, 30, -12, -110, -66, 118, -48, 6, -36, 104, -58, -102, 97, 5, -20, 31, -72, 70, -39, 67, -68, -57, 110, 89, 51, 10, -120, 28, 111, 127, 22, -3, 54, 53, -1, 100, 74, 50, 91, 27, -31, -5, -64, 124, -121, 24, -13, 95, 121, -8, 4]
      , C = 4
      , R = 4
      , O = 4
      , $ = 4
      , I = function(e) {
        var t = [];
        if (null == e || void 0 == e || 0 == e.length)
            return y(R);
        if (e.length >= R)
            return h(e, 0, R);
        for (var i = 0; i < R; i++)
            t[i] = e[i % e.length];
        return t
    }
      , X = function(e) {
        if (null == e || void 0 == e || 0 == e.length)
            return y(C);
        var t = e.length
          , i = 0;
        i = t % C <= C - O ? C - t % C - O : 2 * C - t % C - O;
        var n = [];
        p(e, 0, n, 0, t);
        for (var r = 0; r < i; r++)
            n[t + r] = 0;
        var o = j(t);
        return p(o, 0, n, t + i, O),
        n
    }
      , x = function(e) {
        if (null == e || e.length % C != 0)
            throw new Error("1005");
        for (var t = [], i = 0, n = e.length / C, r = 0; r < n; r++) {
            t[r] = [];
            for (var o = 0; o < C; o++)
                t[r][o] = e[i++]
        }
        return t
    }
      , A = function(e) {
        var t = e >>> 4 & 15
          , i = 15 & e
          , n = 16 * t + i;
        return E[n]
    }
      , P = function(e) {
        if (null == e)
            return null;
        for (var t = [], i = 0, n = e.length; i < n; i++)
            t[i] = A(e[i]);
        return t
    }
      , N = function() {
        for (var e = [], t = 0; t < $; t++) {
            var i = 256 * Math.random();
            i = Math.floor(i),
            e[t] = __toByte(i)
        }
        return e
    }
      , M = function(e, t) {
        if (null == e)
            return null;
        for (var i = __toByte(t), n = [], r = e.length, a = 0; a < r; a++)
            n.push(o(e[a], i));
        return n
    }
      , D = function(e, t) {
        if (null == e)
            return null;
        for (var i = __toByte(t), r = [], o = e.length, a = 0; a < o; a++)
            r.push(n(e[a], i));
        return r
    }
      , M = function(e, t) {
        if (null == e)
            return null;
        for (var i = __toByte(t), n = [], r = e.length, a = 0; a < r; a++)
            n.push(o(e[a], i));
        return n
    }
      , V = function(e) {
        var t = M(e, 56)
          , i = D(t, -40)
          , n = M(i, 103);
        return n
    }
      , L = function(e, t) {
        null == e && (e = []);
        var i = N();
        t = I(t),
        t = a(t, I(i)),
        t = I(t);
        var n = t
          , o = X(e)
          , s = x(o)
          , l = [];
        p(i, 0, l, 0, $);
        for (var u = s.length, f = 0; f < u; f++) {
            var c = V(s[f])
              , j = a(c, t)
              , d = r(j, n);
            j = a(d, n);
            var h = P(j);
            h = P(h),
            p(h, 0, l, f * C + $, C),
            n = h
        }
        return l
    }
      , B = function(e) {
        var t = "14731382d816714fC59E47De5dA0C871D3F";
        if (null == t || void 0 == t)
            throw new Error("1008");
        null != e && void 0 != e || (e = "");
        var i = e + k(e)
          , n = c(i)
          , r = c(t)
          , o = L(n, r);
        return _(o)
    };
    var t={};
    t.eypt = B,
    t.xor_encode = i,
    t.toByte = __toByte,
    t.str2Bytes = c,
    t.arrayCopy = h,
    t.arrayCopy2 = p,
    t.createEmptyArray = y,
    t.isEmptyString = v,
    t.base64Encode = w,
    t.getStringCRC32 = k,
    t.toByte = __toByte;
    return t
}();


function my_hk_gj(token,gj_str){
    //gj_str = [dragX, fd,time_] + ""
    var f = p(token, gj_str);
    return f
}

function my_hk_encrypt_da(data_str){

    return my_b.eypt(data_str)
}

function my_n(e) {
    var t = {
        "\\": "-",
        "/": "_",
        "+": "."
    };
    return e.replace(/[\\/+]/g, function(e) {
        return t[e]
    })
}


function get_validate(data_str){
    
    return "CN31_"+my_n(my_hk_encrypt_da(data_str))
}

var i = "//Z1nirg1p33:iirRv/cixiz3:iiqRv/cixAp3:iiNRv/ci1pi3:iiIRv/ci1pz3:ipqRv/ci1Aj3:ipiRv/ci1ci3:ipzRv/ciiir3:ipARv/ciiii3:/cpRv/c/xip3:/cjRv/c/xiA3:/ciRv/c/xci3:/cNRv/c/1pq3:/czRv/c/1iI3:/cIRv/c/1Az3:/cARv/c/ipq3:/ArRv/c/iiq3:/ApRv/cUxpz3:/ApRv/cUxiN3:/AjRv/cUxcr3:/AqRv/cU1pp3:/AXRv/cU1iz3:/AXRv/cU1Aq3:/AXRv/cU1cI3:/AiRv/cUipA3:/AiRv/c01pj3:/AiRv/c01cX3:/AzRv/c0iir3:/AzRv/c0iiA3:/ipRv/cXxii3:/ijRv/cXxAq3:/iiRv/cX1pr3:/iNRv/cX1pN3:/izRv/cX1Aj3:/iIRv/cX1cq3:/iIRv/cXiir3:/iARv/cXiiX3:/iARnprH1crl:/iARnprH1cj/:/prRnprH1cXg:/ppRnprH1ci0:/pqRnprH1cNi:/pXRnprH1cz1:/piRnprH1cAU:/pNRnprH1cAl:/pzRnpqHippx:/pIRnpqHipjX:/pIRnpqHipX0:/pARnpqHipXx:/pARnpqHipiC";
var i = "reS7UcF3:r/SzUcep:vOSzUc/j:rcqv/wOvx4r3:rcjv//Ov1gz3:rczv//OvigZ3:rcmv/wO6x4N3:rpqv/wO61gp3:rpzv//O61vc3:rpiv/eO6ivc3:rpmv/eO\\xEq3:rirv//O\\1vr3:riNv/wO\\igc3:rimv/eOpxEc3:vAqv/eOp14c3:vApv/wOOxgq3:vAiv//OOxvc3:vAFv//OO1vj3:vcjv/eOnxgX3:vcNv//OnxgZ3:vciv//On1gX3:vcmv//Onivc3:vpjv//OPxvZ3:vpNv/eOPxEj3:vpiv/wOP1EN3:vijv/wOjxgq3:virv/eOj1gN3:viiv/eOj1vj3:viFv//Ojivj3:6Apv/eO91gi3:6Arv/wO91Ei3:6Aiv/wO9igZ3:6cqv/wOvxgi7:6czv//Ovxgp0:6czv/eOvxgc0:6cXv//OvxvNi:rcq8Uc4zxviX/A33:rcqkUcJzxvNi/p33:rcqNUc4zxvN//i33:rcq/Uc4zxvNXip33:rcjkUc4zxvN0ic33:rcjNUc4zxvziic33:rcjCUcwzxvzX1A33:rcjiUc4zxvz01c33:rcp8Ucwzxvr//A33:rcpCUcJzxvrx1A33:rcp/Uc4zxvrUii33:rcr7Ucwzxvp//A33:rcrNUcwzxvp1/A33:rcrlUc4zxvpUiA33"

// console.log(my_hk_encrypt_da(my_hk_gj("c6968d8a072847378e23926a9d242650","62.727272727272734")).length)

// console.log(my_hk_encrypt_da(my_hk_gj("c6968d8a072847378e23926a9d242650","1,89")).length)
// console.log(i)

// var result_i = my_hk_encrypt_da(i);

// console.log(result_i.length)
// console.log(result_i)
// console.log(JSON.stringify({d:result_i}))

var b = "98NQJR+rxgShLQr+G0eq5zMYwY2x6VsosnKx4W/EyL267d+zy5MQQUrPTMhjUdI38vpKQ0dHXXEYSRdRvfiKkQbS62CAwZFHej0V7Ll1j6nzsMAaZKCovV2P8bDTXNTtefB4LrQGoTzOn2uVNj4ibuiwsfPkBRPSsvgeN3GPLlg=::" +"hg8Cj6YhwBIEkaMsiKS2LgU\\7M6\Dl95d5o1ub0PRjwvQXaWKOAh8eAr0t74f3xA\jlqr1jb96Lfb19gtGw6s8S0urQEZG2LMwrp4rsmw+KQzYv/hG0ZuO+sEel3NKNe\AdeaK+pxjS\OG2XzGKC3WyzHrjNGEeHjtsp4qvQs3DgCgJ:1628843983650"

console.log(get_validate(b))