# ShopEase – Full Stack E-Commerce Store

[![Full Stack](https://img.shields.io/badge/Full%20Stack-React%20%7C%20Node%20%7C%20Express%20%7C%20SQLite-4f46e5)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Developed as part of the **CodeAlpha Full Stack Development Internship (Task 1)**.

**ShopEase** is a modern, responsive, and functional full-stack e-commerce web application. It features a modern user interface, real-time product browsing, search & filtering, quantity-managed shopping cart, user registration & JWT-based authentication, backend-validated order processing, stock deduction, and user order history.

---

## 🚀 Key Features

- **Product Catalog & Details**: Browse products across multiple categories (Electronics, Fashion, Home, Accessories) with real-time stock status, pricing in Indian Rupees (₹), and detailed product pages.
- **Search, Filter & Sort**: Live instant search by product name/description, category filtering, and price sorting (Low to High, High to Low).
- **Persistent Shopping Cart**: Add products, adjust quantities (capped at available inventory stock), remove items, clear cart, and persist cart state across page reloads.
- **User Authentication**: User registration and login using **JWT (JSON Web Tokens)** stored in browser localStorage with **bcrypt** password hashing on the backend.
- **Backend-Calculated Order Checkout**: Order totals (subtotal, ₹50 flat delivery fee, grand total) are calculated on the backend from database values to prevent price tampering.
- **Atomic Stock Deduction**: Order placement automatically updates inventory stock in the SQLite database within a database transaction.
- **Order History**: Authenticated users can view their past orders with order status ("Placed"), timestamps, item breakdown, and delivery addresses.
- **Modern Responsive Design**: Built with custom Vanilla CSS variables, glassmorphism card UI, responsive navigation drawer, loading skeletons, and interactive micro-animations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (v18) with Vite
- **Routing**: React Router (v6)
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS (Design Tokens, Responsive Grid, Custom Components)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (`better-sqlite3`)
- **Authentication**: JWT (`jsonwebtoken`)
- **Security**: `bcryptjs` for password hashing, `cors`, parameterized SQL queries

---

## 📂 Project Structure

```
ShopEase/
├── backend/
│   ├── database/
│   │   ├── db.js              # SQLite connection, schema creation & seeding
│   │   └── shopease.db        # SQLite persistent database file
│   ├── middleware/
│   │   └── auth.js            # JWT Authentication middleware
│   ├── controllers/
│   │   ├── authController.js   # User registration, login, profile
│   │   ├── productController.js# Product listing, search, filter, details
│   │   └── orderController.js  # Order placement, validation & history
│   ├── routes/
│   │   ├── authRoutes.js      # Auth API endpoints
│   │   ├── productRoutes.js   # Product API endpoints
│   │   └── orderRoutes.js     # Protected Order API endpoints
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example environment template
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express server startup
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, ProductCard, ProtectedRoute
│   │   ├── context/           # AuthContext & CartContext
│   │   ├── pages/             # Home, Products, ProductDetails, Cart, Login, Register, Checkout, OrderSuccess, MyOrders, NotFound
│   │   ├── services/          # Fetch API client wrapper
│   │   ├── App.jsx            # Main App container & Route definitions
│   │   ├── index.css          # Design system stylesheet
│   │   └── main.jsx           # React DOM root entry
│   ├── index.html             # HTML5 template
│   ├── vite.config.js         # Vite configuration & proxy settings
│   └── package.json           # Frontend dependencies
│
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules
```

---

## 🗄️ Database Structure

ShopEase uses SQLite with foreign-key integrity:

### 1. `users`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `name` (TEXT)
- `email` (TEXT UNIQUE)
- `password` (TEXT - bcrypt hashed)
- `created_at` (DATETIME)

### 2. `products`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `name` (TEXT)
- `description` (TEXT)
- `price` (REAL - INR)
- `image` (TEXT - URL)
- `category` (TEXT)
- `stock` (INTEGER)
- `created_at` (DATETIME)

### 3. `orders`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `user_id` (INTEGER FK -> users.id)
- `total_amount` (REAL)
- `status` (TEXT DEFAULT 'Placed')
- `shipping_address` (TEXT)
- `created_at` (DATETIME)

### 4. `order_items`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `order_id` (INTEGER FK -> orders.id)
- `product_id` (INTEGER FK -> products.id)
- `quantity` (INTEGER)
- `price` (REAL)

---

## 🔌 API Endpoints

### Auth API
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user & return JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes (Bearer Token) |

### Products API
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Get products (query: `search`, `category`, `sort`) | No |
| `GET` | `/api/products/:id` | Get single product details | No |

### Orders API
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Create order, reduce stock & clear cart | Yes (Bearer Token) |
| `GET` | `/api/orders` | Get user order history | Yes (Bearer Token) |
| `GET` | `/api/orders/:id` | Get single order details | Yes (Bearer Token) |

---

## ⚙️ Installation & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ShopEase.git
cd ShopEase
```

### 2. Set Up & Start Backend Server
```bash
cd backend
npm install
npm start
```
The backend server will run at: `http://localhost:5000` (and automatically create & seed `shopease.db`).

### 3. Set Up & Start Frontend Application
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend web application will run at: `http://localhost:3000`.

---

## 🧪 Demo Test Credentials

To test out-of-the-box:
- **Email**: `intern@shopease.com`
- **Password**: `password123`

*(Or simply register a new account on the `/register` page).*

---

## 🔮 Future Improvements
- Integration of a live payment gateway (Razorpay / Stripe).
- Admin Panel for product management and order status updates.
- User profile editing and address book persistence.
- Product reviews and rating system.

---

## 👤 Author

**Ria Bhagat**  
Full Stack Development Intern @ **CodeAlpha**  
- GitHub: [github.com/RiaBhagat](https://github.com/)  
- LinkedIn: [linkedin.com/in/RiaBhagat](https://linkedin.com/)
