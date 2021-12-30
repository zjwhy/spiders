var my_fp = function() {
    "use strict";
    var e = function(t) {
        if (!(this instanceof e))
            return new e(t);
        var i = {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            detectScreenOrientation: !0,
            sortPluginsFor: [/palemoon/i],
            userDefinedFonts: []
        };
        this.options = this.extend(t, i),
        this.nativeForEach = Array.prototype.forEach,
        this.nativeMap = Array.prototype.map
    };
    return e.prototype = {
        extend: function(e, t) {
            if (null == e)
                return t;
            for (var i in e)
                null != e[i] && t[i] !== e[i] && (t[i] = e[i]);
            return t
        },
        get: function(e) {
            var t = this
              , i = {
                data: [],
                push: function(e) {
                    var i = e.key
                      , a = e.value;
                    "function" == typeof t.options.preprocessor && (a = t.options.preprocessor(i, a)),
                    this.data.push({
                        key: i,
                        value: a
                    })
                }
            };
            i = this.userAgentKey(i),
            i = this.languageKey(i),
            i = this.colorDepthKey(i),
            i = this.pixelRatioKey(i),
            i = this.hardwareConcurrencyKey(i),
            i = this.screenResolutionKey(i),
            i = this.availableScreenResolutionKey(i),
            i = this.timezoneOffsetKey(i),
            i = this.sessionStorageKey(i),
            i = this.localStorageKey(i),
            i = this.indexedDbKey(i),
            i = this.addBehaviorKey(i),
            i = this.openDatabaseKey(i),
            i = this.cpuClassKey(i),
            i = this.platformKey(i),
            i = this.doNotTrackKey(i),
            i = this.pluginsKey(i),
            i = this.canvasKey(i),
            i = this.webglKey(i),
            i = this.adBlockKey(i),
            i = this.hasLiedLanguagesKey(i),
            i = this.hasLiedResolutionKey(i),
            i = this.hasLiedOsKey(i),
            i = this.hasLiedBrowserKey(i),
            i = this.touchSupportKey(i),
            i = this.customEntropyFunction(i),
            this.fontsKey(i, function(i) {
                var a = [];
                t.each(i.data, function(e) {
                    var t = e.value;
                    "undefined" != typeof e.value.join && (t = e.value.join(";")),
                    a.push(t)
                });
                var r = t.x64hash128(a.join("~~~"), 31);
                return e(r, i.data)
            })
        },
        customEntropyFunction: function(e) {
            return "function" == typeof this.options.customFunction && e.push({
                key: "custom",
                value: this.options.customFunction()
            }),
            e
        },
        userAgentKey: function(e) {
            return this.options.excludeUserAgent || e.push({
                key: "user_agent",
                value: this.getUserAgent()
            }),
            e
        },
        getUserAgent: function() {
            return navigator.userAgent
        },
        languageKey: function(e) {
            return this.options.excludeLanguage || e.push({
                key: "language",
                value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
            }),
            e
        },
        colorDepthKey: function(e) {
            return this.options.excludeColorDepth || e.push({
                key: "color_depth",
                value: screen.colorDepth || -1
            }),
            e
        },
        pixelRatioKey: function(e) {
            return this.options.excludePixelRatio || e.push({
                key: "pixel_ratio",
                value: this.getPixelRatio()
            }),
            e
        },
        getPixelRatio: function() {
            return window.devicePixelRatio || ""
        },
        screenResolutionKey: function(e) {
            return this.options.excludeScreenResolution ? e : this.getScreenResolution(e)
        },
        getScreenResolution: function(e) {
            var t;
            return t = this.options.detectScreenOrientation && screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height],
            "undefined" != typeof t && e.push({
                key: "resolution",
                value: t
            }),
            e
        },
        availableScreenResolutionKey: function(e) {
            return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e)
        },
        getAvailableScreenResolution: function(e) {
            var t;
            return screen.availWidth && screen.availHeight && (t = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : [screen.availHeight, screen.availWidth]),
            "undefined" != typeof t && e.push({
                key: "available_resolution",
                value: t
            }),
            e
        },
        timezoneOffsetKey: function(e) {
            return this.options.excludeTimezoneOffset || e.push({
                key: "timezone_offset",
                value: (new Date).getTimezoneOffset()
            }),
            e
        },
        sessionStorageKey: function(e) {
            return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.push({
                key: "session_storage",
                value: 1
            }),
            e
        },
        localStorageKey: function(e) {
            return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.push({
                key: "local_storage",
                value: 1
            }),
            e
        },
        indexedDbKey: function(e) {
            return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.push({
                key: "indexed_db",
                value: 1
            }),
            e
        },
        addBehaviorKey: function(e) {
            return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && e.push({
                key: "add_behavior",
                value: 1
            }),
            e
        },
        openDatabaseKey: function(e) {
            return !this.options.excludeOpenDatabase && window.openDatabase && e.push({
                key: "open_database",
                value: 1
            }),
            e
        },
        cpuClassKey: function(e) {
            return this.options.excludeCpuClass || e.push({
                key: "cpu_class",
                value: this.getNavigatorCpuClass()
            }),
            e
        },
        platformKey: function(e) {
            return this.options.excludePlatform || e.push({
                key: "navigator_platform",
                value: this.getNavigatorPlatform()
            }),
            e
        },
        doNotTrackKey: function(e) {
            return this.options.excludeDoNotTrack || e.push({
                key: "do_not_track",
                value: this.getDoNotTrack()
            }),
            e
        },
        canvasKey: function(e) {
            return !this.options.excludeCanvas && this.isCanvasSupported() && e.push({
                key: "canvas",
                value: this.getCanvasFp()
            }),
            e
        },
        webglKey: function(e) {
            return this.options.excludeWebGL ? e : this.isWebGlSupported() ? (e.push({
                key: "webgl",
                value: this.getWebglFp()
            }),
            e) : e
        },
        adBlockKey: function(e) {
            return this.options.excludeAdBlock || e.push({
                key: "adblock",
                value: this.getAdBlock()
            }),
            e
        },
        hasLiedLanguagesKey: function(e) {
            return this.options.excludeHasLiedLanguages || e.push({
                key: "has_lied_languages",
                value: this.getHasLiedLanguages()
            }),
            e
        },
        hasLiedResolutionKey: function(e) {
            return this.options.excludeHasLiedResolution || e.push({
                key: "has_lied_resolution",
                value: this.getHasLiedResolution()
            }),
            e
        },
        hasLiedOsKey: function(e) {
            return this.options.excludeHasLiedOs || e.push({
                key: "has_lied_os",
                value: this.getHasLiedOs()
            }),
            e
        },
        hasLiedBrowserKey: function(e) {
            return this.options.excludeHasLiedBrowser || e.push({
                key: "has_lied_browser",
                value: this.getHasLiedBrowser()
            }),
            e
        },
        fontsKey: function(e, t) {
            return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t)
        },
        flashFontsKey: function(e, t) {
            return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? "undefined" == typeof this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function(i) {
                e.push({
                    key: "swf_fonts",
                    value: i.join(";")
                }),
                t(e)
            }) : t(e)
        },
        jsFontsKey: function(e, t) {
            var i = this;
            return setTimeout(function() {
                var a = ["monospace", "sans-serif", "serif"]
                  , r = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"]
                  , n = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
                i.options.extendedJsFonts && (r = r.concat(n)),
                r = r.concat(i.options.userDefinedFonts);
                var o = "mmmmmmmmmmlli"
                  , s = "72px"
                  , l = document.getElementsByTagName("body")[0]
                  , h = document.createElement("div")
                  , u = document.createElement("div")
                  , c = {}
                  , d = {}
                  , g = function() {
                    var e = document.createElement("span");
                    return e.style.position = "absolute",
                    e.style.left = "-9999px",
                    e.style.fontSize = s,
                    e.style.lineHeight = "normal",
                    e.innerHTML = o,
                    e
                }
                  , p = function(e, t) {
                    var i = g();
                    return i.style.fontFamily = "'" + e + "'," + t,
                    i
                }
                  , f = function() {
                    for (var e = [], t = 0, i = a.length; t < i; t++) {
                        var r = g();
                        r.style.fontFamily = a[t],
                        h.appendChild(r),
                        e.push(r)
                    }
                    return e
                }
                  , m = function() {
                    for (var e = {}, t = 0, i = r.length; t < i; t++) {
                        for (var n = [], o = 0, s = a.length; o < s; o++) {
                            var l = p(r[t], a[o]);
                            u.appendChild(l),
                            n.push(l)
                        }
                        e[r[t]] = n
                    }
                    return e
                }
                  , T = function(e) {
                    for (var t = !1, i = 0; i < a.length; i++)
                        if (t = e[i].offsetWidth !== c[a[i]] || e[i].offsetHeight !== d[a[i]])
                            return t;
                    return t
                }
                  , S = f();
                l.appendChild(h);
                for (var x = 0, v = a.length; x < v; x++)
                    c[a[x]] = S[x].offsetWidth,
                    d[a[x]] = S[x].offsetHeight;
                var E = m();
                l.appendChild(u);
                for (var M = [], A = 0, y = r.length; A < y; A++)
                    T(E[r[A]]) && M.push(r[A]);
                l.removeChild(u),
                l.removeChild(h),
                e.push({
                    key: "js_fonts",
                    value: M
                }),
                t(e)
            }, 1)
        },
        pluginsKey: function(e) {
            return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.push({
                key: "ie_plugins",
                value: this.getIEPlugins()
            }) : e.push({
                key: "regular_plugins",
                value: this.getRegularPlugins()
            })),
            e
        },
        getRegularPlugins: function() {
            for (var e = [], t = 0, i = navigator.plugins.length; t < i; t++)
                e.push(navigator.plugins[t]);
            return this.pluginsShouldBeSorted() && (e = e.sort(function(e, t) {
                return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
            })),
            this.map(e, function(e) {
                var t = this.map(e, function(e) {
                    return [e.type, e.suffixes].join("~")
                }).join(",");
                return [e.name, e.description, t].join("::")
            }, this)
        },
        getIEPlugins: function() {
            var e = [];
            if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject"in window) {
                var t = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                e = this.map(t, function(e) {
                    try {
                        return new ActiveXObject(e),
                        e
                    } catch (t) {
                        return null
                    }
                })
            }
            return navigator.plugins && (e = e.concat(this.getRegularPlugins())),
            e
        },
        pluginsShouldBeSorted: function() {
            for (var e = !1, t = 0, i = this.options.sortPluginsFor.length; t < i; t++) {
                var a = this.options.sortPluginsFor[t];
                if (navigator.userAgent.match(a)) {
                    e = !0;
                    break
                }
            }
            return e
        },
        touchSupportKey: function(e) {
            return this.options.excludeTouchSupport || e.push({
                key: "touch_support",
                value: this.getTouchSupport()
            }),
            e
        },
        hardwareConcurrencyKey: function(e) {
            return this.options.excludeHardwareConcurrency || e.push({
                key: "hardware_concurrency",
                value: this.getHardwareConcurrency()
            }),
            e
        },
        hasSessionStorage: function() {
            try {
                return !!window.sessionStorage
            } catch (e) {
                return !0
            }
        },
        hasLocalStorage: function() {
            try {
                return !!window.localStorage
            } catch (e) {
                return !0
            }
        },
        hasIndexedDB: function() {
            try {
                return !!window.indexedDB
            } catch (e) {
                return !0
            }
        },
        getHardwareConcurrency: function() {
            return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown"
        },
        getNavigatorCpuClass: function() {
            return navigator.cpuClass ? navigator.cpuClass : "unknown"
        },
        getNavigatorPlatform: function() {
            return navigator.platform ? navigator.platform : "unknown"
        },
        getDoNotTrack: function() {
            return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown"
        },
        getTouchSupport: function() {
            var e = 0
              , t = !1;
            "undefined" != typeof navigator.maxTouchPoints ? e = navigator.maxTouchPoints : "undefined" != typeof navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
            try {
                document.createEvent("TouchEvent"),
                t = !0
            } catch (i) {}
            var a = "ontouchstart"in window;
            return [e, t, a]
        },
        getCanvasFp: function() {
            var e = []
              , t = document.createElement("canvas");
            t.width = 2e3,
            t.height = 200,
            t.style.display = "inline";
            var i = t.getContext("2d");
            return i.rect(0, 0, 10, 10),
            i.rect(2, 2, 6, 6),
            e.push("canvas winding:" + (i.isPointInPath(5, 5, "evenodd") === !1 ? "yes" : "no")),
            i.textBaseline = "alphabetic",
            i.fillStyle = "#f60",
            i.fillRect(125, 1, 62, 20),
            i.fillStyle = "#069",
            this.options.dontUseFakeFontInCanvas ? i.font = "11pt Arial" : i.font = "11pt no-real-font-123",
            i.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15),
            i.fillStyle = "rgba(102, 204, 0, 0.2)",
            i.font = "18pt Arial",
            i.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45),
            i.globalCompositeOperation = "multiply",
            i.fillStyle = "rgb(255,0,255)",
            i.beginPath(),
            i.arc(50, 50, 50, 0, 2 * Math.PI, !0),
            i.closePath(),
            i.fill(),
            i.fillStyle = "rgb(0,255,255)",
            i.beginPath(),
            i.arc(100, 50, 50, 0, 2 * Math.PI, !0),
            i.closePath(),
            i.fill(),
            i.fillStyle = "rgb(255,255,0)",
            i.beginPath(),
            i.arc(75, 100, 50, 0, 2 * Math.PI, !0),
            i.closePath(),
            i.fill(),
            i.fillStyle = "rgb(255,0,255)",
            i.arc(75, 75, 75, 0, 2 * Math.PI, !0),
            i.arc(75, 75, 25, 0, 2 * Math.PI, !0),
            i.fill("evenodd"),
            e.push("canvas fp:" + t.toDataURL()),
            e.join("~")
        },
        getWebglFp: function() {
            var e, t = function(t) {
                return e.clearColor(0, 0, 0, 1),
                e.enable(e.DEPTH_TEST),
                e.depthFunc(e.LEQUAL),
                e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                "[" + t[0] + ", " + t[1] + "]"
            }, i = function(e) {
                var t, i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return i ? (t = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT),
                0 === t && (t = 2),
                t) : null
            };
            if (e = this.getWebglCanvas(),
            !e)
                return null;
            var a = []
              , r = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
              , n = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
              , o = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, o);
            var s = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            e.bufferData(e.ARRAY_BUFFER, s, e.STATIC_DRAW),
            o.itemSize = 3,
            o.numItems = 3;
            var l = e.createProgram()
              , h = e.createShader(e.VERTEX_SHADER);
            e.shaderSource(h, r),
            e.compileShader(h);
            var u = e.createShader(e.FRAGMENT_SHADER);
            e.shaderSource(u, n),
            e.compileShader(u),
            e.attachShader(l, h),
            e.attachShader(l, u),
            e.linkProgram(l),
            e.useProgram(l),
            l.vertexPosAttrib = e.getAttribLocation(l, "attrVertex"),
            l.offsetUniform = e.getUniformLocation(l, "uniformOffset"),
            e.enableVertexAttribArray(l.vertexPosArray),
            e.vertexAttribPointer(l.vertexPosAttrib, o.itemSize, e.FLOAT, !1, 0, 0),
            e.uniform2f(l.offsetUniform, 1, 1),
            e.drawArrays(e.TRIANGLE_STRIP, 0, o.numItems),
            null != e.canvas && a.push(e.canvas.toDataURL()),
            a.push("extensions:" + e.getSupportedExtensions().join(";")),
            a.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))),
            a.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))),
            a.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)),
            a.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes" : "no")),
            a.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)),
            a.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)),
            a.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)),
            a.push("webgl max anisotropy:" + i(e)),
            a.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),
            a.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)),
            a.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)),
            a.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)),
            a.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)),
            a.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)),
            a.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)),
            a.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)),
            a.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),
            a.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)),
            a.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))),
            a.push("webgl red bits:" + e.getParameter(e.RED_BITS)),
            a.push("webgl renderer:" + e.getParameter(e.RENDERER)),
            a.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)),
            a.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)),
            a.push("webgl vendor:" + e.getParameter(e.VENDOR)),
            a.push("webgl version:" + e.getParameter(e.VERSION));
            try {
                var c = e.getExtension("WEBGL_debug_renderer_info");
                c && (a.push("webgl unmasked vendor:" + e.getParameter(c.UNMASKED_VENDOR_WEBGL)),
                a.push("webgl unmasked renderer:" + e.getParameter(c.UNMASKED_RENDERER_WEBGL)))
            } catch (d) {}
            return e.getShaderPrecisionFormat ? (a.push("webgl vertex shader high float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision),
            a.push("webgl vertex shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin),
            a.push("webgl vertex shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax),
            a.push("webgl vertex shader medium float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision),
            a.push("webgl vertex shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin),
            a.push("webgl vertex shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax),
            a.push("webgl vertex shader low float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision),
            a.push("webgl vertex shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin),
            a.push("webgl vertex shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax),
            a.push("webgl fragment shader high float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision),
            a.push("webgl fragment shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin),
            a.push("webgl fragment shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax),
            a.push("webgl fragment shader medium float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision),
            a.push("webgl fragment shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin),
            a.push("webgl fragment shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax),
            a.push("webgl fragment shader low float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision),
            a.push("webgl fragment shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin),
            a.push("webgl fragment shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax),
            a.push("webgl vertex shader high int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision),
            a.push("webgl vertex shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin),
            a.push("webgl vertex shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax),
            a.push("webgl vertex shader medium int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision),
            a.push("webgl vertex shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin),
            a.push("webgl vertex shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax),
            a.push("webgl vertex shader low int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision),
            a.push("webgl vertex shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin),
            a.push("webgl vertex shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax),
            a.push("webgl fragment shader high int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision),
            a.push("webgl fragment shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin),
            a.push("webgl fragment shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax),
            a.push("webgl fragment shader medium int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision),
            a.push("webgl fragment shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin),
            a.push("webgl fragment shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax),
            a.push("webgl fragment shader low int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision),
            a.push("webgl fragment shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin),
            a.push("webgl fragment shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax),
            a.join("~")) : a.join("~")
        },
        getAdBlock: function() {
            var e = document.createElement("div");
            e.innerHTML = "&nbsp;",
            e.className = "adsbox";
            var t = !1;
            try {
                document.body.appendChild(e),
                t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight,
                document.body.removeChild(e)
            } catch (i) {
                if (e) {
                    document.body.removeChild(e)
                }
                ;t = !1
            }
            return t
        },
        getHasLiedLanguages: function() {
            if ("undefined" != typeof navigator.languages)
                try {
                    var e = navigator.languages[0].substr(0, 2);
                    if (e !== navigator.language.substr(0, 2))
                        return !0
                } catch (t) {
                    return !0
                }
            return !1
        },
        getHasLiedResolution: function() {
            return screen.width < screen.availWidth || screen.height < screen.availHeight
        },
        getHasLiedOs: function() {
            var e, t = navigator.userAgent.toLowerCase(), i = navigator.oscpu, a = navigator.platform.toLowerCase();
            e = t.indexOf("windows phone") >= 0 ? "Windows Phone" : t.indexOf("win") >= 0 ? "Windows" : t.indexOf("android") >= 0 ? "Android" : t.indexOf("linux") >= 0 ? "Linux" : t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 ? "iOS" : t.indexOf("mac") >= 0 ? "Mac" : "Other";
            var r;
            if (r = "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
            r && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e)
                return !0;
            if ("undefined" != typeof i) {
                if (i = i.toLowerCase(),
                i.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e)
                    return !0;
                if (i.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e)
                    return !0;
                if (i.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e)
                    return !0;
                if (0 === i.indexOf("win") && 0 === i.indexOf("linux") && i.indexOf("mac") >= 0 && "other" !== e)
                    return !0
            }
            return a.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || ((a.indexOf("linux") >= 0 || a.indexOf("android") >= 0 || a.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || ((a.indexOf("mac") >= 0 || a.indexOf("ipad") >= 0 || a.indexOf("ipod") >= 0 || a.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || (0 === a.indexOf("win") && 0 === a.indexOf("linux") && a.indexOf("mac") >= 0 && "other" !== e || "undefined" == typeof navigator.plugins && "Windows" !== e && "Windows Phone" !== e)))
        },
        getHasLiedBrowser: function() {
            var e, t = navigator.userAgent.toLowerCase(), i = navigator.productSub;
            if (e = t.indexOf("firefox") >= 0 ? "Firefox" : t.indexOf("opera") >= 0 || t.indexOf("opr") >= 0 ? "Opera" : t.indexOf("chrome") >= 0 ? "Chrome" : t.indexOf("safari") >= 0 ? "Safari" : t.indexOf("trident") >= 0 ? "Internet Explorer" : "Other",
            ("Chrome" === e || "Safari" === e || "Opera" === e) && "20030107" !== i)
                return !0;
            var a = eval.toString().length;
            if (37 === a && "Safari" !== e && "Firefox" !== e && "Other" !== e)
                return !0;
            if (39 === a && "Internet Explorer" !== e && "Other" !== e)
                return !0;
            if (33 === a && "Chrome" !== e && "Opera" !== e && "Other" !== e)
                return !0;
            var r;
            try {
                throw "a"
            } catch (n) {
                try {
                    n.toSource(),
                    r = !0
                } catch (o) {
                    r = !1
                }
            }
            return !(!r || "Firefox" === e || "Other" === e)
        },
        isCanvasSupported: function() {
            var e = document.createElement("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        },
        isWebGlSupported: function() {
            if (!this.isCanvasSupported())
                return !1;
            var e, t = document.createElement("canvas");
            try {
                e = t.getContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
            } catch (i) {
                e = !1
            }
            return !!window.WebGLRenderingContext && !!e
        },
        isIE: function() {
            return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
        },
        hasSwfObjectLoaded: function() {
            return "undefined" != typeof window.swfobject
        },
        hasMinFlashInstalled: function() {
            return swfobject.hasFlashPlayerVersion("9.0.0")
        },
        addFlashDivNode: function() {
            var e = document.createElement("div");
            e.setAttribute("id", this.options.swfContainerId),
            document.body.appendChild(e)
        },
        loadSwfAndDetectFonts: function(e) {
            var t = "___fp_swf_loaded";
            window[t] = function(t) {
                e(t)
            }
            ;
            var i = this.options.swfContainerId;
            this.addFlashDivNode();
            var a = {
                onReady: t
            }
              , r = {
                allowScriptAccess: "always",
                menu: "false"
            };
            swfobject.embedSWF(this.options.swfPath, i, "1", "1", "9.0.0", !1, a, r, {})
        },
        getWebglCanvas: function() {
            var e = document.createElement("canvas")
              , t = null;
            try {
                t = e.getContext("webgl") || e.getContext("experimental-webgl")
            } catch (i) {}
            return t || (t = null),
            t
        },
        each: function(e, t, i) {
            if (null !== e)
                if (this.nativeForEach && e.forEach === this.nativeForEach)
                    e.forEach(t, i);
                else if (e.length === +e.length) {
                    for (var a = 0, r = e.length; a < r; a++)
                        if (t.call(i, e[a], a, e) === {})
                            return
                } else
                    for (var n in e)
                        if (e.hasOwnProperty(n) && t.call(i, e[n], n, e) === {})
                            return
        },
        map: function(e, t, i) {
            var a = [];
            return null == e ? a : this.nativeMap && e.map === this.nativeMap ? e.map(t, i) : (this.each(e, function(e, r, n) {
                a[a.length] = t.call(i, e, r, n)
            }),
            a)
        },
        x64Add: function(e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
            t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var i = [0, 0, 0, 0];
            return i[3] += e[3] + t[3],
            i[2] += i[3] >>> 16,
            i[3] &= 65535,
            i[2] += e[2] + t[2],
            i[1] += i[2] >>> 16,
            i[2] &= 65535,
            i[1] += e[1] + t[1],
            i[0] += i[1] >>> 16,
            i[1] &= 65535,
            i[0] += e[0] + t[0],
            i[0] &= 65535,
            [i[0] << 16 | i[1], i[2] << 16 | i[3]]
        },
        x64Multiply: function(e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
            t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var i = [0, 0, 0, 0];
            return i[3] += e[3] * t[3],
            i[2] += i[3] >>> 16,
            i[3] &= 65535,
            i[2] += e[2] * t[3],
            i[1] += i[2] >>> 16,
            i[2] &= 65535,
            i[2] += e[3] * t[2],
            i[1] += i[2] >>> 16,
            i[2] &= 65535,
            i[1] += e[1] * t[3],
            i[0] += i[1] >>> 16,
            i[1] &= 65535,
            i[1] += e[2] * t[2],
            i[0] += i[1] >>> 16,
            i[1] &= 65535,
            i[1] += e[3] * t[1],
            i[0] += i[1] >>> 16,
            i[1] &= 65535,
            i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0],
            i[0] &= 65535,
            [i[0] << 16 | i[1], i[2] << 16 | i[3]]
        },
        x64Rotl: function(e, t) {
            return t %= 64,
            32 === t ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32,
            [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
        },
        x64LeftShift: function(e, t) {
            return t %= 64,
            0 === t ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
        },
        x64Xor: function(e, t) {
            return [e[0] ^ t[0], e[1] ^ t[1]]
        },
        x64Fmix: function(e) {
            return e = this.x64Xor(e, [0, e[0] >>> 1]),
            e = this.x64Multiply(e, [4283543511, 3981806797]),
            e = this.x64Xor(e, [0, e[0] >>> 1]),
            e = this.x64Multiply(e, [3301882366, 444984403]),
            e = this.x64Xor(e, [0, e[0] >>> 1])
        },
        x64hash128: function(e, t) {
            e = e || "",
            t = t || 0;
            for (var i = e.length % 16, a = e.length - i, r = [0, t], n = [0, t], o = [0, 0], s = [0, 0], l = [2277735313, 289559509], h = [1291169091, 658871167], u = 0; u < a; u += 16)
                o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24],
                s = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24],
                o = this.x64Multiply(o, l),
                o = this.x64Rotl(o, 31),
                o = this.x64Multiply(o, h),
                r = this.x64Xor(r, o),
                r = this.x64Rotl(r, 27),
                r = this.x64Add(r, n),
                r = this.x64Add(this.x64Multiply(r, [0, 5]), [0, 1390208809]),
                s = this.x64Multiply(s, h),
                s = this.x64Rotl(s, 33),
                s = this.x64Multiply(s, l),
                n = this.x64Xor(n, s),
                n = this.x64Rotl(n, 31),
                n = this.x64Add(n, r),
                n = this.x64Add(this.x64Multiply(n, [0, 5]), [0, 944331445]);
            switch (o = [0, 0],
            s = [0, 0],
            i) {
            case 15:
                s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 14)], 48));
            case 14:
                s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 13)], 40));
            case 13:
                s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 12)], 32));
            case 12:
                s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 11)], 24));
            case 11:
                s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 10)], 16));
            case 10:
                s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 9)], 8));
            case 9:
                s = this.x64Xor(s, [0, e.charCodeAt(u + 8)]),
                s = this.x64Multiply(s, h),
                s = this.x64Rotl(s, 33),
                s = this.x64Multiply(s, l),
                n = this.x64Xor(n, s);
            case 8:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 7)], 56));
            case 7:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 6)], 48));
            case 6:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 5)], 40));
            case 5:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 4)], 32));
            case 4:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 3)], 24));
            case 3:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 2)], 16));
            case 2:
                o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 1)], 8));
            case 1:
                o = this.x64Xor(o, [0, e.charCodeAt(u)]),
                o = this.x64Multiply(o, l),
                o = this.x64Rotl(o, 31),
                o = this.x64Multiply(o, h),
                r = this.x64Xor(r, o)
            }
            return r = this.x64Xor(r, [0, e.length]),
            n = this.x64Xor(n, [0, e.length]),
            r = this.x64Add(r, n),
            n = this.x64Add(n, r),
            r = this.x64Fmix(r),
            n = this.x64Fmix(n),
            r = this.x64Add(r, n),
            n = this.x64Add(n, r),
            ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8)
        }
    },
    e.VERSION = "1.5.1",
    e
}();


