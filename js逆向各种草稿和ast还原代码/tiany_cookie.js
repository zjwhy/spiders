
 var navigator={
    "vendorSub": "",
    "productSub": "20030107",
    "vendor": "Google Inc.",
    "maxTouchPoints": 0,
    "hardwareConcurrency": 8,
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "platform": "MacIntel",
    "product": "Gecko",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "language": "zh-CN",
    "languages": [
        "zh-CN",
        "zh"
    ],
    "deviceMemory": 8
}

var ty_uuid = function() {
    var e = function() {
        for (var e = 1 * new Date, t = 0; e == 1 * new Date; )
            t++;
        return e.toString(16) + t.toString(16)
    }
      , t = function() {
        return Math.random().toString(16).replace(".", "")
    }
      , r = function(e) {
        function t(e, t) {
            var r, s = 0;
            for (r = 0; r < t.length; r++)
                s |= n[r] << 8 * r;
            return e ^ s
        }
        var r, s, a = navigator.userAgent, n = [], i = 0;
        for (r = 0; r < a.length; r++)
            s = a.charCodeAt(r),
            n.unshift(255 & s),
            n.length >= 4 && (i = t(i, n),
            n = []);
        return n.length > 0 && (i = t(i, n)),
        i.toString(16)
    };
    var ssuid = function() {
        return Math.round(2147483647 * Math.random()) * (new Date).getUTCMilliseconds() % 1e10
    }();
    var uuid = function() {
        var s = String(900 * 1440);
        s = s && /\d{5,}/.test(s) ? s.toString(16) : String(31242 * Math.random()).replace(".", "").slice(0, 8);
        var a = e() + "-" + t() + "-" + r() + "-" + s + "-" + e();
        return a ? a : (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15)
    }

    return {ssuid:ssuid,uuid:uuid}
}

// console.log(ty_uuid())