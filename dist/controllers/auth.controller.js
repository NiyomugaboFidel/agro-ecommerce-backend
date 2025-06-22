"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePassword = exports.requestManager = exports.loginUser = exports.getUserInfo = exports.getUserById = exports.fillEmail = exports.editUserProfile = exports.createUser = exports.ResetPassword = void 0;
var _init = require("init");
var _User = _interopRequireDefault(require("../models/User"));
var _user = require("../services/user.service");
var _bcryptjs = require("../utils/bcryptjs");
var _emailUtil = require("../utils/emailUtil");
var _generateToken = require("../utils/generateToken");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, firstname, lastname, email, role, phoneNumber, password, userData, userExist, token, response, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, role = _req$body.role, phoneNumber = _req$body.phoneNumber, password = _req$body.password;
          userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role,
            phoneNumber: phoneNumber,
            password: password
          };
          _context.n = 1;
          return _User["default"].findOne({
            email: email
          });
        case 1:
          userExist = _context.v;
          if (!userExist) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(401).json({
            error: "user Already Exist"
          }));
        case 2:
          token = (0, _generateToken.generateToken)(userData);
          _context.n = 3;
          return (0, _user.registerUser)(userData);
        case 3:
          response = _context.v;
          return _context.a(2, res.status(201).json({
            user: response,
            token: token
          }));
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.log(_t);
          res.status(500).json(_t.message);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var foundUser, passwordMatches, userToken, token, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return _User["default"].findOne({
            email: req.body.email
          });
        case 1:
          foundUser = _context2.v;
          console.log("user==++", foundUser);
          if (foundUser) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "User does not exist!"
          }));
        case 2:
          if (foundUser.password) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "Password is missing in the user record!"
          }));
        case 3:
          _context2.n = 4;
          return _bcryptjs.BcryptUtil.compare(req.body.password, foundUser.password);
        case 4:
          passwordMatches = _context2.v;
          if (passwordMatches) {
            _context2.n = 5;
            break;
          }
          return _context2.a(2, res.status(400).json({
            error: "Passwords don't match!"
          }));
        case 5:
          userToken = {
            _id: foundUser.id,
            firstname: foundUser.firstname,
            lastname: foundUser.lastname,
            email: foundUser.email,
            role: foundUser.role
          };
          token = (0, _generateToken.generateToken)(userToken);
          return _context2.a(2, res.status(200).json({
            message: "User logged in successfully!",
            user: {
              id: foundUser.id,
              firstname: foundUser.firstname,
              email: foundUser.email,
              role: foundUser.role,
              isactive: foundUser.isActive
            },
            token: token
          }));
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          console.log("Error:", _t2);
          return _context2.a(2, res.status(500).json({
            error: _t2.message
          }));
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function loginUser(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var fillEmail = exports.fillEmail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var email, user, userInfo, token, sendToEmail, link, HTMLText, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          email = req.body.email;
          _context3.n = 1;
          return findUserByEmail(email);
        case 1:
          user = _context3.v;
          if (user) {
            _context3.n = 2;
            break;
          }
          res.status(404).json({
            message: "User not found"
          });
          _context3.n = 4;
          break;
        case 2:
          userInfo = {
            email: user.email,
            id: user._id
          };
          token = (0, _generateToken.generateToken)(userInfo, {
            expiresIn: "10m"
          });
          sendToEmail = req.body.email;
          link = "".concat(process.env.APP_URL, "/auth/reset-password?token=").concat(token);
          HTMLText = "<html>\n        <head>\n        <style>\n        .controler{\n         display: flex;\n         justify-content: center;\n         align-items: center;\n         background-color: gainsboro;\n        }\n        .container {\n          border: 2px;\n          color: black;\n        }\n        .button {\n          background-color: #9B51E0;\n          padding: 10px 20px;\n          text-decoration: none;\n          font-weight: bold;\n          border-radius: 4px;\n        }\n        .button:hover{\n         background-color: #8a7a99;\n        }\n        .container-full{\n          background-color: white;\n          border-radius: 4px;\n          box-shadow: 8px white;\n          position: relative;\n          opacity: 70%;\n          width: 60%;\n          padding: 8px 8px 8px 8px;\n          margin: auto;\n        }\n        .container-small{\n         position: absolute;\n         border-radius: 4px 4px 0px 0px;\n         top: 0;\n         left: 0;\n         background-color: #9B51E0;\n         width: 100%;\n         height: 18%;\n        }\n        img{\n          width: 200%;\n          height: 100%;\n          object-fit: cover;\n        }\n        .header{\n          background-repeat: no-repeat;\n          background-size: fit;\n          width: 50%;\n          height: 30%;\n        }\n        a{\n          text-decoration: none;\n          color: white;\n        }\n        span{\n          color: #fff;\n        }\n      </style>\n       </head>\n       <body>\n       <div class=\"controler\">\n        <div class=\"container-full\">\n        <div class=\"container-small\" style=\"display: flex;\">\n            <p style=\"color: aliceblue; font-family: 'Courier New', Courier, monospace; padding: 20px;\">Have You Heard? <br> Alive Now!</p> \n            <span style=\"padding: 12px; font-size: 30px;text-align: center; margin-left: 10px;\">WooHo Car</span></div>\n        <div style='font-size: 12px'><strong> <h3>Hi ".concat(user.lastname, "<h3/><br> <br>\n        <div class = \"header\">\n        <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>\n        </div><br> <br>\n        <div class=\"container\">\n        <h3>Please click  here to reset your password </h3>\n        <a href=\"").concat(link, "\" class=\"button\"><span>Reset Password</span></a>\n        </div>\n        <br> <br>Remember, beware of scams and keep this one-time verification link confidential.<br>\n        </strong><br>WooHoo Car</div>\n        </div>\n        </div>\n        </body>\n        </html>\n         ");
          _context3.n = 3;
          return (0, _emailUtil.sendEmail)(sendToEmail, "Reset password", HTMLText);
        case 3:
          res.status(200).json({
            message: "Reset password email has been sent, check your inbox"
          });
        case 4:
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t3 = _context3.v;
          console.log("server error", _t3);
          res.status(500).json({
            error: "server error"
          });
        case 6:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 5]]);
  }));
  return function fillEmail(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var ResetPassword = exports.ResetPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var token, payload, hashPassword, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.p = 0;
          token = req.params.token;
          payload = (0, _user.checkToken)(token, process.env.JWT_SECRET);
          if (!payload) {
            _context4.n = 3;
            break;
          }
          _context4.n = 1;
          return _bcryptjs.BcryptUtil.hash(req.body.password);
        case 1:
          hashPassword = _context4.v;
          _context4.n = 2;
          return _User["default"].updateOne({
            email: payload.data.email
          }, {
            password: hashPassword,
            lastTimePasswordUpdated: new Date(),
            expired: false
          });
        case 2:
          res.status(200).json({
            message: "Password changed successfully"
          });
          _context4.n = 4;
          break;
        case 3:
          res.status(400).json({
            message: "invalid token"
          });
        case 4:
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t4 = _context4.v;
          res.status(500).json({
            error: "Server error"
          });
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 5]]);
  }));
  return function ResetPassword(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
var updatePassword = exports.updatePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, _req$body2, currentPassword, newPassword, user, isMatch, isSamePassword, hashedPassword, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.p = 0;
          userId = req.user._id;
          console.log("userId", userId);
          _req$body2 = req.body, currentPassword = _req$body2.currentPassword, newPassword = _req$body2.newPassword;
          console.log("Received Passwords:", req.body);
          _context5.n = 1;
          return _User["default"].findById(userId);
        case 1:
          user = _context5.v;
          console.log("User from DB:", user);
          if (user) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(404).json({
            error: "User not found!"
          }));
        case 2:
          _context5.n = 3;
          return _bcryptjs.BcryptUtil.compare(currentPassword, user.password);
        case 3:
          isMatch = _context5.v;
          if (isMatch) {
            _context5.n = 4;
            break;
          }
          return _context5.a(2, res.status(400).json({
            error: "Current password is incorrect!"
          }));
        case 4:
          _context5.n = 5;
          return _bcryptjs.BcryptUtil.compare(newPassword, user.password);
        case 5:
          isSamePassword = _context5.v;
          if (!isSamePassword) {
            _context5.n = 6;
            break;
          }
          return _context5.a(2, res.status(400).json({
            error: "New password must be different from the old password!"
          }));
        case 6:
          _context5.n = 7;
          return _bcryptjs.BcryptUtil.hash(newPassword);
        case 7:
          hashedPassword = _context5.v;
          user.password = hashedPassword;
          _context5.n = 8;
          return user.save();
        case 8:
          return _context5.a(2, res.status(200).json({
            message: "Password updated successfully!"
          }));
        case 9:
          _context5.p = 9;
          _t5 = _context5.v;
          console.error("Update Password Error:", _t5);
          return _context5.a(2, res.status(500).json({
            error: "Internal server error!"
          }));
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function updatePassword(_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}();
var editUserProfile = exports.editUserProfile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var userEmail, decodeUser, updatedFields, updatedUser, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.p = 0;
          userEmail = req.user.email; // Find the user by email
          _context6.n = 1;
          return _User["default"].findOne({
            email: userEmail
          });
        case 1:
          decodeUser = _context6.v;
          if (decodeUser) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(401).json("User not found"));
        case 2:
          // Define the updated fields based on the request body or use existing data
          updatedFields = {
            firstname: req.body.firstname || decodeUser.firstname,
            lastname: req.body.lastname || decodeUser.lastname,
            email: req.body.email || decodeUser.email,
            role: req.body.role || decodeUser.role,
            phoneNumber: req.body.phoneNumber || decodeUser.phoneNumber,
            profilePic: req.file ? req.file.path : decodeUser.profilePic,
            location: {
              province: req.body.province || decodeUser.location.province,
              city: req.body.city || decodeUser.location.city,
              street: req.body.street || decodeUser.location.street,
              zipcode: req.body.zipcode || decodeUser.location.zipcode
            },
            isActive: req.body.isActive !== undefined ? req.body.isActive : decodeUser.isActive
          }; // Update the user with the new data
          _context6.n = 3;
          return _User["default"].findByIdAndUpdate(decodeUser._id, {
            $set: updatedFields
          }, {
            "new": true,
            runValidators: true
          });
        case 3:
          updatedUser = _context6.v;
          return _context6.a(2, res.status(200).json({
            user: updatedUser,
            message: "User profile updated successfully"
          }));
        case 4:
          _context6.p = 4;
          _t6 = _context6.v;
          return _context6.a(2, res.status(500).json({
            error: _t6.message
          }));
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function editUserProfile(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var requestManager = exports.requestManager = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var user, message, link, recipients, data, results, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.p = 0;
          user = req.user;
          message = req.body.message;
          link = "".concat(process.env.APP_URL, "/users/update-role/").concat(user._id);
          recipients = [{
            name: "Fidele Niyomugabo",
            address: "fidelniyomugabo67@gmail.com"
          }];
          data = {
            htmlMessage: "\n        <div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #f9f9f9;\">\n          <h2 style=\"font-size: 24px; color: #2c3e50; text-align: center; margin-bottom: 20px;\">requesting to be a manager</h2>\n          <div style=\"font-size: 18px; color: #333;\">\n            <p><strong>Full Name:</strong> ".concat(user.firstname, " ").concat(user.lastname, "</p>\n            <p><strong>Email:</strong> ").concat(user.email, "</p>\n            <p><strong>Phone:</strong> ").concat(user.phoneNumber, "</p>\n            <p><strong>Message:</strong></p>\n            <div style=\"background-color: #e8f4f8; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db; margin-top: 10px;\">\n              ").concat(message, "\n            </div>\n          </div>\n          <div style=\"text-align: center; margin-top: 30px;\">\n            <a href=\"").concat(link, "\" style=\"text-decoration: none;\">\n              <button style=\"background-color: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;\">\n                Update Role\n              </button>\n            </a>\n          </div>\n        </div>\n      ")
          };
          _context7.n = 1;
          return (0, _emailUtil.sendEmail)({
            sender: {
              name: "".concat(user.firstname, " ").concat(user.lastname),
              address: user.email
            },
            recipients: recipients,
            subject: "New Request To Be A Manager",
            message: message,
            data: data
          });
        case 1:
          results = _context7.v;
          return _context7.a(2, res.status(200).json({
            accepted: results.accepted
          }));
        case 2:
          _context7.p = 2;
          _t7 = _context7.v;
          return _context7.a(2, res.status(500).json({
            error: "Internal server error!"
          }));
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function requestManager(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var getUserInfo = exports.getUserInfo = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var userId, userInfo, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          userId = req.user.id;
          _context8.p = 1;
          _context8.n = 2;
          return _User["default"].findById(userId);
        case 2:
          userInfo = _context8.v;
          if (!userInfo) {
            res.status(404).json({
              message: "user not Found!"
            });
          }
          res.status(200).json(userInfo);
          _context8.n = 4;
          break;
        case 3:
          _context8.p = 3;
          _t8 = _context8.v;
          return _context8.a(2, res.status(500).json({
            message: "internal server Error!"
          }));
        case 4:
          return _context8.a(2);
      }
    }, _callee8, null, [[1, 3]]);
  }));
  return function getUserInfo(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var getUserById = exports.getUserById = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var userId, user, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.p = 0;
          userId = req.params._id;
          _context9.n = 1;
          return _User["default"].findById(userId);
        case 1:
          user = _context9.v;
          if (user) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, res.status(400).json({
            error: "user Not Found!"
          }));
        case 2:
          return _context9.a(2, res.status(200).json(user));
        case 3:
          _context9.p = 3;
          _t9 = _context9.v;
          return _context9.a(2, res.status(500).json({
            error: "internal server error"
          }));
      }
    }, _callee9, null, [[0, 3]]);
  }));
  return function getUserById(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();