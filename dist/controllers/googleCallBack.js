"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleCallBack = exports.googleAuthentication = void 0;
require("../config/googleAuth");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var googleAuthentication = exports.googleAuthentication = function googleAuthentication(req, res, next) {
  _passport["default"].authenticate("google", {
    scope: ["email", "profile"]
  })(req, res, next);
};
var googleCallBack = exports.googleCallBack = function googleCallBack(req, res) {
  try {
    var _req$user = req.user,
      user = _req$user.user,
      token = _req$user.token;
    // if(user.provider!=='google'){
    //   res.status(403).json({error:"only google authenticated users!"})
    // }
    // else{
    res.status(200).json({
      message: 'logged in successfully!',
      token: token
    });
    // }
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};