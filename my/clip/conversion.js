"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
! function (t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : window.imageConversion = t()
}(function () {
    var t = {};

    function e(t) {
        return ["image/png", "image/jpeg", "image/gif"].some(function (e) {
            return e === t
        })
    }
    return t.urltoImage = function (t) {
        return new Promise(function (e, a) {
            var n = new Image;
            n.onload = function () {
                return e(n)
            }, n.onerror = function () {
                return a(new Error("urltoImage(): Image failed to load, please check the image URL"))
            }, n.src = t
        })
    }, t.urltoBlob = function (t) {
        return fetch(t).then(function (t) {
            return t.blob()
        })
    }, t.imagetoCanvas = async function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            a = document.createElement("canvas"),
            n = a.getContext("2d"),
            i = void 0,
            r = void 0;
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (e[o] = Number(e[o]));
        if (e.scale) {
            var c = e.scale > 0 && e.scale < 10 ? e.scale : 1;
            r = t.width * c, i = t.height * c
        } else r = e.width || e.height * t.width / t.height || t.width, i = e.height || e.width * t.height / t.width || t.height;
        switch ([5, 6, 7, 8].some(function (t) {
            return t === e.orientation
        }) ? (a.height = r, a.width = i) : (a.height = i, a.width = r), e.orientation) {
            case 3:
                n.rotate(180 * Math.PI / 180), n.drawImage(t, -a.width, -a.height, a.width, a.height);
                break;
            case 6:
                n.rotate(90 * Math.PI / 180), n.drawImage(t, 0, -a.width, a.height, a.width);
                break;
            case 8:
                n.rotate(270 * Math.PI / 180), n.drawImage(t, -a.height, 0, a.height, a.width);
                break;
            case 2:
                n.translate(a.width, 0), n.scale(-1, 1), n.drawImage(t, 0, 0, a.width, a.height);
                break;
            case 4:
                n.translate(a.width, 0), n.scale(-1, 1), n.rotate(180 * Math.PI / 180), n.drawImage(t, -a.width, -a.height, a.width, a.height);
                break;
            case 5:
                n.translate(a.width, 0), n.scale(-1, 1), n.rotate(90 * Math.PI / 180), n.drawImage(t, 0, -a.width, a.height, a.width);
                break;
            case 7:
                n.translate(a.width, 0), n.scale(-1, 1), n.rotate(270 * Math.PI / 180), n.drawImage(t, -a.height, 0, a.height, a.width);
                break;
            default:
                n.drawImage(t, 0, 0, a.width, a.height)
        }
        return a
    }, t.canvastoFile = function (t, e) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "image/jpeg";
        return new Promise(function (n) {
            return t.toBlob(function (t) {
                return n(t)
            }, a, e)
        })
    }, t.canvastoDataURL = async function (t, a, n) {
        return e(n) || (n = "image/jpeg"), t.toDataURL(n, a)
    }, t.filetoDataURL = function (t) {
        return new Promise(function (e) {
            var a = new FileReader;
            a.onloadend = function (t) {
                return e(t.target.result)
            }, a.readAsDataURL(t)
        })
    }, t.dataURLtoImage = function (t) {
        return new Promise(function (e, a) {
            var n = new Image;
            n.onload = function () {
                return e(n)
            }, n.onerror = function () {
                return a(new Error("dataURLtoImage(): dataURL is illegal"))
            }, n.src = t
        })
    }, t.dataURLtoFile = async function (t, a) {
        for (var n = t.split(","), i = n[0].match(/:(.*?);/)[1], r = atob(n[1]), o = r.length, c = new Uint8Array(o); o--;) c[o] = r.charCodeAt(o);
        return e(a) && (i = a), new Blob([c], {
            type: i
        })
    }, t.downloadFile = function (t, e) {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(t), a.download = e || Date.now().toString(36), document.body.appendChild(a);
        var n = document.createEvent("MouseEvents");
        n.initEvent("click", !1, !1), a.dispatchEvent(n), document.body.removeChild(a)
    }, t.compress = async function (a) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!(a instanceof Blob)) throw new Error("compress(): First arg must be a Blob object or a File object.");
        if ("object" !== (void 0 === n ? "undefined" : _typeof(n)) && (n = Object.assign({
                quality: n
            })), n.quality = Number(n.quality), Number.isNaN(n.quality)) return a;
        var i = await t.filetoDataURL(a),
            r = i.split(",")[0].match(/:(.*?);/)[1],
            o = "image/jpeg";
        e(n.type) && (o = n.type, r = n.type);
        var c = await t.dataURLtoImage(i),
            u = await t.imagetoCanvas(c, Object.assign({}, n)),
            s = await t.canvastoDataURL(u, n.quality, o);
        return await t.dataURLtoFile(s, r)
    }, t.compressAccurately = async function (a) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!(a instanceof Blob)) throw new Error("compressAccurately(): First arg must be a Blob object or a File object.");
        if ("object" !== (void 0 === n ? "undefined" : _typeof(n)) && (n = Object.assign({
                size: n
            })), n.size = Number(n.size), Number.isNaN(n.size)) return a;
        if (1024 * n.size > a.size) return a;
        n.accuracy = Number(n.accuracy), (!n.accuracy || n.accuracy < .8 || n.accuracy > .99) && (n.accuracy = .95);
        var i = n.size * (2 - n.accuracy) * 1024,
            r = 1024 * n.size,
            o = n.size * n.accuracy * 1024,
            c = await t.filetoDataURL(a),
            u = c.split(",")[0].match(/:(.*?);/)[1],
            s = "image/jpeg";
        e(n.type) && (s = n.type, u = n.type);
        for (var h = await t.dataURLtoImage(c), d = await t.imagetoCanvas(h, Object.assign({}, n)), l = .5, f = void 0, g = [null, null], m = 1; m <= 7; m++) {
            var w = .75 * (f = await t.canvastoDataURL(d, l, s)).length;
            if (7 === m) {
                (i < w || o > w) && (f = [f].concat(g).filter(function (t) {
                    return t
                }).sort(function (t, e) {
                    return Math.abs(.75 * t.length - r) - Math.abs(.75 * e.length - r)
                })[0]);
                break
            }
            if (i < w) g[1] = f, l -= .5 ** (m + 1);
            else {
                if (!(o > w)) break;
                g[0] = f, l += .5 ** (m + 1)
            }
        }
        var y = await t.dataURLtoFile(f, u);
        return y.size > a.size ? a : y
    }, t
});