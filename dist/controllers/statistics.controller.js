"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Statistics = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _Order = require("../models/Order");
var _Product = require("../models/Product");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Statistics = exports.Statistics = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var userStatistics, userActiveStatus, productStatistics, productCategoryStatistics, orderStatistics, ordersPerMonth, productRatingStatistics, productUnitStatistics, recentProductsCount, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return _User["default"].aggregate([{
            $group: {
              _id: '$role',
              // Group users by their role
              count: {
                $sum: 1
              } // Count the number of users in each role
            }
          }]);
        case 1:
          userStatistics = _context.v;
          _context.n = 2;
          return _User["default"].aggregate([{
            $group: {
              _id: '$isActive',
              count: {
                $sum: 1
              } // Count active/inactive users
            }
          }]);
        case 2:
          userActiveStatus = _context.v;
          _context.n = 3;
          return _Product.Product.aggregate([{
            $group: {
              _id: '$isExpired',
              // Group by expired status
              count: {
                $sum: 1
              } // Count the number of expired and non-expired products
            }
          }]);
        case 3:
          productStatistics = _context.v;
          _context.n = 4;
          return _Product.Product.aggregate([{
            $group: {
              _id: '$category',
              // Group by category
              count: {
                $sum: 1
              } // Count products in each category
            }
          }, {
            $lookup: {
              from: 'categories',
              // Assuming you have a Category model
              localField: '_id',
              foreignField: '_id',
              as: 'categoryInfo'
            }
          }, {
            $unwind: '$categoryInfo'
          }, {
            $project: {
              categoryName: '$categoryInfo.name',
              count: 1
            }
          }]);
        case 4:
          productCategoryStatistics = _context.v;
          _context.n = 5;
          return _Order.Order.aggregate([{
            $group: {
              _id: null,
              // No grouping (get total for all orders)
              totalRevenue: {
                $sum: '$totalPrice'
              },
              // Sum of all order prices (assuming `totalPrice` exists)
              orderCount: {
                $sum: 1
              },
              // Total number of orders
              avgOrderValue: {
                $avg: '$totalPrice'
              } // Average order value
            }
          }]);
        case 5:
          orderStatistics = _context.v;
          _context.n = 6;
          return _Order.Order.aggregate([{
            $group: {
              _id: {
                $month: '$createdAt'
              },
              // Group by the month of creation
              orderCount: {
                $sum: 1
              },
              // Count the number of orders per month
              totalRevenue: {
                $sum: '$totalPrice'
              } // Total revenue per month
            }
          }, {
            $sort: {
              _id: 1
            } // Sort by month
          }]);
        case 6:
          ordersPerMonth = _context.v;
          _context.n = 7;
          return _Product.Product.aggregate([{
            $group: {
              _id: null,
              avgRating: {
                $avg: '$stars'
              } // Average rating
            }
          }]);
        case 7:
          productRatingStatistics = _context.v;
          _context.n = 8;
          return _Product.Product.aggregate([{
            $group: {
              _id: '$unit',
              // Group by product unit
              count: {
                $sum: 1
              } // Count the number of products in each unit
            }
          }]);
        case 8:
          productUnitStatistics = _context.v;
          _context.n = 9;
          return _Product.Product.countDocuments({
            createdAt: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          });
        case 9:
          recentProductsCount = _context.v;
          return _context.a(2, res.status(200).json({
            userStatistics: userStatistics,
            userActiveStatus: userActiveStatus,
            productStatistics: productStatistics,
            productCategoryStatistics: productCategoryStatistics,
            orderStatistics: orderStatistics[0],
            // Since there's no grouping, return first item
            ordersPerMonth: ordersPerMonth,
            productRatingStatistics: productRatingStatistics[0],
            // Return first item
            productUnitStatistics: productUnitStatistics,
            recentProductsCount: recentProductsCount
          }));
        case 10:
          _context.p = 10;
          _t = _context.v;
          console.error("Failed to fetch statistics", _t);
          return _context.a(2, res.status(500).json({
            message: "Failed to fetch statistics"
          }));
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function Statistics(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();