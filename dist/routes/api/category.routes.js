"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _checkUserWithToken = _interopRequireDefault(require("../../middlewares/checkUserWithToken"));
var _categories = require("../../controllers/categories.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.post("/", _checkUserWithToken["default"], _categories.createCategory);
router.get("/", _categories.getAllCategories);
router.put("/:_id", _checkUserWithToken["default"], _categories.updateCategory);
router["delete"]("/:_id", _checkUserWithToken["default"], _categories.deleteCategory);
router.get("/:_id", _categories.getCategoryById);
var _default = exports["default"] = router;