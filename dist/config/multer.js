"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _cloudinary = _interopRequireDefault(require("./cloudinary"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var fileFilter = function fileFilter(req, file, cb) {
  var allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({
      message: 'Unsupported File Format'
    }, false);
  }
};
var upload = (0, _multer["default"])({
  storage: _cloudinary["default"],
  fileFilter: fileFilter
});
var _default = exports["default"] = upload;