function get_fp(ua){
    //Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36
    var my_str = ua+"~~~zh-CN~~~zh-CN~~~24~~~1~~~8~~~1920;1200~~~1920;1200~~~-480~~~1~~~1~~~1~~~1~~~unknown~~~MacIntel~~~unknown~~~Chrome PDF Plugin::Portable Document Format::application/x-google-chrome-pdf~pdf;Chrome PDF Viewer::::application/pdf~pdf;Native Client::::application/x-nacl~,application/x-pnacl~~~~canvas winding:yes~canvas fp:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9AAAADICAYAAACwGnoBAAAgAElEQVR4XuzdeXwV9b3/8decJRuQsIR9X0T2XXFXelu7aK22V22v2roRrEt/11qrrW2R7q1t7XUniNKqva16ra1bpbbY2qooO4ggIBCWsIQlLIHk5Jz5PT5zziSTcAJJSAKR9/dxe4WTme985zkn/POez+frcJwPF7cnMBIYCgwC+gDdgXygbx3LXw+UAMWA/XkN8D6w1MHZ5J/j4rYBhgHDA//tAGQDWan/2p/9/9mpB2r972Dq77uA94Dl/n8dnP1V63Ob9j5wqu/jOH+EWp4EJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBViHgHG+rdHEtKP8P4GzgdKB3E69xL7APyAQ6NvHcVdNZWv9SLjtfHUL5/NNou+s82nl3ZLF/04wNwFvAG8DfcBy7ZL2GW4BbrwM/Ygc5hRx33/f6EE+dSujqfmTE3RGdK92crnZOxCnbum33spLTSyl3ppEIzuOC43BiPuP6eOoYCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCdQlcFwEii7uacAlwGdTleat8om9DfwReCFV7p72JsYAZwJnpF4RaLrXAyxAt0v/EcexpdQ5FKC3nq/Xqls65mafkv+5rM4dLmrTtdeYSG5+Pm6Iyr3bS/Zv3bRk/7Zdf/5w4ZY/Tfr17t2t5660UglIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQkcnwLHLEB3ca0W+2rgOmDI8clz5FVZn/hZwExgxZEPP/QIe3XgAuAiYFRjJkh7ji3FljQLx7El1hgK0JvMuVknmnd3vyF9h0S+0WHsxGvDgy90YATQPnVNy8tXEP/gJXYufOvxjR8e+MW4bxfZ9gEaEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpBAIwUODdCnTo2wuec1hBJn4DrDcZ3NOO7rQCGFU8oaeZ2q01xc28/8JmBKQ+faS4xn+ZC32cZoOvF5+vEI73MdJ9Obtg2d7rDH76eSM3iexziPzmTxaV7hJT5FP9p55y0FHgSmN9lV98HAV2Dyp+CL7ere3b2h15vxt0VsLHmL73/xRv/UxgbozzGW+/kYc/hlQ1dxzI7fQxa52Db10Gwt3G+5L5eDWf9NpPIPPHzjyqa42b9/p//Jo0Y6D3Q664yP0+PLxCvbEw67ycbsrgshiMchHNkDW35P6Zv/+vua5eU3j//u+nq38m+KdWoOCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCXyUBGoG6Dc90InKyNO4zseAh4FVOO5puM6ngWKisTN48OYdjQFwca2++nbgysacb+fcyTs8zkquZjAj6UiUEF/kbzzKOVzXxEXsuyinI7/hn1zkBehDeZoPuJwD5HEP8GRjb6LO86yi+GngcsjKSzazt/99yTa8PoqLzXgNsjPgynNsyffgOEsaG6A/ylncxcVs5RtHsaCWO/V+JvE8Y/gb93oXbbYA/foZZxNK/BPH/S7Tb/jh0d7hy7cMyh0xovzXvc8deg2DL2b/zgO898Z8BoweRn6fvt4O5zvWr2f1omUMP2csbTvlwuqXKJ6z5Im5yzt87ZJfL1I796N9CDpfAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUjghBSoGaBPLnwYx/08cC6FU6o7kn/1oQHEw2tSVegNqhx3cTsDU1NV50eFPJpn+QID+B7jvHkqSTCfEsaST4aV5DbhSBegX8nlPEleE14lOFUgQA9ew7p2fyXV7N6a3jd0VAfo/pkPbpvi3GQPpaGjtQXo3+Zi5tK/+QN0XIfJMybguO8dbZcGd+rU0OKc314xfHTG45FRZ4XpkMsH81by53v+yhmXncZpl58FDsx9+t/8+3/f5KLbPs7giUNg934ql/w78f7i8utWvDvuicueeSbe0Oer4yUgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCRwogtUB+jXz+hFKLEB17mGGQW2rXfNMeWR63CdcwklvoXrzCQR+i4zCt71DpryyOdwncns6vB5nrmswvusYPqPzv93r1NueX/EmU8lVuV8nJ78ymt8bhufD+YWRnA7b/M86ziDrtzMCM6mW9rnYZXniyjhVTYygFxOIpdP04f/YhBX8Xce5mz6p1qrv8cu7uJd3mIr3cjmc/TjLsaSSdib+3Je4xL683c28SfWcwvD+Q7j+CfFTGM+y9jFuXTnm4zmFP7oVaDPJosfetXhVhJuHbI3gRdyjwH6BNZs243bewf280qgJ3AqkANsAD4ABgJLgAPAycDg1M/TBejvAUXJOXp1Su4Yb2H6oMAld+yD/3sbPtwKHdvBpOFQvAva58A5w8AP0C+cAL99HS6cQO7PuvIj4GbAQvHZDONenuY6vsx3eYmf8SkveB5GMXfwFz6FrSN5rFWgP8VMvs8FrKQbZ7Ka+/gDvdhFnBCPcA4vMIqF9OHjvM9VvF11fu2HewXXcS4fUMAbVT96iok8w3ie5RHCuDzIefyW01hPJ05hnbe+iazlPXpwG//JN5nNx1K7z7/CCP6Hj/EjnvfWaWs4QJQzWMP5LOe2wtcO3bLArmzf/XD8l7jOGV6nBcd9ANcZhOusZEbBUxRM/6a3wMIpP69aaPI7fwmFU67mlvsyKc/8o/c7UZ65guwDz+C4h77R4TpXUjjlkD3pgy5v3np6dq++G5/qfWqHS+jSDzo4vPfWRubMXMSoTw/izK+M9QL0N3+7iEUvfcDHrh7N8DP7wG4Xtm+g6J0dLyx5r/MXP1s4/6i3WzjR/3HU/UtAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCZx4AtWB4pRHPoXrvEI43pGHb9xVN4XrUFBoqe7vKJxyh3fclEee88JE1zmPGQX/WJy3fdzods/Nv3/jmWQRZjL/ZBgd+DZjWcZOfsoiLwg/k65cTD+eZBWvsYltfNk7vvaYzUa2UMbtzK0652Tae63VB/J7lvKfjKAjK9jttVq/lAFMYSjbOMB/8xan0JkX+ZQ3bS6PY3upf4JeXERfb0/zLmQxkee5gWFeKL+KUqYyj43s5xQu4l2yUu3Vs8Grfu8ErAcWA9bdvjdgeeX/AV2BYam/LwB6AOekgvV/poL3sUA5sAgYAJwJ1A7Q5wF2/ieA/tUkttW7BenXWv5eAd96Cnp2gs+Oh3gC/jgXNu6Ej4+ES0+vDtCvPAd+9Bz06ABvW4d+OB+HxfyEy1jEjbzOUKbRjoP8mOcZSxEvMJqf8Ule5X+8ANoC9MlcxWC2cjuz2UsWU/ks1/Am/8MfuJeP83Uu5RGeYhDb+DOjuY+PUcztdGPPIc/1/3E5tq96Ed/C8Tb3hvHcxXA281se9+a2OW9mDqexlmcZxxOcxnx+xDiK+CpXeOcvZRqVhBnCNCbzL37MH/kDE3iaCayiC3fxMgPZzlmFaw4N0K+d2Y5I5WocdyWJ0Pdx3EzgV6k3G75D4ZQfUTD9KSBO4ZQvV91EwfSbvF0FCqf0pmC6vSGxH9f5BLvb/5OOO79YdZzrZAAzvLcn2uwfw71ftzcn6hxvTB3QZ3Dnva93GdmxP3l50CnCqiW7ePWxD5h4UV/GfyH5wsaCPxbx1vPrOf+akzh5dEfYWQmle9m+ePuGNSX555w+bcW6E++fM92xBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABI5OoDpQLJhurdkfoXBK+ird4HUmF/4Ax/0vCqcMTFXfHkylvbPdwoJ1r7Dhwc/wSngDV/AXNngB+nw+zziSPchP5g8UU8YOvuLtY17CQTrzW17gU1xYo6K75s3ZeQUM5TZsO3X4kD01AvQr+LtXSb6e/yJkZbrgBfOf4CX+wWc5h+5egJ5HBmv5EpFU2/fPM5uVlPIel1Zd8CIW8AIWYl8EVQG6BeNnBRb1YqrS/GJgG2CZpQXs/qblVo3+Vqps3KrPLUC/IFWZbtNYgG5V+bYtfGkqpL8MWAYsBy5MBfBpHnIb4D+XQPRtuOfKZMW5DQvPf/Bs+gD9zZXwm38At6YC/pOAb/AdfsAVVHoBugXjP/deBEiO8/lvysjgX/y8KkD3A3X7+Q+4gAeY5IXkFoj/htNZxXfpyh4SOPyQC7xKdKsCrz3m0ZdT+DZv8TNO40PepzvDuJvXuJeRbKIrv/DC/G/xStWpFrBbgP+/POpVl5/GnfRkN+VEvED/X9xDhlf9D/Vq4Z4Mwh8glOjKI1+1h2gV6acRStiDa3iAPqPgtRr3ObnwPhz3auLhccy8fvWRfl1fv3P4KcN6Fv2188kd88hrB3khdu+Js+Dfuxh6Snu6D7KXOKB49QGWv7ObcWe2p0P7CJQmoHQf21eU7PtwS7dPnPaj1W8f6Vr6uQQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkUFMgWIF+Oa7ze7pvjjJtWjKBrGvc8PBYEqEFJELDCCWs7/rvrYV7zzk5szauvqLDLfybxezw2p8/ygq+zlvs4Zqq2a7hda8K/Fmvujo5evMUdzKGmxhe52WPFKDbHNae/T6sE3dyHCRONjO5l9P5b0Z6Abpd4ydea/Xqa1/OQH7Bad4HBV7JsGWpz9cK0P1qc/9Mq0CfC0zG66uNda/f6nUBt4LkZJv2jcAVqRbulsla+bjP7l/DAnQ719rE20sG1uV7IjD6CN/X16H3Trj/8/C51KFWyH37EzBx0KEV6OUx+NrjgBVUW5hvBdXWZt6q0LvxNNOqqs39C/+cT3IHnyfODTzGmV4Fejk3VYXU/2Aw53Eb273/tfP+vI12XMp8LmIxF7KU9l51fvoxnLu9gN0q2KdxoRfSr+Pb/JOT+Bhf51r+TR92Vp38V4axno5s4E7vM6swH8wPvD/beX3ZUXVsvQL0yYWP4rinUDilGnvq1AjFPeyiP2twBXowQJ9ceDWO+ziO+2mm3/CXIzxM78ev3Dn8lFGd177WY0j73FhWexIZFYQ6ZeBkZRAKgeMmK/VdBxJxcA/GqNwRIxLLIFq+m+IVO/ct39zz/I//YrV92TQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIIEGCFQH6Dc8fCqJ0FwcdwzTb7BkuOaYXGjp8a3Eohcx65qDFEy3kuKHcJ3OnXdmdlv53BdP6ujOOsMqu60d+jTGey3RLUC3Pcm3clXVfNfzT/ZQwdN8vOoza8X+dUYeVYDelSf4qlfDPL5q3gQu7ZnlhfPWQt4C9Ac5i6uw6uvksM++wWi+wjhvlckdua3l+O9rBeiXAJ0DLrYfuh19PbAXeC7Vot1aurdPfWZV7H6AblvGVzskg3I7x34eSwXoVlreHbBiZauI73CYx2nV5BYYfz6Z4Vum3N+F259MH6DbTL9/E+ZYlmvbed8H/Bb4N3j7z0/jeX7K51hbdc1CzmYKV1LBjV51ue0tvpVvVP38TQZyJt/0AvR89nmV4G9wEn9huNdGvZRs/uK90nBoBbpN8mv+g+9xkXf+IH7otWD/Hi9i+5l/hlu81vKd2VfDIITrHWPjdQYzidu8P/uV7P7B9QrQrT276/RgRsGk6ot42xRs8YDqbuFuW8jfcUgLdz9AL5hub0C8jePeyfQbflbf38m/3jGgT//2Jf8YMNjpt3BzL9bv7UPvbnvIbbOHaDQGoURyqkSIg+URSvfksXFLJkO7bGJ4962seT+xYc3+7ud+8ocrqx9ifS+u4yQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCRwggtUB+jJqtv3vJ7ihQWXWq1rlc1Vv21D9oEVOO57TL8huZn45MLvWYfv7C2h3k++8rGsz1f273I+L9OHtsxkBcVcSTdyWjRAt+vv4KDXLt4fCylhHM/xHOdzCf3SBujn8Gf2E2IHF3o7myfHSsAC6mALd6taHxP4yvwtVS1+eaqi287+UqCFuz9HQwJ0W3tH8AJiq9y20N625U437HFZ+G3zt0lut379Vtjyp/Qt3G0Kv8U7cwDLjP+fV6fvB+h5vMBfeDFViw+XM5l59GMNd3nV4YcL0J9iolctfgkLvcXuI5PRfM/b5fxZpqe9gy3k0p17+Dav8GM+zWq+4+1XvpKuDOH7PMZvvD3W/TGLM7x5bV/0reQyiu/xRd6lgggvMpLF/ICOXvV/vVu4TwXu5kB2W574cvLE62eMIpSwl0iSLdynPPJjXOdzFE6pbo8wuXA2jjs0bYB+7cweRCoX4rivM33KF2v8Lh3hH5ynbz09u3/bdb8bNWDrxSsPDOa96K106z+CLHc3TmIfbsyeFRDOIu5ksz+Ry441/+aUrBn0y9zE4lWdXize2vPyzxbOr7vs/wT/R0+3LwEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIIG6BGrud14w/XzgVRz3j8TDPycRKiJSeSaOex2u80lgFIVTbNNuuOHhERSFlvKyBaXX0oYI97OMr/Emn6AXs/mMd1hLVqDPZiOf5GUe4Eyu4WRvb3VrF7+OfbzPZWQQShugf5s1/AQLw//DSrhTleOzgV21AnTbf9ruy6rCN1nDbeBM8NrOz0/tW/4FSzfBq+K2Nuk2rEV7EVCfCnQL4/NS4bntRd4JsHcWQmmeoXXafzbVEt72hbeu4x/A0Aj8v0Ew5XSY8RpkZ8CV51SfP+UOYGBqfdbO3UayAj1ZSf9rXmYzMMyrAr+P33MLc44YoD/LOL7JF7x9yIewhRV04yxu9wLuQp6s87fwYm7kT4zmPD5gDr+sOs6uvYbO/IpnOJM1XlX7l7iel7mf81nOBdzMBjoyjx+RIMQ47mIoW/gjD+PgetXtv+QTvMJ99GMH7QrLa37f7UpffWgA8bCVx99DpPL7uE6UeHgGYA8yGaBfP+NsQol/4jpXUhmZTTRmG9U/4PXnL5zSm4LptgH9flznE2QdfIOKjNdxneEkQmcRSiRDeRuRyq1URqztwjTvd2r6DdaeoMZwp04NvXbwf68c3mXDYxmdMsNzNw4m1nESXfsMpm2HroSjWbiJBBUH9rJ3ZzFb1q2kY8U/mdi3iL1bDrpLi3teX7pu7G8ue+aZuP7Zk4AEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEGiZwaKBYMH2ctwU42H+Tw3HfwHX+m8IpC/yPXNwLhvPMi/1px4tewAsr2M1QnmYm53ItJ3ufPcZKvsU7TdLCfTjPcD1DuJWR3twfsgdr/b6U/2SEV7UNT7KKG/mXt8e6jTPpxhNMwtZpw9q8/5LTuDLVwv0l4ELvJ4uAdwJ6FoxbdXewAt32Vq+uhk5Wo09Ihdu23/lfAev8bcP2Mh+b+swC9A2p+dO1cA/uge4H6DaHv0e6PQq7TrpRDlixtB3bFhiSvE7vbvDwqbD5NcjJgivOqj55iv3Z9j//ibdzeHL4Afpvki3hU1638Vd+ynNESHh7oH+LS2q0cH+bAZzOHV4L9hwquIkv8X+MYy9Z3qzjKPIC7eA+5rXvwsJzC9Gf4DGu9PaUTw6rML+OL/NS6nnbZ9N4wWvf7u/NvoxpDPfCflhIb8bxHR7gf7mJ11lLPhfzVZbQiwfts8LXD/2+24kF0y8A/rfqpl1nKo5ru8o/l2rhHgV+BXwldczy1NsTl1A4ZSC3/iqb/W3KvAA9HN9BIlT1e1LjXl3n8ziuvRFhv18/pXDKt9I90TU/7ZBXcbD8fzp3Cn/lQNjl34v2sasUwuEIkUgE13WprKwgnnDplg9njssjcsBl27bYU1kdMm/uf+vu3XV8WfSxBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCRwGIH0gaKdYKHgwaw+xMNbKJxSGpzDxU1Wqh/jsYpSBvOHGgG6LSmOyzr20oFMOtbZ/hysxtzK6quH7S9tFdgWtqer+LYj/WMsrLZK89rDOmfb53W1XW9KNMtJP/QaA0AkNbEF6haCW0g+DH4I3FXrmlOszbztAf+DwA/8AP27wPbUXu+7eZUK7GE3ZNg+6KvpQif20c3bS/7oxm5y2Eo7+rKTrNSLEY2Z0Smk7u/71KkhintY+4FiCqeUUTDdWgokA3R/JIPyzhROsXYCjR8F02fiOi8yo+CPdU2y+ccM2V+Z9WD7DpkfOxCNsra4gm07YpQfjGN3kZ0doXuXDPp3jxI5UMHu7eX/aJt58Mbu38bCfQ0JSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSKARAnUHinVM5uKeBrzViGs16SnL2MlDLPcqzrfzZTLThtl1X/Jt4PQmXdGxmMy6dP8e6AuMAKyl+7JkG3dvL/Zk1b3XjPznwADrDF8Ot1rAbq3b/RbzdlAwQLdq9uphD9seemsfhw3Qa99cugC9KQAKpt+WKv8/3QvqDzOKf5wxbH8s9M1wVuQrOe0yKCfEwUoHxwL0CGQRZ29pjHh5+RMZORU/73O79/A1JCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBRgo0KEB3cS2p/UcqsW3kJZvmtIt4lf3EuJHhfMHbt7z+Yz1wLmD/bf3D2pdb23OrGreRm9qXvXfNWxuayswrVsFjzwHfT+2z7h/WBfim11kcSmqce9w89KN8WA0M0F9OVYk/dJSXrXn69TOG0nPjKqZNs7cdjjh23Uv7vWXRixNu6KKEExoNjrWAx02wMxyKL8ZJvOg4sef6fotdR5xMB0hAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAocVaGiAbiXLZ7d203OAN1r7TRyyfmvdbq3j/VbuaW7QMvLngVkNeuzeRPbQg/XqrZGvQQH6MbpBF6/A3A1e3p1K6K09ZPbvQtdohK72s1glW9duY+vpp1PhXIa1ItCQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgASOUqDeSaqLWwhMPsrrHfPTC4AZx3wVx3gBFzrQo+FrsIdvX4LWOlpDgN5abbVuCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCXwUBOoVoLu4U4BHWvsNTwduaO030STrd+DTQK0u7/WZ2r4E9mVojUMBemt8alqzBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABFpO4IgBuos7DFiS6g/ecitr4istB0aBel0HXe8DbmkwtO3dPRrHMVINCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAh8ZgfoE6K8C57f2O/4kMLu130RzrP9HwLcbPPFsHMdINSQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQl8ZAQOG6C7uDcD97f2u32gUYXWrf2uG7D+/wG+1oDjk4feguMYrYYEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBj4RAnQG6i9sZWA3ktuY73Q4MAva05ptoibXPBK5t0IWMdBCOY8QaEpBACwi44OACd5P8t/tu7284yU81JCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEjlLgcAG6VRffdJTzH/PTrYT+wWO+ilaygD8AlzVorQ/iOEasIQEJNJ+A4z5NaOXek3OyMkJts7Irs3M6Zkcr4olQJEbFvp0Hy2Oxyn39KjrtZ8r8SgeF6c33KDSzBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACH3WBtAG6izsKWNzab34JMLq130RLrt96DfwZOLdBFx2N4xi1hgQk0MQCU6cSurZrn7zsvER++wEd20X7jnXIGwnR7skrxUqhbAUULWDH+g1lsd3lJW+8smXnZc8Qb+KlaDoJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkcEII1BWgPwFc6Qu4uOxnBwcoJUY5LgkiZBAli1y6EiHzuMS6CniywSvbB+wA7L82coAOwF4gCnRr8IxNe0IxUAnkBbrr72669Q0GXgEG1HvVT+I4Rl3nuHoh7XMitMMh9tAIttR75iY68KtL6OA4tK3YT8Wjp7G1iaat1zTXL6VrBmS4u9n38NnsqtdJJ85B9u/Pcdd6/Oq1ZOXsw7awoPMINk1zSByLRzJn6nmRod3e79hxWKee0dEfD5F3PjAk9btv/xbZiAFlQBGUzSG2dDZ7ly/ftnNfx20nfW11+bFYt64pAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABFqzwCEBuos7EqiqKN7LNnaxEQvR6xrZ5NGZgTipbXmPB5ClgJXRN2xYEPV+rVMsqLIQvRQIA2MaNmWTH70QvDyvE9AvNbttVd+E6/sC8GyDFj4KxzHytKNgHgMTDu3dBImZp2A30KJj8iIGu3HaJSqpfGxiy3ZWmPwOY9ww4coYe2adxqoWvfHj+GJXvE1u2wz6x3L48LEh3tspx824aS6dyiPJX67STJY+M4KKll7c1KnnRSZ3WtKty/COXaJn3+AQnZj6dygGMQvNAwG690f/72tgwX3sWfh+6YINHTdOmrbuYEuvXdeTgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAq1ZIF2A/ggwxW5qOx9SFiiaDXm15jk4hIlxkBgHqu49gxy6MeS4CdFvAKY3+MmsDFSeW1V9m1RoZfleEwbUDV5X8IQWCNDtcj8E7qr3QqfjOEaedihAV4Ae/GIUzCMn4TDUPku04QMF6DV/bVxw1v6oS5deI8M9o6df6pB/lldlXlJUQjSaQ15+fiAwh7KyEkpLSsjvk080mgdla2Dp79iycMOOFVvGbJw07UTmJ1sAACAASURBVHVrWaEhAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCRQD4EaAbqLa8nMdjvPKs93sqFqii4MwirNg6OScop5n0Rqu11r596BXvW4bPMeUmKtlxt1CSuitmLT2pXm9qKAFXLa57ZR+LEcLRSg2y2+CFxQ73vtjOMY/SFDAboC9OCX4qrFtMms9HqRH5cB+tQ5RNa3p62tb9YYSnFatM28s3Bqv7zhw/f3i048L+ztd54HpcWl/O57z5OTF+XSO/+LnPw8rxLditHn/OYlFsxeyqV3XsDAiQOT7/qUlRBb+hIfLqooPvmODcXOcdgqv97/suhACUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJNCCArUD9G8A99ge50WBTtv59KON1zL80FFJBZtIdu92CNGbMce8Cv0XwO2NQlyc2l/cQvKTGjVD85/UggH6MOCvQI963dXtOI7RHzIUoCtAD34pjvcAvV7f9mY6yL2U8IendB4w4PROufQ5K9mZPT/KmrlFvPTLOd7fL/3+xXQf0t3b/rysrIznf/ASRQuKmHT9RCZeOg5KyiCWAyUr2D93UezdrXkfqJV7Mz0wTSsBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkMBHTqB2gG4bgA8JVp9b1blVnx9u+K3eo2R5x+5iExWUYW3dOzOgxqn72EEpxd5nFsxnJgs9q4Zf0Z5LF9rRhW2s9trFW2W7Vbrb2vzW8VGvJr4bOXQgTowdrKecfUwizhpCQHugL3h/PtxY79XcQ3nqIGPJSP15BLAZ2AlYW/fawbrtR2zn70+F73aupV52bavGr90l37bBtuv0TM1p5aJ2jIX2fVLn2h7nG1M/j6fWn536ubWZP9we6LY+W49VzNu+9XYfHVPXS2dg9233Z8f7nZ5tPXavfeCKdvBk4Lzy1eAehKit34FYsff3cOLAumtWnvk516F05liKglW7dQboLs51CxhIhCy7Quwgxb+dyI4j/ZZNdQkVz6eXG6ajmyAccnGdEAfdBJtCEdrGHDokyil9/NRkC4Xae6BfvZas8J7klzocY0vhBA6pnJ/qEtk4jyHGF0+wse8Y9mycxzD7e04Oq2L76F5RQV4oQsSuHwtx0Cljw2Nn1dzPO7gHekaEbU6Inm6CrISDU+lSEQ6xp7aXrevGZbStPEivuEu2EyJk14hHqQjH2FM4ng1HrIo223kMt/W6cXY+Ns57yDWHizP5XYYlMnHCMXYUTkj9YgJffYMOsRy62Vrt+k6IuBP3viRFhRMo8ye6fild3USy4UPtOeyzgnnkx6N0sz/HyymJuGQnINfc7LOEQ6UTJh6OsaFwglc7fdhx6TIy2pbR1Q3RPuKQYetKJNi3Zg/rBuVykhshnLmTdQ9NYp//7BMOGZlhSh4awZbak1+7mJMdiDohtj86kq3282tX0M4p9/7hYM1OVrw+icobFtIvFqr1j1WalSbKKXv8VD480n3U9fNlU4e17d9j0+Cc0UMc8rtDNAb5OSydU8Tc3y2wzJwLbptEn3H5yQC9pIznf/ovSotKGHL+ECZdOjK5R7o9obIyWLGAJcvzNoy+e411FrF/EDQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQOI1CV7rq4pwFv2bEWYlsAbqO7lxlaeFv3cHFrVJ0H907vw1ivMt0fW1jphdw22tGZjl5onBx2Tbu2Db9l/AYWecF5mAziXnv1Q4eF9Bae23FWn31JjUMsoD/5CF8Cu2ZVJljr2PHA6jr2QN8Fh83KLCO0a3v5cGossigxFYpbEB4cY1Jt4lekAvnDLds6AvRLHeCv73DH2xqsa7a1offHOjhiXt0H7usMt6TOKUut38kE13/hIPmzYbueveaMrT9d6kYonzmaZf5V6gjQnYJ5nJxwvI3msSB5+ljs7YIjjuvne/tn56Q70IJmC6cTEfY9Nhp72+CQAN2S/4J5jLXjQi4VhRNSLRQCE167gB4hl+72UWkmS7dvJzEol9H2dwttLbiv4/rvBwNmP0D315XunNRaP/ADzoJ55CWcut9asdB572qWPXNZau+EOsSuW8wIp5JMN0Fi5imBlhKp469bRkennP7218oQa2aNZbf9+ZolDAjH6FDXgwi5bPbDdnvRoHg+o8zSsypn+TNnYHsecMsqMg/swd5AwQ2T6LWLpRvbMsQJeW9n1Bhxh6LHxyW3j6hrXOoSbr+IkensnThxN5x8JtEoHz48Cvvl5Lp3GWsvAMTj7EoXbF+3iLFOnBARdj46mrV2zk1z6VQeSf5y2bN/ZgQVkxcx3I3X+EVOu8y6vk9H/FInH77z7tR+XU8ZvKsnAwd6b2okK9BzWPqvYuY+s8L7+wVfG0f3IcntNMpKYjz/ywWUFJUy7vyBnHVxHyhLBegWpBcVsWxZfPeI72z70GnZVvT1uWUdIwEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgASOO4FggP4z4Ju2wg0sJpGqRu6LBcgNGwco9SrHbXRmIDleNXZyFLEAC9xtRMikZzJf84btuW4V5pbF9faCdwc/QPePsX3WrWp9HyXYdYLDKtF/Smd+5VV4W/GxH1CPDFSUp7sXK6y12k5bs51j2axfPW4BfLoA3cJ8y4j9ok4rsrVKbwvHrdDVX5tlhdX3CH6A7q/D5rfKb6sUt+pxW/e21A/tZ/46rIA4eL+HC9At+7Ts19ZSBMk8M7UzvP/Cghn5GbcF/bZ+q4K3Y63a3r9WGHqMgTfAaybgB+j+8qPdIJwHiTJy9739m8s+/Nz99qNgIJsmQHeuXczgUGWyojfksrtwAmvq8y275h16h8N0sWMteI7BxuwYbiJKVyq9B+CNIwToXL+Y/v7x2bksu/+kqvYD3vnXz2eUZbFOmIMzxvDeeXOI+AG6/dxC6YNx1gx6hX0bP0n7cAb9LES2z9fsY6lVLdtxfoDur8t1KAkn2J2opJ2TSb4fBmdWsu7BVPX9tXMZbRXaFjqHK/mw+3j2r19E21CIrr5ZZZxNs049tKI6aHjDYrpUVtLbPjsQY9VTp7En+HP/RYRgwB48x8Jg+wLtyuJAfoI2lXH6+usNuVS9KPDVJXSIxZKtJgIBsr2kMMKqv1Ofr7YK80vfJLtTG9r567L7CFWwf++ZlD3jHPaFAGfyIob5IXbCoXjvWLb2eouMfTkMCIbbzRGg3ziHtm4nL84+ZPj3bj+oqGRdfboopJvHdXFWfrdrv5OHHuxI9+6QE03+U5SfQ9GaMl56eAU5OVEuvm0IefnJpVhG/tKja1gzt4TzvzKQkWflQ0msugq9pIT1H+wt61u2b6UzreofxPr8qukYCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJHBCCgQD9OXgVfZWhdxhIvRKFt02aFhAvoGFXlBuobbfxr2c/WzBqqurR7BC3fZStz3VLSDvlqoaDwbo+fSnTXVGykaWeK3bbfjXsW27kzXswerwgamW6ke6DX8PdKvuDLatTxegW97rFeymkuXaBbtWzGpBtA3rBp2f+nMwQLfMMXiehfdWQ2/Dqv7tboIjWGleV4BuGbJXVBwYtke9X73vV7kH1+dlxbXOeS/V1t0+HgeTHSisFaBnDoRw9csRTmL/yusWtb3CmyhQ0Vs7QL/2XU4Opdph11UZnO5JXfo04byB2A3YKHt0fOpRpz64bgF9HTcJfaQA/dY3yd6bmQTOyGDbQyOT7d5tBH/mV0bXDtBDLksKJ6S+fKm236H9DLbzQy7bCyd4by7UCNAzc1j34NDqkv+r55AVyWV40GvqVEKbLmKsfRaPs81vQ29/t59tvITRVjHtQunM8am3VNJh2fEuoU0LknPVPt6qufMWJC0rQ+yYNZZ1qdb4Y7wKfofKx8ayJNgqPniOtXOfcSr2JfGG/4xT9785liDiv+hgLw3MHOftK+CNxuyBfvVC2kcS2C8ykTBbHhnDpqrbdnGuXciokJtsC98cAXodxFgLeP+lhkPWVddJdT2vqYQuj+cOHDS0Mjdq7dv9AD0n6n3R5rxU4gXn4yblV/+2Rq1LeykrFpRx1vl55Fuwbu++pNq4x0pK2LJqT3nviorlCtAb+EB0uAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAiekgBegu7gWnFuA7g2/SjxMlF5eIW7Dh9+qPRjC+xXmNq8ffPsV6lbxbpXvNmxv9DZYQGz12MkW7tYG3sL24ChhLftTIXUPhrGa7EDkHKywtiJcr2j5CKMhAbp/rBXYWoV77WHV3xaW2wgG8sEW7jXvJ7kPu3XytmFZbLtak1oIbmG4jboCdHvhwcsRA8OCfK87derFAFuPzWX7tlsFfVXhduAcy3/9jtqp0P154BN+C/cIZB/6csWEosmXjil5dG0wsA0G6KEo+9148sYiIXY8MhbrI1+vEWxtHqyA9k8OBsZHCtDtnKoq8xDxGWOrHhbXz6U/kSRKzz+zcNo0EjUC9MDLAcGFXz2PkbYvdzDc9yvQre178Br+eX6L8WALe7+tuLV9D0XZuGMlO6ratSd3S6j3XtZTFnJSPEGuzVU4noX+uTcuo1tFObaRPZV7eG/WJA7a3t+BlwDWp9sbPhgYPzqe+VX2UwltvphRtdur2z7vs2q1yG9MgH79YnpRSVfvmYxj4TSnZjW17bWecJL7lrdUgG77olcmkv9Q1eeFhiN9ye0FicvjmQP7Dgrn5nTPh5w8YtbF3d5tsf+Xtv49+e6L5eXej2MxYmXJrdMpLSNWWkLR8gPlA10F6Efy188lIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAn4AfrNgNd620aw6rsxLdxtDmuxbvuS27AQ3kLzTSyjknLa0YX97PCC8bZ0ohP9vNbtFrDbCFal+2up3e7djtvFJvakulj3YRwP4lRt1Z1sX+4H2E0doAcrxdNVfPuSS1Kt4YNt3P0A3fYkTxYfV49iwFq127BwvXrv+OpjrELdrp8uQLfgPF3HAEvTbC02eqTau/szWhZrnb0tTLf27dbO3l4+CGa0qQD9NODVRRCJQygHsryGBTVG5x1P/fRz6698NhgIB6uTgweHXLy23odMUscHwRA1GN4GD/dD8foE6AXz6J5wPBAy9rDyoUnssz/7AXZljD2zTkvuyx4M0IPt1oPXTrfXux+ghx0OTB9X/ZKKf57frt0Js3fGmOTbE8Fg1j/OWqPHEuxuX0nJvak9xuvjFgzFg+sumMdIa68eDLivf5uu3jszyRFzwoe2VE/EyLA9xe2AnpksnTaiqrVBjcpy+7mF9ruyWGZ7iAfX2pgA3Q/uvcr4cak3bQKTFswjmnCSb/u0RIB+9Tt0i4STLyB4bf5Hs7whLzake3bWwn3Jd7v2G9R3Z0cL0EtK81hRVEafPpDXPUo0z1q6Rw/J0b0eHGUxYqUxSktiFK2J0adPHn3yyygrLmHtytCB4Rn7VqgCvT6/MTpGAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBE13AD9D/AFzmY/hBt/29JyOJJLcxrnO4JDjIPrJo61WK27DPilLtyDvQi3Z0rvq7tWffw1bK2O0F6xawW2t3a/EeJRurJveHH6Bn0Y6uyQ7ZVSMYoFvQfznwdNVPmzNAt+2tk9XyeEWxfuZYm8iayZcBYajqPO4H6LXbxNu5H6Zaz9uf69p73g/l0wXo6UJ5f01+sbB1OPcKdVN7tVtgf6SCZr/tO/C9RXBHHMK5kGl7ttccWfvmzL7yg499uz4Buu293WsCi2tXE9f1RatRTT2BBemO8/f1rk+AHmwJ77eSD7YKT7Thg8eGeG0BagTowc+Dawjuz/7oeG99blWAHmLP9LHJMD440gXo9vOCefRJOHROd49xhwNrS/nA32e9Li//88kLGZOqDPfa3t+yiswDexjh/TyDjY+OZKv9MdgC/0hz2s/TvQBx3buMcELYGyM2Dmmzbx82JkD3X4xwE5TPPIVldTx775emuQP04J7vTpz47nUsreoQUB+4Oo5xwXnj2327De26uUd+nxxWFOcwe80k8vLzyYmtIIcSotEyol55efWIEaWsLIeyWB6x6EBKSkqZNHAu4waWUVpcyvI17UtP/8n2NU4DOhccxW3oVAlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTQqgX8AN36dVuZtjd2sYE9bPP+XHvf8XR3u5ft7Exu+Ux7epJHN+/Pm3mPGAe9Pc1z6cJ2PvT6T1u1+D52sCPVvbs3Y7yqdxsWtucmOzV7ozpAt09rBra1A/Q+3vH+aM4A3QJnP78NBtK1dfy9x625st8K3w/Qbe9wb0vnwLBtnbek/j7ObxBQ6xi/dXy6AD1Y6R48LRj4W9GsPR/LTDcGDrI1tkn9z8J920PeKuJtBAL0Novgr3EYmwtZhwboobJ5W65dccqFdQboEbaGYsT9yu+Qy+7CCdiG8kccwcrsuirQ/crq+gTodkG/stlrcT6BBZMXMdhazNduuR6sQK8MsWbWWHbXXvA17zAgHKaDvRgw85Tk2yN+gB6sZg+eV1eAbsdYwN9hAB2cMB0qHdra3uf+uVaRXlirNXpdgMFgv3QNizoMoKcfzgfbod+wiJ6V8dQvbwYb47GabdJrzx9NeM+uKs29aS6dyiP0Cx6Xrlq/MQH6NQsYFnbJtsr4R8dXtVOovpSLc/0C7JcmfYAeZdfjo7w3VGqM6+en3lQJtOUP3kdpJkuDFfTBtdt3JjOP9+4/yWvZ0CTj5VsG5Z7UcfOgHoNxymJR5pb9F3kT7/S2Q6eslFislFhZKV6fdu9mc4hG8yAn+d+yGJQsuI+JOb8jP6eMkqIYK7f23DTpnnX2C3+kN2Wa5B40iQQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJozQKOi2uJajBJpYIyirHqadtXN4seh7Qar3nLwYp1qx63KnIbpRSzm81eaJ5DB2+/8gxy6M5Qr327H5q3oWPVXua9GU0osId3fQP0CONr1YE3Z4Bud+e3UrfQeUgd3wGvCBk8D7+q/nABurVS94uUrT16Tpp5/UrydAG65au191W3KYLzDkrtye4H8fYOha2/9rVWe08wOYL7qi+CKXH4dfoAnQOLOXfzdz8zZO8Lq/2K63Stzf2g22avbyv3YIvxtHugTyVU/FnGJByc+gbowYrzAzFWtYkwyM6Px9n2+KnV72MEA/SMTDY9NKLqTYeqZzT5HYa7YawNQFXldSMCdOfSN8nKzSV75nB2BduC3ziHtrH2DPL3Ge85zqvet7cjDjuC7c0jETbEy+nhhgk7leydMTHZNt7GdW/S0cmk/+GeyaXLyOhwkOzuWRwItm9PfT7C7OwFApvDWr2na+PeqAA99XJC7b3c/bUXzCMn4eDtKRCsQPer79PtUW5rzitnpDdHPQL0qcvI2FjJcP9Fhro6ERzpeRzu53OmnheJHlg2cES/0rbR/BwWrMhhTWwSfUZOJL/PEPLyuxP12rgnN0SPxWKUlZVRVlJMSfEa1iydy8DoHCYOsZbuZXy4OqNydcXQDy679y3bn0FDAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUjgCAIWoH8KeKX2cZtZTszbExtvz/KO1QXqNQ61fctt/3IbYTLolcqj7O+VVLAJq8KuHu3pQR7dvQ82soR4dQHrIefbMfUN0N9nPJ+ucaXmDtD99ux2UdvL3HLT4DATvx7eKr697ZJT+7Lb2tJVoAf3Vs+FWhX3eM7+nOkCdJvfqtpt7uAIrtXCcGsp71fQW3Beey9zW589N/uvDaueTwZ23r7ybeIwNxeGH1qBbgF6/z1/+dr5xXf+5XAB+q1vkr03M/lWQX1buVuAuSkVeIZc9hdOYEXwLoMV1PUN0O38695lbCrsrbB9we2z2pXHwQA93T7cwfsJuWwvnJBsydDQAD1Y/Rxy2Vw4oaoNgHerwWrydC8R1HrwVX/1K7jDDpVxN/mGSnYuq+4/yXu7whtBXyfOwRmn8l6N+VycKQsZ5Z8fclniV6BPXsRwN578JUi9iOAkHOxtjeQe4WOq5wqG3fV9eaJgHvkJJ7n3QGWcTbNOrfkCw3XzGeSAtU6oEaD7rd/TVa4XzKO73wnhSAG6dQNo34+R9uKBXSPksr5wAiV1eR/F585r3+rZsW/Gtr6d++c4Vt7/0uxSSmNWZJ5PNC/PqzSPRlMBellZVVV6WWmpFaJz8fl55ESjlBSVsm57521/b7d507Rph+8mcBTr1akSkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlI4CMlYAH6rcCvat+VtV63Fuz+sKryDvTE9iK3YfuV72KjV63uj24MIdNrA149aofk3RlGRqpCfQfr2RfIoKz1u7WAD476BujPMZ6v1zizuQN0u+9klX4ykD45VWluf98JrE39zKrCbbvpQADtBdPpAnQ7xSrQ/UwzGLxbNbh1Ove7MNcVoFtFue0V3zZ1/fVQZRw8x6+gt8OCLwBUgJdLB/dZDv48VUF/Zy78JH2Ann9g6a++UHTVI4cL0O2qtcLgerVy96vZ7fxEgn1Z+9iUmUl8TxZdHBfrp++NBgXoC+gbPDfdPtvBAN3m9yqax7HGKsSvnkNWtA1DLFyt3da7oQF6cF92N0wiXMmHhePZY9exyu2MCgZb2B9sE1+ff5GCAbS3/kCb+eD5wSDa2ut3f4G1Fr5aFTt4+7J7b2cEX2C4dgE9Qm7yrRh/L3n7c41n5VD82Dg22+fmFclNtrWw4/dVUjzsdMqnOYcPeQNheI2QvEYQXrsCPdWSP3WtbX1OwfZJYOsS8isrA28FHa4CfTix6+Yx3N/b3boTRENs2ZWFtwVG7eG3fL9hMV3K48nvZNt2rKlvq3d3KqHFldndM0NOt/w+UcqIsnRFGcXFyX9rvX9J/H9OYv5vapTu3aOMHJJHXjRGaXEZe0vjpWSWF42Yhv1Sa0hAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCdRDwAL0B4Cb0h170KstX4Vbj61zOzPAa9Nee9je6LZHug2HEH0CLcYPUMo2rFV4cvRkBBFsH+/qUd8A/R7G82CNM5s7QLeLBcNp+7uF5RZw+yG35WtW3Z1saZ8ch2vhbj+3c5dBVeZlc9j/vK7YgVFXgO4fUnstFvJbt2qvgDbN2v3P/apzu6Z/H7attV0vsP6eubDoJKoj69SPDyymbUXRM1esveiuIwXouDjXLmRUKFURXZ9qZAuyB7ZliB9m1kKp+quF64+dwkr7wN/XPFFJ5WMTsd71NcYtq8g8sMd7y8Eb1ub8kdGptgqpz2oH6P6xtle631LdPrPq66dOq67qbmiAbnPU2Is8dSEL5q09etXCM9j46EhvI/v6DRenYD5j/TmCVfLBCew+T2rPiOA91b5HC9/DDsus+jxYTW7H9XieJX61s70MkNufURb42zWqKuYD+5VXXTvC1kdH19xKovaN3biMthXl3psq3ki9YGCV7jWC7GAL92v/RbtQtvdGSdpR5XqYAD0rTjSzss59Gg6Zt3IP782axMEbFtKvMpH8xSmPsOKJ0eyv38MCdzrR94uyejihUH73PjnEolHWFMcoLolRahudp95vsUL0nJwo3fOjDOxujd2T4fmB/fF9uZHyDT3uDrzhVN+L6zgJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkcAILWID+AnBhXQaVlLOLTZSxK+0h2eTSkT6HBN/+wVapviXVaduq17sGsiwL5otSrcTDROjl7bVdc2xkMXEqySaPLsmO0FXD9le3fdZt3Mx4Xqzx02A79D5A53o8Zn9fcOsEHbyWvx+4hcxjas1j1eYWpAcDbsvzLDS3jtO19xY/UoBu09u21laJXl3dn7yoVaTbcyhPBdoWbNvw12fXsg4AyRcWqoe1g7fW7l6OmRoWjq9LVcvXpukC3o7yVqVux1nXAT+DDBjdMwi+UevcA4vJqix544pVH7925vjk2xHXpPavtoB1xljvDYKqYft6V+QmQ9F6V1Unw+Detpm7tVy3ENQJcTCcQVEsltwjPLjn9ZSFnBRPYAixR8ezJN0XIbgne88/s7B2y+tggO46lESgvd/K3F872ayfOcJrP1A1pixgtB2Xbg9uO8ivqq69H7lVVccjdPP32/YnNMMYrJs1lt3p7uNwn12zhAHhWPItl56ZLA3uYR48b6pLqHg+/f1q8+DPnDB7e0RY558brAqv/fKAnRfcYz7of80COkcT9PbD73CIPf4LF4e7B3vZobyUwX6rfc8+TCJeQXEknGxfEQzQ/TWEK+nvB/n+84pHWJsRp1vCoU0kxI5Hxnq/EHx5Lp0yIni/XNam3qb091evj3l2Lsus2vxoAnS7zrKpZGQeyO5yINPpagF5NC9KWcz+h/c/GzlegG7/ysSIlcUoLYnhVsR3t4mUFys8r8/T0jESkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIoKaABejzgPFHgrGwO04FFqgniBMhiyjWwzhtF+MjTdfkP58AzG/yWf0J/bbq6QJ0/xgLva3A1Hor1w7NG7swS8ksRLfrWjBeX2sLvfelLmqt3A93nlWc2173di1bd80OAIddudVsW8bu7ahdY8zHceyRNOmwYHf76+Rs386BZy6r2qC9xjUK5jHOQtlgIFqfRRypUjwYoMcdih4fx/ZLl5GRv4s28WzKCyc0S6Wvc8sqMspLycrMw92ykP113Xd97rExx1i79exOZO9zqTi4koNNff1bXiaTk+D+k7yWC37LgyMu9VKXcJtFtNt/gPJnzuBAsC187QDdn8yeV5sYOfujlPltgENFfQAAIABJREFU1o94oaM84LrU9gA9x7F4muO9GdOg4T5NeM1yOsXJ6JiIR9pYWB7NidpLAt6I2a9tLEZZGVQcrCwPO+FdsciB7Wrb3iBmHSwBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEqgQsQLeqSyuVbtXDykWtDrx5hu0J7ofjo5rnEq111t8CVx2y+PU4jl8e32R3dvVasiI7k3tnk6aFeXAv7opK1v12Ijvqc/Er3iY3O2oxLmRksvKhEVVvH1Sdni5Ar8/cOqZlBOoToLfMSqqvMtUlsnkRIxKVODNP8V41adRwXRwKiRTtpG0snt3WOZjIOhB3vQg9EnbiGVnOwazKg/vLXfb1gwpn2uH3km/UInSSBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEjhBBCxAr3fV5/FsUt/a7Ibdg1VxW4nn2lRxrFVo257mGlUClwJPp/FwnGZ5JH6FeWr/6y2ZeeyMbyRa0ZH2VNLVVmKt4PesZcnhqqVvfZPs8lzyEpWEE5V0TbUSr7PFuwL04/s7fzwG6P7WBRmZbHpoBFuaQtAL0+/2Wkr4+zEkuBv71P7vI/FveVM4aQ4JSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQk0FgBBeh1ygX3UPcPsn3BvYxWwxfIAm+L+9o9DJopQLe9s8Mutql92uHth72L92dN4uDhHlLBPPITTs1Vl0dY8cRor9XAIUMB+vH9lT8eA/SCeUQrD5L12FnsPb71tDoJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAFfQAF6nd8F23v8/dRPreCz00eh033zfPPvB26uNXUzBeh2lYJ55DkheroJslKV41Z1Xh6NsO/gbrYcKTxPzWHtBIb4lefRKBseHsWuuoBs//VNC7Bd36kMUTRrLLubB1OzNkbAwuqEk2wPkTjAWoXWjVHUORKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAgrQve/AJmBpKjBfDRQBxUDJYXZWt5LrfKB7KlgfmGrvPhLoeWJ9s84HXq11y80YoAevNHUqoWlHsefz0Z5/Yj1o3a0EJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEPtoCJ2iAbpXlfwPeAN4CNjTxU+4NnA6cDfzHibFv+mJgVICxhQL0Jn5wmk4CEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEjiBBU6gAP1t4I/AC4HW7C315K2z9GeBS4DTWuqiLXudHwDfCVxSAXrL+utqEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpDAUQtYgL7uo7C5d7+0zdatBfssYCaw4qixmmaCIcB1wNWpFvBNM+sxn8UK7t+sWsV6HMceiYYEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBViNgAfo8YHyrWXEdC50AzK/6me1n/iAw/Ti/rSnATYDtm/4RGLaVfA/vPubjOPZINCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQm0GgEL0K2n+YWtZsV1LNQapL/IEuAe4MlWdjtXArfX2kS8ld2CLdc65F/srftFHMceiYYEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBViNgAbqVat/YalacdqHbuYlpPORVnbfiMfgm+GAq0Ll13sSdwE+8pT+I49zcOm9Cq5aABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABE5UAQvQbwV+1XoBHgDu4l728PXWexPJldtTOCkXfv0j+FsrzJ9PBeZ6d/J1HOfe1v44tH4JSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSODEErAA/VPAK63vtpcDlv3P9pb+F+DTre8maq7YnoI9DRuPng+33gv7hrWuu9oBdOTTOI49Eg0JSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACrUbAAvSewMZWs2JvodMBq9CurFr2JqBX67qJQ1drT8Gehj/mhKHgQVg9pfXc2Z+Ai+iF49gj0ZCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTQagQcW6mLuwdo1zpWXQDMSLvUPsCG1nETh66yN1CUZvEWqn9xMvy7sFXcWYevsXfXfU5uq1isFikBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUggIOAH6JuB7se3zHrgKuCNOpd5OfD08X0Tda/uMuAPh1n8f54N//cE0Pe4vsOPn0rxa+84PY7rRWpxEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABNII+AF6cufq43a8bWXYgIXodY8HgFuO23s4wsLuT3WlP9xhX+8L9/4eOO24vct7ctl5+x6n03G7QC1MAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQQB0Ctgd6G2Df8Ss0G/hkvZb3PjCsXkcehwctB4bWY13PAJe9Cpxfj4Nb/pDUbbR1cPa3/NV1RQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAKNF7AA/RTgncZP0ZxnvgRc2KALWIBuQXqrGvnA9gas2PZF7/0icEEDTmr+Qy3/twAdONXBebf5r6grSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEmg6AQvQrwYeb7opm2qm+leeB694B/DzplpCS83TFigCOjTggjuBTsdXJfo3gZ8lb+EaB2dWA+5Gh0pAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhI45gIWoFvefPsxX0mNBdie56c3akmNP7NRl2u6k2xr88sbON1c2w79reNmT/TASu5xcCxP15CABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTQagQsQLc+6Z85fla8HjgXsP82blgr8RWNO/XYnXUN8FgjLv9UX7jyH0DfRpzcdKcMqdk6/2UH5/jqL990t6qZJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCCBj6iABehvNrrcu1lQzgHeOKqZf3H8ldQf+X4ygT1AxpEPPeSIaWfD3f9sxIlNd8o9wDeqp3vTwTmz6WbXTBKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgASaX8AC9IXAmOa/VH2uUADMqM+Bhz2mBOh81LMcgwmeBb7QyOteORmeKmzkyUd/2nYgv3qahQ7OuKOfVTNIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISaDkBC9DfB6wD9zEe04EbmmwNNpPN2KrGbYCVzzdm7LRG/I/A3CmNOfuozrErPlJzhpUOznHwnTqq29LJEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpDACSZgAfq6Y76BNsuBUUC8yfiXpmZssglbYqIvAb87igvNjcBnFsPOYUcxScNPXQKMrHnaBgenT8Nn0hkSkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEjp2ABehbgS7Hbgl25U8Cs5t8CVcBTzb5rM044eeA549y/sLzYcqrRzlJ/U+/Enji0MN3ODiBju71n09HSkACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEjhWAhag7wHaHasFwAPALc1yeauMHt0sMzfTpOOBeU0w94T7Yf7NTTDRkadYnL7Sv8zBaXPks3WEBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggeNHwAL0GBA5NkvaDgwCLMNvnmEx8oPNM3XTz9oBsL3Mj3b8ORc+txrofLQzHfb8m0i+/pBuODhOs15ck0tAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJoYoFjHKA3f7zd/BF9Ez4R6wPwDWBqE8z5p5vgorri7SaYP/nWwyAcx4hrDBf3Ow7OD5vkKppEAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQQAsJHMMW7i3XYL35msQ38VMaDKwEpgF3H+XcQ4HldTRYP8qpU6ffguMcktC7uLZyC9CPUVeDprk5zSIBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCZx4AhagbwW6tPytXwU82WKX/SQwu8Wu1sgLnQfMSZ1rVejfb+Q8/mk/uxK++cRRTpL29Nk4jpHWGKnw3Fa+18HJbY4La04JSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACzSVgAfo6oG9zXSD9vEuBUS16yeXAaKCyRa/awIt9Cfhd4JzvAkfTCL0rsGwJ5I9s4EIOe3jce3iOY6RVIxCe22dbHJzuTXlRzSUBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUiguQUsQH8fGNLcF6o5/w3A9Ja9ZOqKduXjdtwG/KLW6u4CfnwUK/76FPjlI0cxwSGn3oDj1Hh4tcJzO2GNgzOoKS+quSQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQk0t4AF6AuBMc19oer5S4DOLXe5WlcqAGYcs6sf4cLPAl9Ic8y3gJ82ctFR4O3tMC6/kRPUOG0GjmOEVSNNeG4/W+rgtGyLgaa4O80hAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQmc0AIWoL8JnN5yClZifXvLXS7Nlc4B3jimK0hz8UxgD5BRx8LuAH7eyEX/9B644xuNPLnqtDdwHKOrGnWE5/bztx2cFvxOHe2t6XwJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACYAH6S8BnWg5jKLCi5S6X5krrgXMB++9xM64BHjvCauy9g9ot3utzA58eAi9bp/5GjySZ41SRHSY8t4u87OBc0Oir6UQJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACx0DAAnSra26hkvC3W7bY/TCgx89KUov8PXB5Pb4BVkj+y3ocFzwkxP9v796D9arKOwD/FgIyEGAgEbkkKBFBhGJhCgYVLLaCCgpiBW94A0tVoOoIWIMVK1gRx6p4qQrU1ksFK4JAVWy1EoQg2owUiCAkxhCuAQcIjFxkd3b4DiYxyflu+5yzc549kwnkrPWudz0r//2y9k5uvzJ5yqweJz4xfJ+UUpMtf0YJz+shZ5SUE/tdzDwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAiMh0AdoL85yb+MzeKDvId8+B1emuTA4ZftveI2Sa5LskWXU9+T5J+6HDsy7LwTk1ef3uOk5cMPTCk11fKni/C8HvaWkvLlfhYzhwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAuMlUAfoeyX56dg08OwkA71KfOht1u+vP3joVXsseEqSD/Y4511JPtXDnLfvknzu+h4mLB96cEqpiZY/XYbn9dC9S8rVvS5mPAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBMZToA7QN0myrPkm6uC8DtAn3jOuN9Hr2+c/S7JtHy7HJzmzy3kzkvymDtDrb9B39fRz83yk8JSS8kBXqxhEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBCSJQ6j6qVAuTPL3Znj6T5Lhmlxigev2B79ckWTRAjb6m9nP7fMWFjk3y2S5X/vmZyZ71hLU+NcFrevzm+YoFf11SdhhtET8nQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDARBMYCdDr13S/rNnmjkhyXrNLDFi9To6PTDJnwDpdTx/k9vmKi7wjyee7WPW0w5P3n7u2gfXWj0wpT/w7gh5e2z5S9z9LykFddGMIAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEJpTASID+sSQnNNvZ9kkWN7vEkKr/dZIvDanWWsvUN8fr8HsYz98k+cIohfaZkVzxmzUN+mJKOWbFH/YRntfTzygpJw5jS2oQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgLAVGAvRXJLmwuYWXJJneXPkGKtdZ9DuT/L6B2stLHt1ASl+/Ib9+U/7anoduSTbcbsURjyY5NqWsFL/3GZ7XdQ8pKd9pik1dAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQINCUwEqBvmeTuphZJvpfkpc2Vb6jy9UneneTSYdffM8nPh120U+89Sf5pLbUXfTfZ/iUjA+qtvTul1Ft94hkgPK9rTC0p9zS0O2UJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQmMDyAL1+qlRXJdm7mZXqRLdOdtv51Je6Zye5b1jtV8MqtIY6JyWpX8q/uueqTyR7v7veyuyU8kf31QcMz39aUp7b8O6UJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCMCKwbo/5jkfY2sstVR9+bOczZvpPYYFb0ryYeS1J8t7/tp+EX5K/V1cpLT/rjTI75+xKJzX/uNvVJKvaWVngHD87rWR0vK3/XtYyIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTGUWDFAP3QJN9upJfX7bkwJ83bIWck+WojK4xZ0WuS/rbx0ST1zfCxfOrE/5THF3xDkhOS7H7qM68pJ//qOau2MYTwvC75ypJywVhu0VoECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAYlsCKAfo2SW4dVuGV6syeviSnLtlu+Z/9X+ca9xcaWWnMina9jVq1vtv/pjFrbaWFjvlI8s7ZyZ+M/Ol7p99aPn7L42fReYYUntfVti0pt43PTq1KgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBwQSeCNDrMlWqK5LsM1jJ1cw+a9OlOWrZtJV+sjTJl5OcneSXQ19xzAqucRt1cH5MkrfVsfKYtbN8oWclOSrJm5MsR69v/p/Y6eGtU+8v59y92UhHQwzPrywpzxvbnVqNAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECwxNYNUCvv5z94eGV71T6YUn2X0vVuZ2Xx1+UZP7QV197wTph/l2SZYOvu3wb2yQXHZPMH+PgfJckL6/foZ5k1uq28skk705yWFLOz/JzH2J4Xpf7QEk5dXBFFQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDA+AqsG6Lsn+cXQW/llSXbusmodoP93kjlJrkyyuMt53Q6b0bljv2+Sv0hSJ893J6nD+4s7vz/cbbHOuA076fXBnd+nPv7vAMZ6G6N2/dkkX0/KFSlDDs/rpZ9TUupPxHsIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQSoGVAvR6B1Wq7yc5YKi7ua8km/ZZcUnnu+l1In1zkkVJ6q9s1+9Or/97dc/TOu8ur1+jvn2SHTtBef0h8JW+/r2ayQ8luSDJ1Z0vwtdr1V+GH/myd12zfiX7yO97JTk0yZPXvr+x3sYau/li/Wr56kNJPtjniaxu2qUl5cAh1lOKAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECYy6wugD92CRnDrWTQQL0oTaiWO5JMrUaNsRxJeUzwy6qHgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBMZSYHUBen1/+5dJNhpaI728wn1oiyq0WoHrk+w61AC9/oL8s0rKmt4H4CAIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQCoE/CtDrrqtU5yV59dB28MOS7D+0agoNIlB/mP0vhxqgf7OkHD5IS+YSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgIgisKUA/Msm/Da3BszZdmqOWTRtaPYX6Fzh7ytIcff8wz+KNJeUr/TdkJgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCaGwJoC9PWTzEuy21DanD19SU5dst1QaikymMAHt70l/7Bk+mBFnph9bZI9SsqjQ6qnDAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBMZNYLUBet1Nleq9Sc4YSmev23NhvjZvh6HUUmQwgSP/dEG+Om/mYEWemH1CSfn4kGopQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgXEVWFuAXr/mu76FPvht5ee96ub85PxnjOtOLf64wL6H/SqXf+uZQ+C4pXP7fOkQailBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBcRdYY4Bed1al+nCSkwfucvu/X5hFH3YDfWDIIRR4+gcWZNE/DOMG+qkl5QND6EgJAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQITAiB0QL0HTu30KcM1O3GF96RBw596kA1TB6OwCYX3J4HD9l6wGLLOrfPbxqwjukECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYMAJrDdDrLqtUZyY5dqCOyy0P57EZGw5Uw+ThCKy3+OFU0wc9i8+UlOOG05AqBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmBgC3QToeySZk2STgVr+8UZ3ZL+H3EIfCHHAyZc9+Y688HeDnsED9ZfUS8q8AbsxnQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAhNKYNQAve62SlV/B73+Hnr/z1ueOz/n/HSX/guYObDAW/een3+5atAz+EBJOXXgXhQgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDABBPoNkBfv3MLfVbf/W/9kcW5bfaMvuebOLjANqctzu3vH+QM5nZunz86eDMqECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYGIJdBWg1y1XqQ5JckH/7c9PfvPsZJD4tv/FzVycZPvrkwx0Af3QknIhTAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKyLAl0H6PXmq1RfTPK2viHOmHZ73nv31n3PN7F/gY9PvT0nLB3E/ksl5a/7b8BMAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQITGyBXgP0mZ1XuW/b17b2euMN+elXdu5rrkmDCex95A25+t/6tb+18+r2BYM1YTYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQmrkBPAXq9jSrVcUk+3deWNrj8t/ndvltkvb5mm9SvwGNJNprz2zzygi36LHF8STmzz7mmESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBUCPQfo9a6qVF9N8vq+dvitTRfnsGW+hN4XXp+Tzp+yOK+6v1/zr5WUN/S5smkECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBojUC/AXr9CvdLk+za805fcvSP8t2z9+95ngn9C7z0qB/le2f1Y35dkgNKSv0Kdw8BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWaYG+AvRapEp1UJKLe9bZ4PZrsmyb3bNhzzNN6Efg4SRTbrsmj2y9ex/TDy4pl/QxzxQCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0TqDvAL3eaZVqdpJTe9712/edm89dPqvneSb0LvCOF8zN5+f0Y31ySTmt9wXNIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQDsFBgrQ6y1Xqf4jyat62v4G8+7MzXtulX6/yt3TYpN48OIkz/jfO/PIHlv1qPCtkvJXPc4xnAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAq0WGEaAPjPJd5Ps1JPEEfvNzzfm7NLTHIN7E3jNvvNz7mW9Gt+Y5KUlZUFvixlNgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBdgsMHKDX269SvTDJd5Js1jVHueaxXPWc9bJX1zMM7EXg6iTP/cVjqXZfr4dp9yV5RUn5cQ9zDCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMA6ITCUAL2WqFIdnuTcnlT2O+zG/Pjbvd1c72mBSTz4ha+8MZed36vtESXlvEmsZusECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECExigaEF6LVhleqtSc7u3vOu5IJtH8whj27c/RwjRxW4cP0Hc+itGydPGXXoCgOOKinn9DLBWAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKxLAkMN0GuYKtXxST7VNdLMU27IzR/auevxBo4u8IwP3pAFp/Ri+rcl5dOjFzaCAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC667A0AP0mqpK9f4kp3XN9tEdrstJv9616/EGrlng9Kdfl/ct7MVydkn5CFICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhMdoFGAvQatUp1XJLubjU/6f/uzeXPmZJZ1ZMm+4EMtP+rymN5/i/uz+//ZPMu6xxfUs7scqxhBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWKcFGgvQa7Uq1UuT/GdXgtt8bGGuPWmHbNnVaINWFbgnyW6nL8xtJ+7QJc7LSspVTYfhAAAO/0lEQVR3uxxrGAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNZ5gUYD9FqvSrV/kh92Jfnnr7gpP7pox67GGrSywP4H35T/6druRSXlRwgJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4A8CjQfo9VJVqn2SXJBkq1Hxj3/GonxqwdNGHWfAHwT+duaifPrmbszuTHJoSbkSHwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAisLDAmAXq9ZJVqjyRfS7LL2g9hUXLWbktz1LJpDqsLgbOnLM3R105LRs3P5yd5fUmZ10VVQwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDDpBMYsQK9lq1Qzk3wsyavWLj03mbtP8txJdx69bfiqJLPqy+SzRpv3rSQnlpQFow30cwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECExWgTEN0EeQq1Szk5y6dvRLk7sPTLacrEczyr7vSTL1+0kOGA3o5JJy2miD/JwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKTXWBcAvQavUp1UJLTk+y65kO4JFl8cDJ9sh/TKvu/JcmMi5PUhGt8rktyUkm5hB4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIjC4wbgF63VqVatvOK91fv+ZWL03OOzB59eibmRQjvpnk8FFvntffmq9f2X7rpDCxSQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAxBYFwD9JH+q1THJXlfkjpQX80zN3nHQffls/dsNoQ9t7fEO7e8L5+7ZLO1fPO8Dsw/WlLObO8mdU6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHxEZgQAXq99SrVzE6I/rbVUyxK/vLgpfnBtdPGh2qcV33xbkvzXxdPS562pka+1AnPF4xzp5YnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAKwUmTIA+olelOqQTpM9areizjrgjPzjvqZPmu+j1985ffPjt+eW5W6/hb9jcTnB+YSv/BmqaAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECE0RgwgXotUuVav1OiF6/1n2TP7La/JN35fz3TM2LqvUmiGMzbfyw/D6HfeKe3Puup6xmgQfq4LwTnj/aTAOqEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYPIITMgAfYS/SrVHkrcmeXOSKSsdy3rXPpiPvHxhTvr1ruvkcZ3+9Ovy/ot2yGO7bbzK/pYl+XKSc0rKvHVy7zZFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBcRCY0AH6iEeVasckb+oE6dNXcpp5yg35xGkzcsijqwbN48A5hCUvXP/BvGf24iw4ZedVqtUvc6+D838tKTcNYSUlCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAFgVYE6CP9VqmmdUL0Okzf7Q/7uCvZ75gb8/Fv75S9Wnq+Vyd57ytvzGVf2ClZ6Y3t19aheR2el5SlLd2dtgkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDDhBVoVoI9odr6R/tokL+/82mj5z8o1j+XwY2/IGXN2yYwJb/94g4uTnLDv/Jz3mZ1T7T7yTfffJbmo8+vfS4pvnLfkOLVJgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEB7BVoZoK/IXaV62gpB+gHLf7bBvDtz9PEL8snLZ2XDCXo4Dyd51wvm5qxPz8wje2zV6fLSkeC8pCyaoJ1riwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAuukQOsD9BVPpUq1e5JXJDkoyaxscPs1efHspfmb856Zg5bNyMj97vE6yseSXDJlcf758F/lB6dNyyNb1/3Orf80yXdKyjXj1Zp1CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMNkF1qkAfZUwvX6J+75Jnpfk+dlgzow87/O35nXfm5qDf7ttth2jo7+1jsa3uDXfeMk9ueLt2+SRfeuXtv8kyRVJ5pSU+v89BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDDOAutsgL6qa5VqWidQf0E2/dl+2bwO0i94IG+49il5/kNPHeo5/OTJd+Sru92Viw/dJPe+5O7c/2eXJbm8E5gvHepaihEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAUAQmTYC+Oq0q1WZJ9snW8w5Imf/C3L1k12x84+8z/caHsuOSKjvds36e/dvNMzPJDp0KC5MsSHL9Fvfmxi0fzU3bldyy00Z5cKf1MnW765Jdfpzb9qi/ZX5lSblvKKekCAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0LjCpA/TGdS1AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAq0REKC35qg0SoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJNCgjQm9RVmwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRaIyBAb81RaZQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEmhQQoDepqzYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQItEZAgN6ao9IoAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQpIEBvUldtAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGiNgAC9NUelUQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoUkCA3qSu2gQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQGgEBemuOSqMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0KSAAL1JXbUJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoDUCAvTWHJVGCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKBJAQF6k7pqEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBrBATorTkqjRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAkwIC9CZ11SZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB1ggI0FtzVBolQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSYFBOhN6qpNgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAq0REKC35qg0SoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJNCgjQm9RVmwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRaIyBAb81RaZQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEmhQQoDepqzYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQItEZAgN6ao9IoAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQpIEBvUldtAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGiNgAC9NUelUQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoUkCA3qSu2gQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQGgEBemuOSqMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0KSAAL1JXbUJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoDUCAvTWHJVGCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKBJAQF6k7pqEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBrBATorTkqjRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAkwIC9CZ11SZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB1ggI0FtzVBolQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSYFBOhN6qpNgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAq0REKC35qg0SoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJNCgjQm9RVmwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRaIyBAb81RaZQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEmhQQoDepqzYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQItEZAgN6ao9IoAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQpIEBvUldtAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGiNgAC9NUelUQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoUkCA3qSu2gQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQGgEBemuOSqMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0KSAAL1JXbUJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoDUCAvTWHJVGCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKBJAQF6k7pqEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBrBATorTkqjRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAkwIC9CZ11SZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB1ggI0FtzVBolQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSYFBOhN6qpNgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAq0REKC35qg0SoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJNCvw/8C29bTtrU30AAAAASUVORK5CYII=~~~data:image/png;base64,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~extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_color_buffer_half_float;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_shader_texture_lod;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;WEBKIT_EXT_texture_filter_anisotropic;EXT_sRGB;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBKIT_WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBKIT_WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBKIT_WEBGL_lose_context;WEBGL_multi_draw~webgl aliased line width range:[1, 1]~webgl aliased point size range:[1, 255.875]~webgl alpha bits:8~webgl antialiasing:yes~webgl blue bits:8~webgl depth bits:24~webgl green bits:8~webgl max anisotropy:16~webgl max combined texture image units:80~webgl max cube map texture size:16384~webgl max fragment uniform vectors:1024~webgl max render buffer size:16384~webgl max texture image units:16~webgl max texture size:16384~webgl max varying vectors:15~webgl max vertex attribs:16~webgl max vertex texture image units:16~webgl max vertex uniform vectors:1024~webgl max viewport dims:[16384, 16384]~webgl red bits:8~webgl renderer:WebKit WebGL~webgl shading language version:WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)~webgl stencil bits:0~webgl vendor:WebKit~webgl version:WebGL 1.0 (OpenGL ES 2.0 Chromium)~webgl unmasked vendor:Intel Inc.~webgl unmasked renderer:Intel(R) Iris(TM) Plus Graphics 645~webgl vertex shader high float precision:23~webgl vertex shader high float precision rangeMin:127~webgl vertex shader high float precision rangeMax:127~webgl vertex shader medium float precision:23~webgl vertex shader medium float precision rangeMin:127~webgl vertex shader medium float precision rangeMax:127~webgl vertex shader low float precision:23~webgl vertex shader low float precision rangeMin:127~webgl vertex shader low float precision rangeMax:127~webgl fragment shader high float precision:23~webgl fragment shader high float precision rangeMin:127~webgl fragment shader high float precision rangeMax:127~webgl fragment shader medium float precision:23~webgl fragment shader medium float precision rangeMin:127~webgl fragment shader medium float precision rangeMax:127~webgl fragment shader low float precision:23~webgl fragment shader low float precision rangeMin:127~webgl fragment shader low float precision rangeMax:127~webgl vertex shader high int precision:0~webgl vertex shader high int precision rangeMin:31~webgl vertex shader high int precision rangeMax:30~webgl vertex shader medium int precision:0~webgl vertex shader medium int precision rangeMin:31~webgl vertex shader medium int precision rangeMax:30~webgl vertex shader low int precision:0~webgl vertex shader low int precision rangeMin:31~webgl vertex shader low int precision rangeMax:30~webgl fragment shader high int precision:0~webgl fragment shader high int precision rangeMin:31~webgl fragment shader high int precision rangeMax:30~webgl fragment shader medium int precision:0~webgl fragment shader medium int precision rangeMin:31~webgl fragment shader medium int precision rangeMax:30~webgl fragment shader low int precision:0~webgl fragment shader low int precision rangeMin:31~webgl fragment shader low int precision rangeMax:30~~~false~~~false~~~false~~~false~~~false~~~0;false;false~~~Andale Mono;Arial;Arial Black;Arial Hebrew;Arial Narrow;Arial Rounded MT Bold;Arial Unicode MS;Comic Sans MS;Courier;Courier New;Geneva;Georgia;Helvetica;Helvetica Neue;Impact;LUCIDA GRANDE;Microsoft Sans Serif;Monaco;Palatino;Tahoma;Times;Times New Roman;Trebuchet MS;Verdana;Wingdings;Wingdings 2;Wingdings 3"

    return my_fp.prototype.x64hash128(my_str,31)

}


//var a = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'

// console.log(get_fp(a))