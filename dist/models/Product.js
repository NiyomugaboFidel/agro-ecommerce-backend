"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Enum for product units
var unitsEnum = ["kg",
// Kilograms
"g",
// Grams
"lb",
// Pounds
"l",
// Liters
"ml",
// Milliliters
"m",
// Meters
"cm",
// Centimeters
"pcs",
// Pieces
"box",
// Box
"dozen",
// Dozen
"bottle",
// Bottle
"packet" // Packet
];
var productSchema = new _mongoose["default"].Schema({
  images: {
    type: [String],
    "default": []
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    "default": 0
  },
  rates: {
    type: Number,
    "default": 0
  },
  discount: {
    type: String,
    "default": ""
  },
  quantity: {
    type: Number,
    "default": 0
  },
  moq: {
    type: Number,
    "default": 1,
    min: 1
  },
  unit: {
    type: String,
    "enum": unitsEnum,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  category: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Category"
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  orderCount: {
    type: Number,
    "default": 0
  },
  expirationDate: {
    type: Date
  },
  isExpired: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
productSchema.pre("save", function (next) {
  this.isExpired = this.expirationDate < Date.now();
  next();
});
var Product = exports.Product = _mongoose["default"].model("Product", productSchema);