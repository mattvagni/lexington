(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() ;} else if (typeof define === "function" && define.amd) { define([],f); } else  { var g; if (typeof window !== "undefined") { g = window; } else if (typeof global !== "undefined") { g = global ;} else if (typeof self !== "undefined") { g = self; } else  { g = this; }g.Lexington = f() ;} })(function () { var define,module,exports; return (function e (t,n,r) { function s (o,u) { if (!n[o]) { if (!t[o]) { var a = typeof require == ="function" && require; if (!u && a) return a(o,!0); if (i) return i(o,!0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND",f; } var l = n[o] = {exports:{}};t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n:e) ;},l,l.exports,e,t,n,r); } return n[o].exports; } var i = typeof require == ="function" && require; for (var o = 0;o < r.length;o++)s(r[o]); return s ;})({1:[ function (require,module,exports) {
    "use strict"; function _classCallCheck (t,n) { if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function") ;} var _createClass =  function () { function t (t,n) { for (var e = 0;e < n.length;e++) { var r = n[e];r.enumerable = r.enumerable || !1,r.configurable = !0,"value"in r && (r.writable = !0),Object.defineProperty(t,r.key,r) ;} } return function (n,e,r) { return e && t(n.prototype,e),r && t(n,r),n ;}; }(),LexerStream =  function () { function t (n) { _classCallCheck(this,t),this.string = n,this.currentIndex = 0,this.currentString = n[0]; } return _createClass(t,[{key:"current",value: function () { return this.currentString ;}},{key:"next",value: function () { return this.string = this.string.slice(this.currentString.length),this.currentIndex += this.currentString.length,this.string.length ? (this.currentString = this.string[0],!0):!1; }},{key:"match",value: function (t,n) { return !!this.string.match(new RegExp("^(" + t + ")",n)); }},{key:"eat",value: function (t,n) { var e = this.string.match(new RegExp("^(" + t + ")",n)); return e ? (this.currentString = this.string.substr(0,e[0].length),!0):!1 ;}}]),t ;}();module.exports = LexerStream;

},{}],2:[ function (require,module,exports) {
    "use strict"; function _classCallCheck (e,t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function"); } var LexerToken =  function e (t,s,n) { _classCallCheck(this,e),this.text = t || "",this.types = s || [],this.startIndex = n,this.endIndex = n + t.length - 1; };module.exports = LexerToken;

},{}],3:[ function (require,module,exports) {
    "use strict"; function _classCallCheck (e,r) { if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function"); } var _createClass =  function () { function e (e,r) { for (var n = 0;n < r.length;n++) { var t = r[n];t.enumerable = t.enumerable || !1,t.configurable = !0,"value"in t && (t.writable = !0),Object.defineProperty(e,t.key,t); } } return function (r,n,t) { return n && e(r.prototype,n),t && e(r,t),r ;} ;}(),LexerStream = require("./lexer-stream"),LexerToken = require("./lexer-token"),Lexer =  function () { function e (r,n) { _classCallCheck(this,e); var t = new LexerStream(r),a = {},o = !0; if (this.tokens = [],r.length) for (;o;) { var s = n(t,a) || [],u = t.current(),c = t.currentIndex;this.tokens.push(new LexerToken(u,s,c)),o = t.next(); } } return _createClass(e,[{key:"getTokens",value: function () { return this.tokens; }}]),e ;}();module.exports = Lexer;

},{"./lexer-stream":1,"./lexer-token":2}]},{},[3])(3);
});