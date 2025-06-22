"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.searchProducts = exports.getProductsByCategory = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
var _Product = require("../models/Product");
var _Category = require("../models/Category");
var _fuzzySearch = _interopRequireDefault(require("fuzzy-search"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createProduct = exports.createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user, _req$body, title, price, discount, quantity, moq, details, categoryName, expirationDate, unit, images, category, newProduct, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          user = req.user;
          if (!(user.role !== "superAdmin" && user.role !== "manager")) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(403).json({
            message: "Unauthorized: Only super admin or manager is allowed to create a product!"
          }));
        case 1:
          _req$body = req.body, title = _req$body.title, price = _req$body.price, discount = _req$body.discount, quantity = _req$body.quantity, moq = _req$body.moq, details = _req$body.details, categoryName = _req$body.categoryName, expirationDate = _req$body.expirationDate, unit = _req$body.unit;
          images = req.files.map(function (img) {
            return img.path;
          }); // Find category by name
          _context.n = 2;
          return _Category.Category.findOne({
            name: categoryName
          });
        case 2:
          category = _context.v;
          if (category) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(404).json({
            message: "Category not found!"
          }));
        case 3:
          // Create a new product with the provided data
          newProduct = new _Product.Product({
            images: images,
            title: title,
            price: price,
            discount: discount,
            quantity: quantity,
            details: details,
            category: category._id,
            user: user._id,
            expirationDate: expirationDate,
            moq: moq,
            unit: unit // New unit field
          }); // Save the new product
          _context.n = 4;
          return newProduct.save();
        case 4:
          return _context.a(2, res.status(201).json({
            product: newProduct,
            message: "Product created successfully!"
          }));
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error(_t.message);
          return _context.a(2, res.status(500).json({
            message: _t.message
          }));
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateProduct = exports.updateProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var user, productId, product, _req$body2, title, price, stars, rates, discount, quantity, type, details, categoryName, expirationDate, moq, unit, category, updatedProduct, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          user = req.user;
          productId = req.params._id;
          _context2.n = 1;
          return _Product.Product.findById(productId);
        case 1:
          product = _context2.v;
          if (product) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Product not found!"
          }));
        case 2:
          if (!(user.role !== "superAdmin" && user._id.toString() !== product.user.toString())) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(403).json({
            message: "Unauthorized: Only super admin or the creator of this product can update it!"
          }));
        case 3:
          _req$body2 = req.body, title = _req$body2.title, price = _req$body2.price, stars = _req$body2.stars, rates = _req$body2.rates, discount = _req$body2.discount, quantity = _req$body2.quantity, type = _req$body2.type, details = _req$body2.details, categoryName = _req$body2.categoryName, expirationDate = _req$body2.expirationDate, moq = _req$body2.moq, unit = _req$body2.unit;
          if (req.files && req.files.length > 0) {
            product.images = req.files.map(function (img) {
              return img.path;
            });
          }
          if (!categoryName) {
            _context2.n = 6;
            break;
          }
          _context2.n = 4;
          return _Category.Category.findOne({
            name: categoryName
          });
        case 4:
          category = _context2.v;
          if (category) {
            _context2.n = 5;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Category not found!"
          }));
        case 5:
          product.category = category._id;
        case 6:
          product.title = title || product.title;
          product.price = price || product.price;
          product.moq = moq || product.moq;
          product.stars = stars || product.stars;
          product.rates = rates || product.rates;
          product.discount = discount || product.discount;
          product.quantity = quantity || product.quantity;
          product.type = type || product.type;
          product.details = details || product.details;
          product.expirationDate = expirationDate || product.expirationDate;
          product.unit = unit || product.unit;
          _context2.n = 7;
          return product.save();
        case 7:
          updatedProduct = _context2.v;
          return _context2.a(2, res.status(200).json({
            product: updatedProduct,
            message: "Product updated successfully!"
          }));
        case 8:
          _context2.p = 8;
          _t2 = _context2.v;
          console.error("Error updating product:", _t2);
          return _context2.a(2, res.status(500).json({
            message: "Internal server error!",
            error: _t2.message
          }));
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function updateProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getProductById = exports.getProductById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var prodId, product, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          prodId = req.params._id;
          _context3.n = 1;
          return _Product.Product.findById(prodId).populate("category", "name").exec();
        case 1:
          product = _context3.v;
          if (product) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "Product not Found!"
          }));
        case 2:
          return _context3.a(2, res.status(200).json(product));
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          return _context3.a(2, res.status(500).json({
            message: "internal server error!!"
          }));
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function getProductById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllProducts = exports.getAllProducts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var products, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return _Product.Product.find();
        case 1:
          products = _context4.v;
          return _context4.a(2, res.status(200).json(products));
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
          return _context4.a(2, res.status(500).json({
            message: "internal server error!!"
          }));
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getAllProducts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getProductsByCategory = exports.getProductsByCategory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var categoryName, category, products, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          console.log("accessed");
          _context5.p = 1;
          categoryName = req.params.categoryName; // Find the category by name
          _context5.n = 2;
          return _Category.Category.findOne({
            name: categoryName
          });
        case 2:
          category = _context5.v;
          if (category) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: "Category not found!"
          }));
        case 3:
          _context5.n = 4;
          return _Product.Product.find({
            category: category._id
          });
        case 4:
          products = _context5.v;
          return _context5.a(2, res.status(200).json(products));
        case 5:
          _context5.p = 5;
          _t5 = _context5.v;
          console.error("Error fetching products by category:", _t5);
          return _context5.a(2, res.status(500).json({
            message: "Internal server error!"
          }));
      }
    }, _callee5, null, [[1, 5]]);
  }));
  return function getProductsByCategory(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var searchProducts = exports.searchProducts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _req$query, title, minPrice, maxPrice, categoryName, stars, minQuantity, discount, query, allProducts, searcher, fuzzyTitleResults, matchedTitles, allCategories, categorySearcher, fuzzyCategoryResults, matchedCategory, products, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.p = 0;
          _req$query = req.query, title = _req$query.title, minPrice = _req$query.minPrice, maxPrice = _req$query.maxPrice, categoryName = _req$query.categoryName, stars = _req$query.stars, minQuantity = _req$query.minQuantity, discount = _req$query.discount;
          query = {}; // Fuzzy search for the title
          if (!title) {
            _context6.n = 3;
            break;
          }
          _context6.n = 1;
          return _Product.Product.find({}, 'title');
        case 1:
          allProducts = _context6.v;
          // Get all product titles
          searcher = new _fuzzySearch["default"](allProducts, ['title'], {
            caseSensitive: false
          });
          fuzzyTitleResults = searcher.search(title); // Perform fuzzy search
          if (!(fuzzyTitleResults.length === 0)) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "No products found with the given title!"
          }));
        case 2:
          // Extract all matched product IDs
          matchedTitles = fuzzyTitleResults.map(function (result) {
            return result._id;
          });
          query._id = {
            $in: matchedTitles
          }; // Filter products based on matched titles
        case 3:
          // Price range search
          if (minPrice && maxPrice) {
            query.price = {
              $gte: minPrice,
              $lte: maxPrice
            };
          } else if (minPrice) {
            query.price = {
              $gte: minPrice
            };
          } else if (maxPrice) {
            query.price = {
              $lte: maxPrice
            };
          }

          // Fuzzy search for the category name
          if (!categoryName) {
            _context6.n = 6;
            break;
          }
          _context6.n = 4;
          return _Category.Category.find({}, 'name');
        case 4:
          allCategories = _context6.v;
          // Get all category names
          categorySearcher = new _fuzzySearch["default"](allCategories, ['name'], {
            caseSensitive: false
          });
          fuzzyCategoryResults = categorySearcher.search(categoryName); // Perform fuzzy search
          if (!(fuzzyCategoryResults.length === 0)) {
            _context6.n = 5;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "Category not found!"
          }));
        case 5:
          matchedCategory = fuzzyCategoryResults[0]; // Pick the best match
          query.category = matchedCategory._id; // Add the matched category's ID to the query
        case 6:
          // Quantity filter
          if (minQuantity) {
            query.quantity = {
              $gte: minQuantity
            };
          }

          // Discount filter (case-insensitive)
          if (discount) {
            query.discount = {
              $regex: discount,
              $options: "i"
            };
          }

          // Fetch products based on the query
          _context6.n = 7;
          return _Product.Product.find(query).populate("category", "name").exec();
        case 7:
          products = _context6.v;
          return _context6.a(2, res.status(200).json(products));
        case 8:
          _context6.p = 8;
          _t6 = _context6.v;
          console.error("Error searching products:", _t6.message);
          return _context6.a(2, res.status(500).json({
            message: _t6.message
          }));
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function searchProducts(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();