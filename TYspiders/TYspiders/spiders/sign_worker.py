import hashlib,js2py

import re


class SignWorker(object):
    def __init__(self):
        self.js = """
                   function i() {
                           var t = "aaa";
                           for (var e = t.split("").map(function(t) {
                               return t.charCodeAt()
                           }), n = e.length, i = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"].map(function(t) {
                               return t.charCodeAt()
                           }), a = 0; a < n; a++)
                               e[a] = 5 ^ e[a];
                           var o = []
                             , r = 0
                             , s = 0
                             , u = 0;
                           while (1) {
                               var c = 255 & e[r];
                               if (u = s + 1,
                               o[s] = i[c >> 4],
                               s = u + 1,
                               o[u] = i[15 & c],
                               r += 1,
                               r >= n)
                                   break
                           }
                           return o.map(function(t) {
                               return String.fromCharCode(t)
                           }).join("")
                       }
                   var a = i()

               """

    def miduxs_sign(self, sign_str=None):
        md5 = hashlib.new('md5', sign_str.encode()).hexdigest()
        sign = js2py.eval_js(self.js.replace("aaa", md5))
        return sign
    def weilixs_sign(self,sign_str=None):
        sign = hashlib.new('md5',sign_str.encode()).hexdigest()
        return sign
    def mokayd_sign(self,sign_str=None):
        js = """

            function O(n, e) {
                    return n << e | n >>> 32 - e
                }

            function j(n) {
                    for (var e = Array(), t = (1 << 8) - 1, r = 0; r < n.length * 8; r += 8)
                        e[r >> 5] |= (n.charCodeAt(r / 8) & t) << r % 32;
                    return e
                }

            function b(n) {
                    return S(p(j(n), n.length * 8))
                }

            function g(n, e, t, r, o, c) {
                    return I(O(I(I(e, n), I(r, c)), o), t)
                }
            function v(n, e, t, r, o, c, u) {
                    return g(e & t | ~e & r, n, e, o, c, u)
                }
            function k(n, e, t, r, o, c, u) {
                    return g(e & r | t & ~r, n, e, o, c, u)
                }
            function y(n, e, t, r, o, c, u) {
                    return g(e ^ t ^ r, n, e, o, c, u)
                }
            function w(n, e, t, r, o, c, u) {
                    return g(t ^ (e | ~r), n, e, o, c, u)
                }
            function I(n, e) {
                    var t = (65535 & n) + (65535 & e)
                      , r = (n >> 16) + (e >> 16) + (t >> 16);
                    return r << 16 | 65535 & t
                }

            function p(n, e) {
                    n[e >> 5] |= 128 << e % 32,
                    n[14 + (e + 64 >>> 9 << 4)] = e;
                    for (var t = 1732584193, r = -271733879, o = -1732584194, c = 271733878, u = 0; u < n.length; u += 16) {
                        var a = t
                          , i = r
                          , f = o
                          , s = c;
                        t = v(t, r, o, c, n[u], 7, -680876936),
                        c = v(c, t, r, o, n[u + 1], 12, -389564586),
                        o = v(o, c, t, r, n[u + 2], 17, 606105819),
                        r = v(r, o, c, t, n[u + 3], 22, -1044525330),
                        t = v(t, r, o, c, n[u + 4], 7, -176418897),
                        c = v(c, t, r, o, n[u + 5], 12, 1200080426),
                        o = v(o, c, t, r, n[u + 6], 17, -1473231341),
                        r = v(r, o, c, t, n[u + 7], 22, -45705983),
                        t = v(t, r, o, c, n[u + 8], 7, 1770035416),
                        c = v(c, t, r, o, n[u + 9], 12, -1958414417),
                        o = v(o, c, t, r, n[u + 10], 17, -42063),
                        r = v(r, o, c, t, n[u + 11], 22, -1990404162),
                        t = v(t, r, o, c, n[u + 12], 7, 1804603682),
                        c = v(c, t, r, o, n[u + 13], 12, -40341101),
                        o = v(o, c, t, r, n[u + 14], 17, -1502002290),
                        r = v(r, o, c, t, n[u + 15], 22, 1236535329),
                        t = k(t, r, o, c, n[u + 1], 5, -165796510),
                        c = k(c, t, r, o, n[u + 6], 9, -1069501632),
                        o = k(o, c, t, r, n[u + 11], 14, 643717713),
                        r = k(r, o, c, t, n[u], 20, -373897302),
                        t = k(t, r, o, c, n[u + 5], 5, -701558691),
                        c = k(c, t, r, o, n[u + 10], 9, 38016083),
                        o = k(o, c, t, r, n[u + 15], 14, -660478335),
                        r = k(r, o, c, t, n[u + 4], 20, -405537848),
                        t = k(t, r, o, c, n[u + 9], 5, 568446438),
                        c = k(c, t, r, o, n[u + 14], 9, -1019803690),
                        o = k(o, c, t, r, n[u + 3], 14, -187363961),
                        r = k(r, o, c, t, n[u + 8], 20, 1163531501),
                        t = k(t, r, o, c, n[u + 13], 5, -1444681467),
                        c = k(c, t, r, o, n[u + 2], 9, -51403784),
                        o = k(o, c, t, r, n[u + 7], 14, 1735328473),
                        r = k(r, o, c, t, n[u + 12], 20, -1926607734),
                        t = y(t, r, o, c, n[u + 5], 4, -378558),
                        c = y(c, t, r, o, n[u + 8], 11, -2022574463),
                        o = y(o, c, t, r, n[u + 11], 16, 1839030562),
                        r = y(r, o, c, t, n[u + 14], 23, -35309556),
                        t = y(t, r, o, c, n[u + 1], 4, -1530992060),
                        c = y(c, t, r, o, n[u + 4], 11, 1272893353),
                        o = y(o, c, t, r, n[u + 7], 16, -155497632),
                        r = y(r, o, c, t, n[u + 10], 23, -1094730640),
                        t = y(t, r, o, c, n[u + 13], 4, 681279174),
                        c = y(c, t, r, o, n[u], 11, -358537222),
                        o = y(o, c, t, r, n[u + 3], 16, -722521979),
                        r = y(r, o, c, t, n[u + 6], 23, 76029189),
                        t = y(t, r, o, c, n[u + 9], 4, -640364487),
                        c = y(c, t, r, o, n[u + 12], 11, -421815835),
                        o = y(o, c, t, r, n[u + 15], 16, 530742520),
                        r = y(r, o, c, t, n[u + 2], 23, -995338651),
                        t = w(t, r, o, c, n[u], 6, -198630844),
                        c = w(c, t, r, o, n[u + 7], 10, 1126891415),
                        o = w(o, c, t, r, n[u + 14], 15, -1416354905),
                        r = w(r, o, c, t, n[u + 5], 21, -57434055),
                        t = w(t, r, o, c, n[u + 12], 6, 1700485571),
                        c = w(c, t, r, o, n[u + 3], 10, -1894986606),
                        o = w(o, c, t, r, n[u + 10], 15, -1051523),
                        r = w(r, o, c, t, n[u + 1], 21, -2054922799),
                        t = w(t, r, o, c, n[u + 8], 6, 1873313359),
                        c = w(c, t, r, o, n[u + 15], 10, -30611744),
                        o = w(o, c, t, r, n[u + 6], 15, -1560198380),
                        r = w(r, o, c, t, n[u + 13], 21, 1309151649),
                        t = w(t, r, o, c, n[u + 4], 6, -145523070),
                        c = w(c, t, r, o, n[u + 11], 10, -1120210379),
                        o = w(o, c, t, r, n[u + 2], 15, 718787259),
                        r = w(r, o, c, t, n[u + 9], 21, -343485551),
                        t = I(t, a),
                        r = I(r, i),
                        o = I(o, f),
                        c = I(c, s)
                    }
                    return Array(t, r, o, c)
                }

            function S(n) {
                    for (var e = 1 ? "0123456789ABCDEF" : "0123456789abcdef", t = "", r = 0; r < 4 * n.length; r++)
                        t += e.charAt(n[r >> 2] >> r % 4 * 8 + 4 & 15) + e.charAt(n[r >> 2] >> r % 4 * 8 & 15);
                    return t
                }

            var P = {
                    hex_md5: b
                };
            var sign = P.hex_md5('signstr')
        """
        sign = js2py.eval_js(js.replace('signstr', sign_str))
        return sign

    def ordinary_sign(self,sign_str=None):
        sign = hashlib.new('md5',sign_str.encode()).hexdigest()
        return sign

    def houhuay_sign(self,sign_str=None,stamp=1):
        t = [i for i in sign_str]
        r = []
        re_ = re.compile('[a-z0-9A-Z]')
        d = {}
        for i in t:
            c = re_.search(i)
            if c:
                a = c.group()
                if a not in r:
                    r.append(a)
                if a in d:
                    d[a] += 1
                else:
                    d[a] = 1

        _str = ''
        for j in r:
            _str = _str + j + str(d[j])
        _str += str(stamp)
        sign = self.ordinary_sign(_str)
        return sign

if __name__ == '__main__':
    sign_worker = SignWorker()
    url = "https://nz.hougarden.com/http-request/news?domains=nz&offset=0&limit=10&category=all&keywords=%E5%8A%9F%E5%A4%AB"
    sign = sign_worker.houhuay_sign(url,1571970820770)
    print(sign)