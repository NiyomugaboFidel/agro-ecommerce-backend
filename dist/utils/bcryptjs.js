"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Cryptr = require('cryptr');
var _require = require('bcryptjs'),
  genSaltSync = _require.genSaltSync,
  hashSync = _require.hashSync,
  compareSync = _require.compareSync;
var cryptr = new Cryptr(process.env.CRYPT_KEY, {
  pbkdf2Iterations: 10000,
  saltLength: 10
});
var BcryptUtil = /*#__PURE__*/function () {
  function BcryptUtil() {
    _classCallCheck(this, BcryptUtil);
  }
  return _createClass(BcryptUtil, null, [{
    key: "hash",
    value: function hash(string) {
      var pasSalt = genSaltSync(10, 'b');
      var pasHash = hashSync(string, pasSalt);
      return pasHash;
    }
  }, {
    key: "compare",
    value: function compare(value1, value2) {
      var validPass = compareSync(value1, value2);
      return validPass;
    }
  }]);
}();
module.exports = {
  BcryptUtil: BcryptUtil,
  cryptr: cryptr
};