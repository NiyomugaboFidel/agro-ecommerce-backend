"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cloudinary = require("cloudinary");
var _multerStorageCloudinary = require("multer-storage-cloudinary");
require("dotenv/config");
_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_KEY_SECRET
});
var storage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: _cloudinary.v2,
  params: {
    folder: 'DEV'
  }
});
var _default = exports["default"] = storage;