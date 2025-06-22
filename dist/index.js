"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _socket = require("socket.io");
var _http = require("http");
require("dotenv/config");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _paymentRoutes = _interopRequireDefault(require("./routes/api/payment.routes.js"));
var _cors = _interopRequireDefault(require("cors"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _productseeds = _interopRequireDefault(require("./seeders/productseeds"));
var _AdminSeeder = _interopRequireDefault(require("./seeders/AdminSeeder.js"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _paymentController = require("./controllers/payment.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Import Stripe routes

// Validate environment variables
var requiredEnvVars = ['MONGO_DATABASE', 'SESSION_SECRET', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
for (var _i = 0, _requiredEnvVars = requiredEnvVars; _i < _requiredEnvVars.length; _i++) {
  var envVar = _requiredEnvVars[_i];
  if (!process.env[envVar]) {
    throw new Error("Missing required environment variable: ".concat(envVar));
  }
}

// Initialize the express app
var app = (0, _express["default"])();
app.post('/api/v1/stripe/webhook', _express["default"].raw({
  type: 'application/json'
}), _paymentController.stripeWebhook);
// Middlewares
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
// CORS configuration
app.use((0, _cors["default"])({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "stripe-signature"]
}));
var httpServer = (0, _http.createServer)(app);
var io = new _socket.Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true
  }
});

// Attach Socket.IO to req object for use in routes
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// WebSocket event listeners
io.on("connection", function (socket) {
  console.log("User connected:", socket.id);
  socket.on("joinRoom", function (userId) {
    socket.join(userId);
    console.log("User ".concat(userId, " joined room ").concat(userId));
  });
  socket.on("disconnect", function () {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to MongoDB
var connect = function connect() {
  _mongoose["default"].connect(process.env.MONGO_DATABASE).then(function () {
    console.log("Connected to MongoDB");
    (0, _AdminSeeder["default"])();
    (0, _productseeds["default"])();
  })["catch"](function (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
};

// Trust proxy for production deployments
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Middlewares
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// IMPORTANT: Stripe webhook route must be defined BEFORE express.json() middleware
// This is because Stripe webhooks need the raw body
app.use('/api/v1/stripe', _paymentRoutes["default"]);

// JSON parsing middleware (after Stripe webhook route)
app.use(_express["default"].json({
  limit: '10mb'
}));
app.use(_express["default"].urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('combined'));

// Session configuration
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// Health check endpoint
app.get('/health', function (req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
try {
  app.use('/api/v1', _index["default"]);
} catch (error) {
  console.error('Error setting up routes:', error);
}

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', function (req, res) {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start the server
var port = process.env.PORT || 3000;
httpServer.listen(port, function () {
  connect();
  console.log("\uD83D\uDE80 Server running at http://localhost:".concat(port));
  console.log("\uD83D\uDCCA Environment: ".concat(process.env.NODE_ENV || 'development'));
});

// Graceful shutdown
var gracefulShutdown = function gracefulShutdown(signal) {
  console.log("\n".concat(signal, " received. Shutting down gracefully..."));
  httpServer.close(function () {
    console.log('HTTP server closed');
    _mongoose["default"].connection.close(function () {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });

  // Force close after 10 seconds
  setTimeout(function () {
    console.error('Forced shutdown');
    process.exit(1);
  }, 10000);
};
process.on('SIGTERM', function () {
  return gracefulShutdown('SIGTERM');
});
process.on('SIGINT', function () {
  return gracefulShutdown('SIGINT');
});

// Handle uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', function (reason, promise) {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
var _default = exports["default"] = app;