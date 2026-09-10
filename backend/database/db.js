const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_FILE || path.join(__dirname, 'shopease.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

function initDatabase() {
  // Create Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'Placed',
      shipping_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Create Order Items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  // Seed Products if table is empty
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM products');
  const { count } = countStmt.get();

  if (count === 0) {
    console.log('Seeding initial products into database...');
    const insertProduct = db.prepare(`
      INSERT INTO products (name, description, price, image, category, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const seedProducts = [
      {
        name: 'Wireless Noise-Canceling Headphones',
        description: 'Immerse yourself in rich, high-fidelity sound with dynamic noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        category: 'Electronics',
        stock: 25
      },
      {
        name: 'Smart Fitness Tracker Watch',
        description: 'Track your heart rate, sleep quality, workout routines, and phone notifications with a sleek AMOLED touch display and 10-day battery.',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        category: 'Electronics',
        stock: 18
      },
      {
        name: 'Waterproof Bluetooth Speaker',
        description: 'Take deep 360-degree bass anywhere. IPX7 waterproof design, perfect for beach trips, outdoor parties, and indoor listening.',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        category: 'Electronics',
        stock: 30
      },
      {
        name: 'RGB Mechanical Gaming Keyboard',
        description: 'Tactile mechanical switches with customizable per-key RGB backlighting, durable aluminum chassis, and detachable Type-C cable.',
        price: 4299,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
        category: 'Electronics',
        stock: 12
      },
      {
        name: 'Ergonomic 7-in-1 USB-C Hub',
        description: 'Expand your laptop connectivity with 4K HDMI, 100W Power Delivery, SD/TF card readers, and triple high-speed USB 3.0 ports.',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1616440342903-c47f1078f62f?w=800&q=80',
        category: 'Electronics',
        stock: 40
      },
      {
        name: 'Premium Leather Laptop Backpack',
        description: 'Handcrafted water-resistant leather backpack featuring a padded 15.6-inch laptop sleeve, hidden anti-theft pocket, and ergonomic straps.',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        category: 'Accessories',
        stock: 15
      },
      {
        name: 'Insulated Stainless Steel Bottle',
        description: 'Keep drinks icy cold for 24 hours or piping hot for 12 hours. BPA-free food grade 18/8 stainless steel with leak-proof cap.',
        price: 799,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        category: 'Accessories',
        stock: 50
      },
      {
        name: 'Aluminum Desk Phone Stand',
        description: 'Heavy-duty adjustable stand for smartphones and tablets. Rubber pads protect devices while keeping charging cables organized.',
        price: 599,
        image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
        category: 'Accessories',
        stock: 35
      },
      {
        name: 'Classic Urban Running Sneakers',
        description: 'Ultra-lightweight breathable mesh shoes with responsive cushioning sole for supreme daily comfort, walking, and workout sessions.',
        price: 3299,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        category: 'Fashion',
        stock: 20
      },
      {
        name: 'Organic Cotton Casual T-Shirt',
        description: '100% combed organic cotton shirt engineered for superior softness, breathable fit, and long-lasting durability.',
        price: 699,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
        category: 'Fashion',
        stock: 60
      },
      {
        name: 'Polarized Retro Sunglasses',
        description: 'UV400 protection polarized lenses with lightweight vintage alloy frame. Eliminates glare for crisp visual clarity.',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
        category: 'Fashion',
        stock: 22
      },
      {
        name: 'Nordic Dimmable LED Desk Lamp',
        description: 'Modern minimalist table lamp with 3 color temperatures, continuous touch dimming, and built-in USB charging port.',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
        category: 'Home',
        stock: 14
      },
      {
        name: 'Artisan Ceramic Coffee Mug',
        description: 'Handcrafted stoneware mug with heat-insulating handle. 400ml capacity for coffee, tea, and espresso lovers.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
        category: 'Home',
        stock: 45
      },
      {
        name: 'Aromatherapy Essential Oil Diffuser',
        description: 'Ultrasonic cool mist humidifier with 7 soothing ambient LED lighting colors and automatic safety shut-off.',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
        category: 'Home',
        stock: 28
      }
    ];

    const insertMany = db.transaction((products) => {
      for (const item of products) {
        insertProduct.run(item.name, item.description, item.price, item.image, item.category, item.stock);
      }
    });

    insertMany(seedProducts);
    console.log('Database seeded successfully with 14 products.');
  }
}

initDatabase();

module.exports = db;
