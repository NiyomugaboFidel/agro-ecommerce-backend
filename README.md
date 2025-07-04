# abbas-ecomm-bn
# Agro-Ecommerce 🌱

A robust Node.js/Express backend for an agricultural e-commerce platform, supporting user authentication, product management, order processing, payments (Stripe), statistics, and real-time updates. Built with MongoDB, Passport, Socket.IO, and modern best practices for seamless agricultural commerce.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Seeding Data](#seeding-data)
- [Socket.IO Events](#socketio-events)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Authentication & Authorization**: JWT tokens, Google OAuth integration
- **Role-Based Access Control**: Client, manager, and superAdmin roles
- **Product Management**: Full CRUD operations for agricultural products and categories
- **Shopping Experience**: Cart, wishlist, and order management
- **Payment Processing**: Stripe integration with checkout, webhooks, and refunds
- **Real-Time Updates**: Socket.IO for live wishlist and cart synchronization
- **Communication**: Email notifications for orders, password resets, and role requests
- **Analytics**: Comprehensive statistics and analytics endpoints
- **Security**: Secure session and cookie management
- **Scalability**: Modular, maintainable codebase architecture

## 📁 Project Structure

```
agro-ecommerce/
├── src/
│   ├── config/         # Configurations (Cloudinary, Multer, Passport, Google Auth)
│   ├── controllers/    # Route controllers (auth, admin, product, order, payment, etc.)
│   ├── middlewares/    # Express middlewares (auth, role, OTP, etc.)
│   ├── models/         # Mongoose models (User, Product, Order, etc.)
│   ├── routes/         # Express routers (API endpoints)
│   ├── seeders/        # Seed scripts for admin, products, categories
│   ├── services/       # Business logic (user service, etc.)
│   ├── utils/          # Utility functions (email, bcrypt, token, etc.)
│   └── index.js        # App entry point
├── package.json        # Dependencies and scripts
├── .env                # Environment variables (not committed)
├── .babelrc            # Babel configuration
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB (local installation or MongoDB Atlas)
- Stripe account for payment processing
- Email service (Gmail recommended for SMTP)

### Installation

```bash
git clone <repository-url>
cd agro-ecommerce
npm install
```

### Running the Application

```bash
# Development mode with auto-reload
npm start

# Build for production
npm run build
```

The server will start on the port specified in your environment variables (default: 4000).

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
# Server Configuration
PORT=4000
MONGO_DATABASE=mongodb://127.0.0.1:27017/agro-ecommerce
JWT_SECRET=your_super_secure_jwt_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:3000

# Stripe Payment Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALL_BACK_URL=http://localhost:3000/home

# Cloudinary Configuration (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_KEY_SECRET=your_cloudinary_api_secret

# Email Configuration (SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_email_password
```

## 🛠 API Endpoints

All API endpoints are prefixed with `/api/v1`.

### Authentication & User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/users/signup` | Register new user | Public |
| `POST` | `/users/login` | User login | Public |
| `GET` | `/users/me` | Get current user info | Private |
| `POST` | `/users/reset-password` | Request password reset | Public |
| `PATCH` | `/users/reset-password/:token` | Reset password with token | Public |
| `PUT` | `/users/update-profile` | Update user profile | Private |
| `POST` | `/users/request-role` | Request manager role | Private |
| `PATCH` | `/users/update-role/:_id` | Update user role | Admin |
| `GET` | `/users/` | List all users | Admin |

### Products & Categories

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/categories/` | Create new category | Admin/Manager |
| `GET` | `/categories/` | List all categories | Public |
| `POST` | `/products/` | Create new product | Admin/Manager |
| `GET` | `/products/` | List all products | Public |
| `GET` | `/products/search` | Search products | Public |
| `GET` | `/products/category/:categoryName` | Products by category | Public |
| `GET` | `/products/:_id` | Get product details | Public |
| `PUT` | `/products/:_id` | Update product | Admin/Manager |

### Shopping Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/carts/:_id/add` | Add product to cart | Private |
| `GET` | `/carts/` | Get user's cart | Private |
| `DELETE` | `/carts/remove/:_id` | Remove item from cart | Private |
| `DELETE` | `/carts/clear` | Clear entire cart | Private |

### Wishlist

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/product-wishes/all` | Get user's wishlist | Private |
| `POST` | `/product-wishes/:_id` | Add to wishlist | Private |
| `DELETE` | `/product-wishes/:_id` | Remove from wishlist | Private |
| `POST` | `/product-wishes/move-all` | Move all items to cart | Private |
| `POST` | `/product-wishes/add-to-cart/:_id` | Move single item to cart | Private |

### Order Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/orders/` | Create new order | Private |
| `GET` | `/orders/user` | Get user's orders | Private |
| `GET` | `/orders/all` | Get all orders | Admin/Manager |
| `GET` | `/orders/delivers` | Get delivered orders | Admin/Manager |
| `PATCH` | `/orders/:_id` | Update order status | Admin/Manager |
| `PATCH` | `/orders/:_id/cancel` | Cancel order | Private |
| `PATCH` | `/orders/:_id/delivers` | Mark as delivered | Admin/Manager |
| `GET` | `/orders/:_id` | Get order details | Private |

### Payment Processing (Stripe)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/stripe/create-payment-session` | Create Stripe checkout session | Private |
| `POST` | `/stripe/webhook` | Handle Stripe webhooks | Public |
| `GET` | `/stripe/session/:sessionId` | Get payment session details | Private |
| `POST` | `/stripe/refund` | Process refund | Admin/Manager |
| `GET` | `/stripe/orders/status/:status` | Orders by payment status | Admin/Manager |
| `GET` | `/stripe/pending` | Get pending payments | Admin/Manager |

### Statistics & Analytics

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/statistics/` | Get platform statistics | Admin/Manager |

## 🌱 Seeding Data

The application automatically seeds essential data on first run:

- **Admin User**: Creates a default admin account
- **Sample Categories**: Agricultural product categories (seeds, fertilizers, tools, etc.)
- **Sample Products**: Demo agricultural products for testing

Seeding scripts are located in the `src/seeders/` directory and can be customized as needed.

## 🔄 Socket.IO Events

Real-time functionality is powered by Socket.IO:

| Event | Description |
|-------|-------------|
| `joinRoom` | Join user-specific room for personalized updates |
| `wishlistUpdated` | Broadcast wishlist changes to user |
| `cartUpdated` | Broadcast cart modifications to user |

## 🧪 Testing

Set up your testing environment:

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

Create test files in a `tests/` directory following the existing project structure.

## 🤝 Contributing

We welcome contributions to improve Agro-Ecommerce! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/YourAmazingFeature`
3. **Commit your changes**: `git commit -am 'Add amazing new feature'`
4. **Push to the branch**: `git push origin feature/YourAmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

---

**Built with ❤️ for sustainable agriculture and modern e-commerce solutions.**

For questions, issues, or contributions, please visit our [GitHub repository](https://github.com/your-username/agro-ecommerce).