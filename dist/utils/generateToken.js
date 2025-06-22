"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("dotenv/config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var generateToken = exports.generateToken = function generateToken(data, options) {
  var token = _jsonwebtoken["default"].sign({
    data: data
  }, process.env.JWT_SECRET, options);
  return token;
};
var verifyToken = exports.verifyToken = function verifyToken(token) {
  var obj = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
  return obj;
};