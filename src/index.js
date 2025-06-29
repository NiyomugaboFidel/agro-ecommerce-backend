import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";
import stripeRoutes from "./routes/api/payment.routes.js"; // Import Stripe routes
import cors from "cors";
import passport from 'passport';
import session from 'express-session';
import productSeeder from "./seeders/productseeds";
import seedData from "./seeders/AdminSeeder.js";
import bodyParser from "body-parser";
import { stripeWebhook } from "./controllers/payment.controller.js";

// Validate environment variables
const requiredEnvVars = [
    'MONGO_DATABASE', 
    'SESSION_SECRET', 
    'STRIPE_SECRET_KEY', 
    'STRIPE_WEBHOOK_SECRET'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

// Initialize the express app
const app = express();

// IMPORTANT: Stripe webhook route must be defined BEFORE express.json() middleware
// This is because Stripe webhooks need the raw body
app.post('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "stripe-signature"]
}));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials: true
    }
});

// Attach Socket.IO to req object for use in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// WebSocket event listeners
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Connect to MongoDB
const connect = () => {
    mongoose
        .connect(process.env.MONGO_DATABASE)
        .then(() => {
            console.log("Connected to MongoDB");
            seedData();
            productSeeder(); 
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB', err);
            process.exit(1);
        });
};

// Trust proxy for production deployments
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Basic middlewares
app.use(cookieParser());
app.use(morgan('combined'));

// JSON parsing middleware (after Stripe webhook route)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Stripe routes (must come before other routes that use express.json())
app.use('/api/v1/stripe', stripeRoutes);

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
try {
    app.use('/api/v1', allRoutes);
} catch (error) {
    console.error('Error setting up routes:', error);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl 
    });
});

// Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    connect();
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    
    httpServer.close(async () => {
        console.log('HTTP server closed');
        
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        } catch (err) {
            console.error('Error closing MongoDB connection:', err);
            process.exit(1);
        }
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
        console.error('Forced shutdown');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

export default app;