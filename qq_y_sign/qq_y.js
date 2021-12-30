this.window = this;
var zj;
!function(e){


var n = function() {
        if ("undefined" !== typeof self)
            return self;
        if ("undefined" !== typeof window)
            return window;
        if ("undefined" !== typeof e)
            return e;
        throw new Error("unable to locate global object")
    }();
    n.__sign_hash_20200305 = function(e) {
        function t(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }
        function n(e, n, r, i, o, a) {
            return t((u = t(t(n, e), t(i, a))) << (l = o) | u >>> 32 - l, r);
            var u, l
        }
        function r(e, t, r, i, o, a, u) {
            return n(t & r | ~t & i, e, t, o, a, u)
        }
        function i(e, t, r, i, o, a, u) {
            return n(t & i | r & ~i, e, t, o, a, u)
        }
        function o(e, t, r, i, o, a, u) {
            return n(t ^ r ^ i, e, t, o, a, u)
        }
        function a(e, t, r, i, o, a, u) {
            return n(r ^ (t | ~i), e, t, o, a, u)
        }
        function u(e) {
            return function(e) {
                var t, n = "";
                for (t = 0; t < 32 * e.length; t += 8)
                    n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                return n
            }(function(e, n) {
                e[n >> 5] |= 128 << n % 32,
                e[14 + (n + 64 >>> 9 << 4)] = n;
                var u, l, c, s, f, p = 1732584193, d = -271733879, h = -1732584194, v = 271733878;
                for (u = 0; u < e.length; u += 16)
                    l = p,
                    c = d,
                    s = h,
                    f = v,
                    p = r(p, d, h, v, e[u], 7, -680876936),
                    v = r(v, p, d, h, e[u + 1], 12, -389564586),
                    h = r(h, v, p, d, e[u + 2], 17, 606105819),
                    d = r(d, h, v, p, e[u + 3], 22, -1044525330),
                    p = r(p, d, h, v, e[u + 4], 7, -176418897),
                    v = r(v, p, d, h, e[u + 5], 12, 1200080426),
                    h = r(h, v, p, d, e[u + 6], 17, -1473231341),
                    d = r(d, h, v, p, e[u + 7], 22, -45705983),
                    p = r(p, d, h, v, e[u + 8], 7, 1770035416),
                    v = r(v, p, d, h, e[u + 9], 12, -1958414417),
                    h = r(h, v, p, d, e[u + 10], 17, -42063),
                    d = r(d, h, v, p, e[u + 11], 22, -1990404162),
                    p = r(p, d, h, v, e[u + 12], 7, 1804603682),
                    v = r(v, p, d, h, e[u + 13], 12, -40341101),
                    h = r(h, v, p, d, e[u + 14], 17, -1502002290),
                    p = i(p, d = r(d, h, v, p, e[u + 15], 22, 1236535329), h, v, e[u + 1], 5, -165796510),
                    v = i(v, p, d, h, e[u + 6], 9, -1069501632),
                    h = i(h, v, p, d, e[u + 11], 14, 643717713),
                    d = i(d, h, v, p, e[u], 20, -373897302),
                    p = i(p, d, h, v, e[u + 5], 5, -701558691),
                    v = i(v, p, d, h, e[u + 10], 9, 38016083),
                    h = i(h, v, p, d, e[u + 15], 14, -660478335),
                    d = i(d, h, v, p, e[u + 4], 20, -405537848),
                    p = i(p, d, h, v, e[u + 9], 5, 568446438),
                    v = i(v, p, d, h, e[u + 14], 9, -1019803690),
                    h = i(h, v, p, d, e[u + 3], 14, -187363961),
                    d = i(d, h, v, p, e[u + 8], 20, 1163531501),
                    p = i(p, d, h, v, e[u + 13], 5, -1444681467),
                    v = i(v, p, d, h, e[u + 2], 9, -51403784),
                    h = i(h, v, p, d, e[u + 7], 14, 1735328473),
                    p = o(p, d = i(d, h, v, p, e[u + 12], 20, -1926607734), h, v, e[u + 5], 4, -378558),
                    v = o(v, p, d, h, e[u + 8], 11, -2022574463),
                    h = o(h, v, p, d, e[u + 11], 16, 1839030562),
                    d = o(d, h, v, p, e[u + 14], 23, -35309556),
                    p = o(p, d, h, v, e[u + 1], 4, -1530992060),
                    v = o(v, p, d, h, e[u + 4], 11, 1272893353),
                    h = o(h, v, p, d, e[u + 7], 16, -155497632),
                    d = o(d, h, v, p, e[u + 10], 23, -1094730640),
                    p = o(p, d, h, v, e[u + 13], 4, 681279174),
                    v = o(v, p, d, h, e[u], 11, -358537222),
                    h = o(h, v, p, d, e[u + 3], 16, -722521979),
                    d = o(d, h, v, p, e[u + 6], 23, 76029189),
                    p = o(p, d, h, v, e[u + 9], 4, -640364487),
                    v = o(v, p, d, h, e[u + 12], 11, -421815835),
                    h = o(h, v, p, d, e[u + 15], 16, 530742520),
                    p = a(p, d = o(d, h, v, p, e[u + 2], 23, -995338651), h, v, e[u], 6, -198630844),
                    v = a(v, p, d, h, e[u + 7], 10, 1126891415),
                    h = a(h, v, p, d, e[u + 14], 15, -1416354905),
                    d = a(d, h, v, p, e[u + 5], 21, -57434055),
                    p = a(p, d, h, v, e[u + 12], 6, 1700485571),
                    v = a(v, p, d, h, e[u + 3], 10, -1894986606),
                    h = a(h, v, p, d, e[u + 10], 15, -1051523),
                    d = a(d, h, v, p, e[u + 1], 21, -2054922799),
                    p = a(p, d, h, v, e[u + 8], 6, 1873313359),
                    v = a(v, p, d, h, e[u + 15], 10, -30611744),
                    h = a(h, v, p, d, e[u + 6], 15, -1560198380),
                    d = a(d, h, v, p, e[u + 13], 21, 1309151649),
                    p = a(p, d, h, v, e[u + 4], 6, -145523070),
                    v = a(v, p, d, h, e[u + 11], 10, -1120210379),
                    h = a(h, v, p, d, e[u + 2], 15, 718787259),
                    d = a(d, h, v, p, e[u + 9], 21, -343485551),
                    p = t(p, l),
                    d = t(d, c),
                    h = t(h, s),
                    v = t(v, f);
                return [p, d, h, v]
            }(function(e) {
                var t, n = [];
                for (n[(e.length >> 2) - 1] = void 0,
                t = 0; t < n.length; t += 1)
                    n[t] = 0;
                for (t = 0; t < 8 * e.length; t += 8)
                    n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                return n
            }(e), 8 * e.length))
        }
        function l(e) {
            return u(unescape(encodeURIComponent(e)))
        }
        return function(e) {
            var t, n, r = "";
            for (n = 0; n < e.length; n += 1)
                t = e.charCodeAt(n),
                r += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
            return r
        }(l(e))
    }
    ,
    function e(t, n, r, i, o) {
        // console.log("改变之前：",o)
        o = o || [[this], [{}]];
        // if (o.length == 3){
        //     console.log("1111111111")
        //     o[0] = window
        //     console.log(o[0])
        // }
        // console.log("改变之后：",o)

        for (var a = [], u = null, l = [function() {
            return !0
        }
        , function() {}
        , function() {
            o.length = r[n++]
        }
        , function() {
            o.push(r[n++])
        }
        , function() {
            o.pop()
        }
        , function() {
            var e = r[n++]
              , t = o[o.length - 2 - e];
            o[o.length - 2 - e] = o.pop(),
            o.push(t)
        }
        , function() {
            o.push(o[o.length - 1])
        }
        , function() {
            o.push([o.pop(), o.pop()].reverse())
        }
        , function() {
            o.push([i, o.pop()])
        }
        , function() {
            o.push([o.pop()])
        }
        , function() {
            var e = o.pop();
            o.push(e[0][e[1]])
        }
        , function() {
            o.push(o[o.pop()[0]][0])
        }
        , function() {
            var e = o[o.length - 2];
            e[0][e[1]] = o[o.length - 1]
        }
        , function() {
            o[o[o.length - 2][0]][0] = o[o.length - 1]
        }
        , function() {
            var e = o.pop()
              , t = o.pop();
            o.push([t[0][t[1]], e])
        }
        , function() {
            var e = o.pop();
            o.push([o[o.pop()][0], e])
        }
        , function() {
            var e = o.pop();
            o.push(delete e[0][e[1]])
        }
        , function() {
            var e = [];
            for (var t in o.pop())
                e.push(t);
            o.push(e)
        }
        , function() {
            o[o.length - 1].length ? o.push(o[o.length - 1].shift(), !0) : o.push(void 0, !1)
        }
        , function() {
            var e = o[o.length - 2]
              , t = Object.getOwnPropertyDescriptor(e[0], e[1]) || {
                configurable: !0,
                enumerable: !0
            };
            t.get = o[o.length - 1],
            Object.defineProperty(e[0], e[1], t)
        }
        , function() {
            var e = o[o.length - 2]
              , t = Object.getOwnPropertyDescriptor(e[0], e[1]) || {
                configurable: !0,
                enumerable: !0
            };
            t.set = o[o.length - 1],
            Object.defineProperty(e[0], e[1], t)
        }
        , function() {
            n = r[n++]
        }
        , function() {
            var e = r[n++];
            o[o.length - 1] && (n = e)
        }
        , function() {
            throw o[o.length - 1]
        }
        , function() {
            var e = r[n++]
              , t = e ? o.slice(-e) : [];
            o.length -= e,
            o.push(o.pop().apply(i, t))
        }
        , function() {
            var e = r[n++]
              , t = e ? o.slice(-e) : [];
            o.length -= e;
            var i = o.pop();
            // console.log(i[0])
            // console.log(i[1])
            // console.log(i[0][i[1]].apply(i[0], t))
            if (i[1] =="random" || i[1]=="floor"){
                i[0] = Math
            }
            o.push(i[0][i[1]].apply(i[0], t))
        }
        , function() {
            var e = r[n++]
              , t = e ? o.slice(-e) : [];
            o.length -= e,
            t.unshift(null),
            o.push(new (Function.prototype.bind.apply(o.pop(), t)))
        }
        , function() {
            var e = r[n++]
              , t = e ? o.slice(-e) : [];
            o.length -= e,
            t.unshift(null);
            var i = o.pop();
            o.push(new (Function.prototype.bind.apply(i[0][i[1]], t)))
        }
        , function() {
            o.push(!o.pop())
        }
        , function() {
            o.push(~o.pop())
        }
        , function() {
            o.push(typeof o.pop())
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] == o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] === o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] > o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] >= o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] << o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] >> o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] >>> o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] + o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] - o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] * o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] / o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] % o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] | o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] & o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] ^ o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2]in o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2]instanceof o.pop()
        }
        , function() {
            o[o[o.length - 1][0]] = void 0 === o[o[o.length - 1][0]] ? [] : o[o[o.length - 1][0]]
        }
        , function() {
            for (var a = r[n++], u = [], l = r[n++], c = r[n++], s = [], f = 0; f < l; f++)
                u[r[n++]] = o[r[n++]];
            for (var p = 0; p < c; p++)
                s[p] = r[n++];
            o.push((function n() {
                var o = u.slice(0);
                o[0] = [this],
                o[1] = [arguments],
                o[2] = [n];
                for (var l = 0; l < s.length && l < arguments.length; l++)
                    s[l] > 0 && (o[s[l]] = [arguments[l]]);
                return e(t, a, r, i, o)
            }
            ))
        }
        , function() {
            a.push([r[n++], o.length, r[n++]])
        }
        , function() {
            a.pop()
        }
        , function() {
            return !!u
        }
        , function() {
            u = null
        }
        , function() {
            o[o.length - 1] += String.fromCharCode(r[n++])
        }
        , function() {
            o.push("")
        }
        , function() {
            o.push(void 0)
        }
        , function() {
            o.push(null)
        }
        , function() {
            o.push(!0)
        }
        , function() {
            o.push(!1)
        }
        , function() {
            o.length -= r[n++]
        }
        , function() {
            o[o.length - 1] = r[n++]
        }
        , function() {
            var e = o.pop()
              , t = o[o.length - 1];
            t[0][t[1]] = o[e[0]][0]
        }
        , function() {
            var e = o.pop()
              , t = o[o.length - 1];
            t[0][t[1]] = e[0][e[1]]
        }
        , function() {
            var e = o.pop()
              , t = o[o.length - 1];
            o[t[0]][0] = o[e[0]][0]
        }
        , function() {
            var e = o.pop()
              , t = o[o.length - 1];
            o[t[0]][0] = e[0][e[1]]
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] < o.pop()
        }
        , function() {
            o[o.length - 2] = o[o.length - 2] <= o.pop()
        }
        ]; ; )
            try {

                for (; !l[r[n++]](); );
                if (u)
                    throw u;
                return o.pop()
            } catch (s) {
                console.log(n)
                var c = a.pop();
                if (void 0 === c)
                    throw s;
                u = s,
                n = c[0],
                o.length = c[1],
                c[2] && (o[c[2]][0] = u)
            }
    }(120731, 0, [21, 34, 50, 100, 57, 50, 102, 50, 98, 99, 101, 52, 54, 97, 52, 99, 55, 56, 52, 49, 57, 54, 57, 49, 56, 98, 102, 100, 100, 48, 48, 55, 55, 102, 2, 10, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 61, 8, 9, 48, 61, 9, 9, 48, 4, 21, 427, 54, 2, 15, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 61, 8, 9, 48, 61, 9, 9, 48, 61, 10, 9, 48, 61, 11, 9, 48, 61, 12, 9, 48, 61, 13, 9, 48, 61, 14, 9, 48, 61, 10, 9, 55, 54, 97, 54, 98, 54, 99, 54, 100, 54, 101, 54, 102, 54, 103, 54, 104, 54, 105, 54, 106, 54, 107, 54, 108, 54, 109, 54, 110, 54, 111, 54, 112, 54, 113, 54, 114, 54, 115, 54, 116, 54, 117, 54, 118, 54, 119, 54, 120, 54, 121, 54, 122, 54, 48, 54, 49, 54, 50, 54, 51, 54, 52, 54, 53, 54, 54, 54, 55, 54, 56, 54, 57, 13, 4, 61, 11, 9, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 102, 54, 108, 54, 111, 54, 111, 54, 114, 14, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 114, 54, 97, 54, 110, 54, 100, 54, 111, 54, 109, 14, 25, 0, 3, 4, 9, 11, 3, 3, 9, 11, 39, 3, 1, 38, 40, 3, 3, 9, 11, 38, 25, 1, 13, 4, 61, 12, 9, 55, 13, 4, 61, 13, 9, 3, 0, 13, 4, 4, 3, 13, 9, 11, 3, 11, 9, 11, 66, 22, 306, 4, 21, 422, 24, 4, 3, 14, 9, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 102, 54, 108, 54, 111, 54, 111, 54, 114, 14, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 114, 54, 97, 54, 110, 54, 100, 54, 111, 54, 109, 14, 25, 0, 3, 10, 9, 55, 54, 108, 54, 101, 54, 110, 54, 103, 54, 116, 54, 104, 15, 10, 40, 25, 1, 13, 4, 61, 12, 9, 6, 11, 3, 10, 9, 3, 14, 9, 11, 15, 10, 38, 13, 4, 61, 13, 9, 6, 11, 6, 5, 1, 5, 0, 3, 1, 38, 13, 4, 61, 0, 5, 0, 43, 4, 21, 291, 61, 3, 12, 9, 11, 0, 3, 9, 9, 49, 72, 0, 2, 3, 4, 13, 4, 61, 8, 9, 21, 721, 3, 2, 8, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 4, 55, 54, 115, 54, 101, 54, 108, 54, 102, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 510, 4, 21, 523, 22, 4, 55, 54, 115, 54, 101, 54, 108, 54, 102, 8, 10, 0, 55, 54, 119, 54, 105, 54, 110, 54, 100, 54, 111, 54, 119, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 566, 4, 21, 583, 3, 4, 55, 54, 119, 54, 105, 54, 110, 54, 100, 54, 111, 54, 119, 8, 10, 0, 55, 54, 103, 54, 108, 54, 111, 54, 98, 54, 97, 54, 108, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 626, 4, 21, 643, 25, 4, 55, 54, 103, 54, 108, 54, 111, 54, 98, 54, 97, 54, 108, 8, 10, 0, 55, 54, 69, 54, 114, 54, 114, 54, 111, 54, 114, 8, 55, 54, 117, 54, 110, 54, 97, 54, 98, 54, 108, 54, 101, 54, 32, 54, 116, 54, 111, 54, 32, 54, 108, 54, 111, 54, 99, 54, 97, 54, 116, 54, 101, 54, 32, 54, 103, 54, 108, 54, 111, 54, 98, 54, 97, 54, 108, 54, 32, 54, 111, 54, 98, 54, 106, 54, 101, 54, 99, 54, 116, 27, 1, 23, 56, 0, 49, 444, 0, 0, 24, 0, 13, 4, 61, 8, 9, 55, 54, 95, 54, 95, 54, 103, 54, 101, 54, 116, 54, 83, 54, 101, 54, 99, 54, 117, 54, 114, 54, 105, 54, 116, 54, 121, 54, 83, 54, 105, 54, 103, 54, 110, 15, 21, 1126, 49, 2, 14, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 61, 8, 9, 48, 61, 9, 9, 48, 61, 10, 9, 48, 61, 11, 9, 48, 61, 9, 9, 55, 54, 108, 54, 111, 54, 99, 54, 97, 54, 116, 54, 105, 54, 111, 54, 110, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 862, 21, 932, 21, 4, 55, 54, 108, 54, 111, 54, 99, 54, 97, 54, 116, 54, 105, 54, 111, 54, 110, 8, 55, 54, 104, 54, 111, 54, 115, 54, 116, 14, 55, 54, 105, 54, 110, 54, 100, 54, 101, 54, 120, 54, 79, 54, 102, 14, 55, 54, 121, 54, 46, 54, 113, 54, 113, 54, 46, 54, 99, 54, 111, 54, 109, 25, 1, 3, 0, 3, 1, 39, 32, 22, 963, 4, 55, 54, 67, 54, 74, 54, 66, 54, 80, 54, 65, 54, 67, 54, 114, 54, 82, 54, 117, 54, 78, 54, 121, 54, 55, 21, 974, 50, 4, 3, 12, 9, 11, 3, 8, 3, 10, 24, 2, 13, 4, 61, 10, 9, 3, 13, 9, 55, 54, 95, 54, 95, 54, 115, 54, 105, 54, 103, 54, 110, 54, 95, 54, 104, 54, 97, 54, 115, 54, 104, 54, 95, 54, 50, 54, 48, 54, 50, 54, 48, 54, 48, 54, 51, 54, 48, 54, 53, 15, 10, 22, 1030, 21, 1087, 22, 4, 3, 13, 9, 55, 54, 95, 54, 95, 54, 115, 54, 105, 54, 103, 54, 110, 54, 95, 54, 104, 54, 97, 54, 115, 54, 104, 54, 95, 54, 50, 54, 48, 54, 50, 54, 48, 54, 48, 54, 51, 54, 48, 54, 53, 15, 3, 9, 9, 11, 3, 3, 9, 11, 38, 25, 1, 13, 4, 61, 11, 9, 3, 12, 9, 11, 3, 10, 3, 53, 3, 37, 39, 24, 2, 13, 4, 4, 55, 54, 122, 54, 122, 54, 97, 3, 11, 9, 11, 38, 3, 10, 9, 11, 38, 0, 49, 771, 2, 1, 12, 9, 13, 8, 3, 12, 4, 4, 56, 0], n);
    var r = n.__getSecuritySign;
    zj = r;
}(this.window)

function get_sign(data){
    
    
    return zj(data)

}


// console.log(zj('{"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":5381,"g_tk":5381},"req_1":{"module":"music.musichallSinger.SingerList","method":"GetSingerListIndex","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":240,"cur_page":4}}}'))


// console.log(zj('{"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":5381,"g_tk":5381},"req_1":{"module":"music.musichallSinger.SingerList","method":"GetSingerListIndex","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":400,"cur_page":6}}}'))
// console.log(Math.random())