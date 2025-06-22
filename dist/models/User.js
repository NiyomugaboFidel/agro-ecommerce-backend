"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userSchema = new _mongoose["default"].Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    "default": 'client',
    "enum": ["client", "manager", "superAdmin"]
  },
  password: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  profilePic: {
    type: String,
    "default": 'https://res.cloudinary.com/dd92qmql1/image/upload/v1688126539/DEV/user_3_nec6s8.png'
  },
  location: {
    province: {
      type: String
    },
    city: {
      type: String
    },
    street: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  isActive: {
    type: Boolean,
    "default": true
  },
  provider: {
    type: String
  }
}, {
  timestamps: true
});
var User = _mongoose["default"].model('User', userSchema);
var _default = exports["default"] = User;