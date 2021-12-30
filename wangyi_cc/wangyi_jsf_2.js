var I$ = function() {
    var e = {}
      , t = function() {
        return !1
    }
      , i = {};
    var n = function(t, i) {
        return e.toString.call(t) === "[object " + i + "]"
    };
    return function(e, s) {
        var a = i[e]
          , r = n(s, "Function");
        if (null != s && !r)
            a = s;
        if (r && (null == a || a.__dt__ === !0)) {
            var o = [];
            for (var c = 2, _ = arguments.length; c < _; c++)
                o.push(arguments.callee(arguments[c]));
            var d = {};
            o.push.call(o, d, {}, t, []);
            var l = s.apply(null, o) || d;
            if (!a || !n(l, "Object"))
                a = l;
            else if (Object.keys)
                for (var u = Object.keys(l), c = 0, _ = u.length, f; c < _; c++) {
                    f = u[c];
                    a[f] = l[f]
                }
            else
                for (var f in l)
                    a[f] = l[f];
            if (null != a && a.__dt__ === !0)
                delete a.__dt__
        }
        if (null == a)
            a = {
                __dt__: !0
            };
        i[e] = a;
        return a
    }
}();





var my_t = I$("58c544ea4fe5292e5520436314a60716", function(e, t, i, n, s) {
    var a = 8;
    var r = function(e, t) {
        return e << t | e >>> 32 - t
    };
    var o = function(e, t) {
        var i = (65535 & e) + (65535 & t)
          , n = (e >> 16) + (t >> 16) + (i >> 16);
        return n << 16 | 65535 & i
    };
    var c = function(e, t, i, n) {
        if (e < 20)
            return t & i | ~t & n;
        if (e < 40)
            return t ^ i ^ n;
        if (e < 60)
            return t & i | t & n | i & n;
        else
            return t ^ i ^ n
    };
    var _ = function(e) {
        if (e < 20)
            return 1518500249;
        if (e < 40)
            return 1859775393;
        if (e < 60)
            return -1894007588;
        else
            return -899497514
    };
    var d = function() {
        var e = function(e) {
            return e % 32
        }
          , t = function(e) {
            return 32 - a - e % 32
        };
        return function(i, n) {
            var s = []
              , r = (1 << a) - 1
              , o = n ? e : t;
            for (var c = 0, _ = i.length * a; c < _; c += a)
                s[c >> 5] |= (i.charCodeAt(c / a) & r) << o(c);
            return s
        }
    }();
    var l = function() {
        var e = "0123456789abcdef"
          , t = function(e) {
            return e % 4
        }
          , i = function(e) {
            return 3 - e % 4
        };
        return function(n, s) {
            var a = []
              , r = s ? t : i;
            for (var o = 0, c = 4 * n.length; o < c; o++)
                a.push(e.charAt(n[o >> 2] >> 8 * r(o) + 4 & 15) + e.charAt(n[o >> 2] >> 8 * r(o) & 15));
            return a.join("")
        }
    }();
    var u = function() {
        var e = function(e) {
            return e % 32
        }
          , t = function(e) {
            return 32 - a - e % 32
        };
        return function(i, n) {
            var s = []
              , r = (1 << a) - 1
              , o = n ? e : t;
            for (var c = 0, _ = 32 * i.length; c < _; c += a)
                s.push(String.fromCharCode(i[c >> 5] >>> o(c) & r));
            return s.join("")
        }
    }();
    var f = function() {
        var e = "="
          , t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , i = function(e) {
            return e % 4
        }
          , n = function(e) {
            return 3 - e % 4
        };
        return function(s, a) {
            var r = []
              , o = a ? i : n;
            for (var c = 0, _; c < 4 * s.length; c += 3) {
                _ = (s[c >> 2] >> 8 * o(c) & 255) << 16 | (s[c + 1 >> 2] >> 8 * o(c + 1) & 255) << 8 | s[c + 2 >> 2] >> 8 * o(c + 2) & 255;
                for (var d = 0; d < 4; d++)
                    r.push(8 * c + 6 * d > 32 * s.length ? e : t.charAt(_ >> 6 * (3 - d) & 63))
            }
            return r.join("")
        }
    }();
    var h = function(e, t, i, n, s, a) {
        return o(r(o(o(t, e), o(n, a)), s), i)
    };
    var p = function(e, t, i, n, s, a, r) {
        return h(t & i | ~t & n, e, t, s, a, r)
    };
    var m = function(e, t, i, n, s, a, r) {
        return h(t & n | i & ~n, e, t, s, a, r)
    };
    var g = function(e, t, i, n, s, a, r) {
        return h(t ^ i ^ n, e, t, s, a, r)
    };
    var b = function(e, t, i, n, s, a, r) {
        return h(i ^ (t | ~n), e, t, s, a, r)
    };
    var v = function(e, t) {
        e[t >> 5] |= 128 << t % 32;
        e[(t + 64 >>> 9 << 4) + 14] = t;
        var i = 1732584193
          , n = -271733879
          , s = -1732584194
          , a = 271733878;
        for (var r = 0, c = e.length, _, d, l, u; r < c; r += 16) {
            _ = i;
            d = n;
            l = s;
            u = a;
            i = p(i, n, s, a, e[r + 0], 7, -680876936);
            a = p(a, i, n, s, e[r + 1], 12, -389564586);
            s = p(s, a, i, n, e[r + 2], 17, 606105819);
            n = p(n, s, a, i, e[r + 3], 22, -1044525330);
            i = p(i, n, s, a, e[r + 4], 7, -176418897);
            a = p(a, i, n, s, e[r + 5], 12, 1200080426);
            s = p(s, a, i, n, e[r + 6], 17, -1473231341);
            n = p(n, s, a, i, e[r + 7], 22, -45705983);
            i = p(i, n, s, a, e[r + 8], 7, 1770035416);
            a = p(a, i, n, s, e[r + 9], 12, -1958414417);
            s = p(s, a, i, n, e[r + 10], 17, -42063);
            n = p(n, s, a, i, e[r + 11], 22, -1990404162);
            i = p(i, n, s, a, e[r + 12], 7, 1804603682);
            a = p(a, i, n, s, e[r + 13], 12, -40341101);
            s = p(s, a, i, n, e[r + 14], 17, -1502002290);
            n = p(n, s, a, i, e[r + 15], 22, 1236535329);
            i = m(i, n, s, a, e[r + 1], 5, -165796510);
            a = m(a, i, n, s, e[r + 6], 9, -1069501632);
            s = m(s, a, i, n, e[r + 11], 14, 643717713);
            n = m(n, s, a, i, e[r + 0], 20, -373897302);
            i = m(i, n, s, a, e[r + 5], 5, -701558691);
            a = m(a, i, n, s, e[r + 10], 9, 38016083);
            s = m(s, a, i, n, e[r + 15], 14, -660478335);
            n = m(n, s, a, i, e[r + 4], 20, -405537848);
            i = m(i, n, s, a, e[r + 9], 5, 568446438);
            a = m(a, i, n, s, e[r + 14], 9, -1019803690);
            s = m(s, a, i, n, e[r + 3], 14, -187363961);
            n = m(n, s, a, i, e[r + 8], 20, 1163531501);
            i = m(i, n, s, a, e[r + 13], 5, -1444681467);
            a = m(a, i, n, s, e[r + 2], 9, -51403784);
            s = m(s, a, i, n, e[r + 7], 14, 1735328473);
            n = m(n, s, a, i, e[r + 12], 20, -1926607734);
            i = g(i, n, s, a, e[r + 5], 4, -378558);
            a = g(a, i, n, s, e[r + 8], 11, -2022574463);
            s = g(s, a, i, n, e[r + 11], 16, 1839030562);
            n = g(n, s, a, i, e[r + 14], 23, -35309556);
            i = g(i, n, s, a, e[r + 1], 4, -1530992060);
            a = g(a, i, n, s, e[r + 4], 11, 1272893353);
            s = g(s, a, i, n, e[r + 7], 16, -155497632);
            n = g(n, s, a, i, e[r + 10], 23, -1094730640);
            i = g(i, n, s, a, e[r + 13], 4, 681279174);
            a = g(a, i, n, s, e[r + 0], 11, -358537222);
            s = g(s, a, i, n, e[r + 3], 16, -722521979);
            n = g(n, s, a, i, e[r + 6], 23, 76029189);
            i = g(i, n, s, a, e[r + 9], 4, -640364487);
            a = g(a, i, n, s, e[r + 12], 11, -421815835);
            s = g(s, a, i, n, e[r + 15], 16, 530742520);
            n = g(n, s, a, i, e[r + 2], 23, -995338651);
            i = b(i, n, s, a, e[r + 0], 6, -198630844);
            a = b(a, i, n, s, e[r + 7], 10, 1126891415);
            s = b(s, a, i, n, e[r + 14], 15, -1416354905);
            n = b(n, s, a, i, e[r + 5], 21, -57434055);
            i = b(i, n, s, a, e[r + 12], 6, 1700485571);
            a = b(a, i, n, s, e[r + 3], 10, -1894986606);
            s = b(s, a, i, n, e[r + 10], 15, -1051523);
            n = b(n, s, a, i, e[r + 1], 21, -2054922799);
            i = b(i, n, s, a, e[r + 8], 6, 1873313359);
            a = b(a, i, n, s, e[r + 15], 10, -30611744);
            s = b(s, a, i, n, e[r + 6], 15, -1560198380);
            n = b(n, s, a, i, e[r + 13], 21, 1309151649);
            i = b(i, n, s, a, e[r + 4], 6, -145523070);
            a = b(a, i, n, s, e[r + 11], 10, -1120210379);
            s = b(s, a, i, n, e[r + 2], 15, 718787259);
            n = b(n, s, a, i, e[r + 9], 21, -343485551);
            i = o(i, _);
            n = o(n, d);
            s = o(s, l);
            a = o(a, u)
        }
        return [i, n, s, a]
    };
    var $ = function(e, t) {
        var i = d(e, !0);
        if (i.length > 16)
            i = v(i, e.length * a);
        var n = Array(16)
          , s = Array(16);
        for (var r = 0; r < 16; r++) {
            n[r] = 909522486 ^ i[r];
            s[r] = 1549556828 ^ i[r]
        }
        var o = v(n.concat(d(t, !0)), 512 + t.length * a);
        return v(s.concat(o), 640)
    };
    var y = function(e, t) {
        e[t >> 5] |= 128 << 24 - t % 32;
        e[(t + 64 >> 9 << 4) + 15] = t;
        var i = Array(80)
          , n = 1732584193
          , s = -271733879
          , a = -1732584194
          , d = 271733878
          , l = -1009589776;
        for (var u = 0, f = e.length, h, p, m, g, b; u < f; u += 16) {
            h = n;
            p = s;
            m = a;
            g = d;
            b = l;
            for (var v = 0; v < 80; v++) {
                i[v] = v < 16 ? e[u + v] : r(i[v - 3] ^ i[v - 8] ^ i[v - 14] ^ i[v - 16], 1);
                var $ = o(o(r(n, 5), c(v, s, a, d)), o(o(l, i[v]), _(v)));
                l = d;
                d = a;
                a = r(s, 30);
                s = n;
                n = $
            }
            n = o(n, h);
            s = o(s, p);
            a = o(a, m);
            d = o(d, g);
            l = o(l, b)
        }
        return [n, s, a, d, l]
    };
    var C = function(e, t) {
        var i = d(e);
        if (i.length > 16)
            i = y(i, e.length * a);
        var n = Array(16)
          , s = Array(16);
        for (var r = 0; r < 16; r++) {
            n[r] = 909522486 ^ i[r];
            s[r] = 1549556828 ^ i[r]
        }
        var o = y(n.concat(d(t)), 512 + t.length * a);
        return y(s.concat(o), 672);
    };
    t._$hmacsha12hex = function(e, t) {
        return l(C(e, t))
    }
    ;
    t._$hmacsha12b64 = function(e, t) {
        return f(C(e, t))
    }
    ;
    t._$hmacsha12str = function(e, t) {
        return u(C(e, t))
    }
    ;
    t._$hmacmd52hex = function(e, t) {
        return l($(e, t), !0)
    }
    ;
    t._$hmacmd52b64 = function(e, t) {
        return f($(e, t), !0)
    }
    ;
    t._$hmacmd52str = function(e, t) {
        return u($(e, t), !0)
    }
    ;
    t._$sha12hex = function(e) {
        return l(y(d(e), e.length * a))
    }
    ;
    t._$sha12b64 = function(e) {
        return f(y(d(e), e.length * a))
    }
    ;
    t._$sha12str = function(e) {
        return u(y(d(e), e.length * a))
    }
    ;
    t._$md52hex = function(e) {
        return l(v(d(e, !0), e.length * a), !0)
    }
    ;
    t._$md52b64 = function(e) {
        return f(v(d(e, !0), e.length * a), !0)
    }
    ;
    t._$md52str = function(e) {
        return u(v(d(e, !0), e.length * a), !0)
    }
    ;
    t._$str2hex = function(e, t) {
        return l(d(e, !t), !t)
    }
    ;
    // if (!0)
        // e.copy(e.P("nej.u"), t);
    return t
}, "017b426dd2bb4315fa45d567a1fd3718");


var my_jsf = my_t._$sha12b64("AAAAAAACCCGGHHILMMPTTTTVWWW")


//rtid 和Utid 这个是一个随机生成的32位base64编码
var my_rtid = function() {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      , t = 32
      , i = [];
    for (; t-- > 0; )
        i[t] = e.charAt(Math.random() * e.length);
    return i.join("")
};

// console.log(my_rtid())