const db = require('../database/db');

const DELIVERY_FEE = 50;

exports.createOrder = (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Cannot place order.' });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ message: 'Shipping address, city, and pincode are required.' });
    }

    // Prepare statements
    const getProductStmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const updateStockStmt = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
    const insertOrderStmt = db.prepare(`
      INSERT INTO orders (user_id, total_amount, status, shipping_address)
      VALUES (?, ?, 'Placed', ?)
    `);
    const insertOrderItemStmt = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    // Verify stock and compute total from database prices (never trust frontend totals)
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = getProductStmt.get(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ID ${item.productId} not found.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}". Only ${product.stock} left in stock.`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        productId: product.id,
        name: product.name,
        image: product.image,
        unitPrice: product.price,
        quantity: item.quantity,
        total: itemTotal
      });
    }

    const totalAmount = subtotal + DELIVERY_FEE;
    const formattedAddress = `${shippingAddress.fullName || req.user.name}, ${shippingAddress.address}, ${shippingAddress.city} - ${shippingAddress.pincode} (Phone: ${shippingAddress.phone || 'N/A'})`;

    // Execute in a database transaction
    const executeOrderTransaction = db.transaction(() => {
      // 1. Create order record
      const orderResult = insertOrderStmt.run(userId, totalAmount, formattedAddress);
      const orderId = orderResult.lastInsertRowid;

      // 2. Insert order items & reduce stock
      for (const item of processedItems) {
        insertOrderItemStmt.run(orderId, item.productId, item.quantity, item.unitPrice);
        updateStockStmt.run(item.quantity, item.productId);
      }

      return orderId;
    });

    const orderId = executeOrderTransaction();

    res.status(201).json({
      message: 'Order placed successfully!',
      order: {
        id: orderId,
        userId,
        subtotal,
        deliveryFee: DELIVERY_FEE,
        totalAmount,
        status: 'Placed',
        shippingAddress: formattedAddress,
        items: processedItems,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to process order. Please try again.' });
  }
};

exports.getUserOrders = (req, res) => {
  try {
    const userId = req.user.id;

    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC
    `).all(userId);

    const getItemsStmt = db.prepare(`
      SELECT oi.*, p.name as product_name, p.image as product_image, p.category as product_category
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `);

    const fullOrders = orders.map((order) => {
      const items = getItemsStmt.all(order.id);
      return {
        id: order.id,
        userId: order.user_id,
        totalAmount: order.total_amount,
        status: order.status,
        shippingAddress: order.shipping_address,
        createdAt: order.created_at,
        items
      };
    });

    res.json(fullOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Unable to load orders.' });
  }
};

exports.getOrderById = (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = db.prepare(`
      SELECT * FROM orders WHERE id = ? AND user_id = ?
    `).get(id, userId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const items = db.prepare(`
      SELECT oi.*, p.name as product_name, p.image as product_image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(order.id);

    res.json({
      id: order.id,
      userId: order.user_id,
      totalAmount: order.total_amount,
      status: order.status,
      shippingAddress: order.shipping_address,
      createdAt: order.created_at,
      items
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Unable to load order details.' });
  }
};
