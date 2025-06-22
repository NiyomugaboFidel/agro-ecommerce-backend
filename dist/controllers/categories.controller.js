"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.deleteCategory = exports.createCategory = void 0;
var _Category = require("../models/Category");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createCategory = exports.createCategory = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user, name, newCategory, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          user = req.user;
          if (!(!user.role === "superAdmin")) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(403).json({
            message: "only super admin allowed to create category!"
          }));
        case 1:
          name = req.body.name;
          _context.n = 2;
          return _Category.Category.create({
            name: name
          });
        case 2:
          newCategory = _context.v;
          return _context.a(2, res.status(201).json({
            message: "category created successfuly!",
            newCategory: newCategory
          }));
        case 3:
          _context.p = 3;
          _t = _context.v;
          return _context.a(2, res.status(500).json({
            message: "internal server error!"
          }));
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function createCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateCategory = exports.updateCategory = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var catId, newCategory, user, category, upadatedCategory, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          catId = req.params._id;
          newCategory = req.body.newCategory;
          user = req.user;
          if (!(!user.role === "superAdmin")) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(403).json({
            message: "only super admin allowed to update category!"
          }));
        case 1:
          _context2.n = 2;
          return _Category.Category.findById(catId);
        case 2:
          category = _context2.v;
          if (category) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Category not found!"
          }));
        case 3:
          category.name = newCategory;
          _context2.n = 4;
          return category.save();
        case 4:
          upadatedCategory = _context2.v;
          return _context2.a(2, res.status(200).json({
            messsage: "category updated successfully!",
            upadatedCategory: upadatedCategory
          }));
        case 5:
          _context2.p = 5;
          _t2 = _context2.v;
          return _context2.a(2, res.status(500).json({
            message: "internal server error!"
          }));
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function updateCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var deleteCategory = exports.deleteCategory = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var catId, user, category, productsInCategory, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          catId = req.params._id;
          user = req.user;
          if (!(user.role !== "superAdmin")) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(403).json({
            message: "Only super admin is allowed to delete a category!"
          }));
        case 1:
          _context3.n = 2;
          return _Category.Category.findById(catId);
        case 2:
          category = _context3.v;
          if (category) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "Category not found!"
          }));
        case 3:
          _context3.n = 4;
          return Product.find({
            category: catId
          });
        case 4:
          productsInCategory = _context3.v;
          if (!(productsInCategory.length > 0)) {
            _context3.n = 5;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "Cannot delete category with associated products!"
          }));
        case 5:
          _context3.n = 6;
          return _Category.Category.findByIdAndDelete(catId);
        case 6:
          return _context3.a(2, res.status(200).json({
            message: "Category deleted successfully!"
          }));
        case 7:
          _context3.p = 7;
          _t3 = _context3.v;
          console.error("Error deleting category:", _t3);
          return _context3.a(2, res.status(500).json({
            message: "Internal server error!"
          }));
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function deleteCategory(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllCategories = exports.getAllCategories = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var allCategories, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return _Category.Category.find();
        case 1:
          allCategories = _context4.v;
          return _context4.a(2, res.status(200).json(allCategories));
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
          return _context4.a(2, res.status(500).json({
            message: "internal server error!!"
          }));
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getAllCategories(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getCategoryById = exports.getCategoryById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var catId, category, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.p = 0;
          catId = req.params._id;
          _context5.n = 1;
          return _Category.Category.findById(catId);
        case 1:
          category = _context5.v;
          if (category) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: "no category found!"
          }));
        case 2:
          return _context5.a(2, res.status(200).json(category));
        case 3:
          _context5.p = 3;
          _t5 = _context5.v;
          console.log(_t5);
          return _context5.a(2, res.status(500).json({
            message: "internal server error!!"
          }));
      }
    }, _callee5, null, [[0, 3]]);
  }));
  return function getCategoryById(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();