"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _statistics = require("../../controllers/statistics.controller");
var router = (0, _express.Router)();
router.get("/", _statistics.Statistics);
var _default = exports["default"] = router;