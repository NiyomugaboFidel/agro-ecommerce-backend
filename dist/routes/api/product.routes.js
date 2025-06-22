"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _checkUserWithToken = _interopRequireDefault(require("../../middlewares/checkUserWithToken"));
var _product = require("../../controllers/product.controller");
var _arrayImagesUploader = require("../../config/arrayImagesUploader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.post('/', _checkUserWithToken["default"], (0, _arrayImagesUploader.uploadArray)("images"), _product.createProduct);
router.get("/search", _product.searchProducts);
router.get('/', _product.getAllProducts);
router.get('/category/:categoryName', _product.getProductsByCategory);
router.get('/:_id', _product.getProductById);
router.put('/:_id', _checkUserWithToken["default"], (0, _arrayImagesUploader.uploadArray)("images"), _product.updateProduct);
var _default = exports["default"] = router;