"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Product = require("../models/Product.js");
var _Category = require("../models/Category.js");
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var productSeeder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var admin, agricultureCategory, foodCategory, products, existing, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return _User["default"].findOne({
            email: "fidelniyomugabo67@gmail.com"
          });
        case 1:
          admin = _context.v;
          if (admin) {
            _context.n = 2;
            break;
          }
          console.log("❌ Admin not found. Seed admin first.");
          return _context.a(2);
        case 2:
          _context.n = 3;
          return _Category.Category.findOne({
            name: "agriculture"
          });
        case 3:
          agricultureCategory = _context.v;
          _context.n = 4;
          return _Category.Category.findOne({
            name: "food"
          });
        case 4:
          foodCategory = _context.v;
          if (!(!agricultureCategory || !foodCategory)) {
            _context.n = 5;
            break;
          }
          console.log("❌ Categories missing. Seed categories first.");
          return _context.a(2);
        case 5:
          products = [{
            title: "Fresh Tomatoes",
            images: ["uploads/tomato1.jpg"],
            price: 1500,
            discount: "10%",
            quantity: 100,
            moq: 5,
            unit: "kg",
            details: "Fresh and organic tomatoes from local farms.",
            category: foodCategory._id,
            user: admin._id,
            expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
          }, {
            title: "Wheat Seeds",
            images: ["uploads/wheat1.jpg"],
            price: 3000,
            discount: "5%",
            quantity: 500,
            moq: 10,
            unit: "kg",
            details: "High-quality wheat seeds for better yield.",
            category: agricultureCategory._id,
            user: admin._id,
            expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }, {
            title: "Organic Carrots",
            images: ["uploads/carrots.jpg"],
            price: 2000,
            discount: "15%",
            quantity: 250,
            moq: 4,
            unit: "kg",
            details: "Organic, crunchy, and nutritious carrots.",
            category: foodCategory._id,
            user: admin._id,
            expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }];
          _context.n = 6;
          return _Product.Product.countDocuments();
        case 6:
          existing = _context.v;
          if (!(existing === 0)) {
            _context.n = 8;
            break;
          }
          _context.n = 7;
          return _Product.Product.insertMany(products);
        case 7:
          console.log("✅ Products seeded successfully");
          _context.n = 9;
          break;
        case 8:
          console.log("ℹ️ Products already exist. Skipping.");
        case 9:
          _context.n = 11;
          break;
        case 10:
          _context.p = 10;
          _t = _context.v;
          console.error("❌ Product seeding failed:", _t.message);
        case 11:
          return _context.a(2);
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function productSeeder() {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = productSeeder;