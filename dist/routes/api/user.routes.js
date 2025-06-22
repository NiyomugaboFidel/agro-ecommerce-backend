"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../../controllers/auth.controller");
var _checkUserWithToken = _interopRequireDefault(require("../../middlewares/checkUserWithToken"));
var _multer = _interopRequireDefault(require("../../config/multer"));
var _admin = require("../../controllers/admin.controller");
var _googleCallBack = require("../../controllers/googleCallBack");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get("/", _checkUserWithToken["default"], _admin.getUsers);
router.post("/signup", _auth.createUser);
router.post('/login', _auth.loginUser);
router.get("/auth", function (req, res) {
  res.send('<a href="/api/v1/users/auth/google">authenticate with google</a>');
});
router.get("/auth/google", _googleCallBack.googleAuthentication);
router.get("/google/callback", _passport["default"].authenticate("google", {
  session: false,
  failureRedirect: "/login"
}), _googleCallBack.googleCallBack);
router.get("/me", _checkUserWithToken["default"], _auth.getUserInfo);
router.post("/reset-password", _auth.fillEmail);
router.patch("/reset-password/:token", _auth.ResetPassword);
router.patch('/update-password', _checkUserWithToken["default"], _auth.updatePassword);
router.put('/update-profile', _checkUserWithToken["default"], _multer["default"].single("profilePic"), _auth.editUserProfile);
router.post('/request-role', _checkUserWithToken["default"], _auth.requestManager);
router.patch('/update-role/:_id', _checkUserWithToken["default"], _admin.updateUserRole);
router.get("/:_id", _auth.getUserById);
router.patch("/update-status/:_id", _checkUserWithToken["default"], _admin.updateUserActive);
var _default = exports["default"] = router;