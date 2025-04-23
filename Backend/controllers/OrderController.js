const db = require('../DbSetup/MySqlConnection');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    console.log('Fetching all orders...');
    const [results] = await db.query('SELECT * FROM orders');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM orders WHERE order_id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      user_id,
      total_amount,
      status,
      payment_method,
      shipping_address,
      shipping_cost,
      tracking_number,
    } = req.body;

    const [results] = await db.query(
      `INSERT INTO orders 
        (user_id, order_date, total_amount, status, payment_method, shipping_address, shipping_cost, tracking_number) 
        VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        total_amount,
        status,
        payment_method,
        shipping_address,
        shipping_cost,
        tracking_number,
      ]
    );

    res.status(201).json({ message: 'Order created', order_id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      order_date,
      total_amount,
      status,
      payment_method,
      shipping_address,
      shipping_cost,
      tracking_number,
    } = req.body;

    const [result] = await db.query(
      `UPDATE orders SET 
        user_id = ?, 
        order_date = ?, 
        total_amount = ?, 
        status = ?, 
        payment_method = ?, 
        shipping_address = ?, 
        shipping_cost = ?, 
        tracking_number = ? 
      WHERE order_id = ?`,
      [
        user_id,
        order_date,
        total_amount,
        status,
        payment_method,
        shipping_address,
        shipping_cost,
        tracking_number,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM orders WHERE order_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// order_items


// Get all order items
exports.getAllOrderItems = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM order_items');
    res.json({
      success: true,
      message: 'Order items fetched successfully.',
      data: results
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order items.',
      error: err.message
    });
  }
};


// Get order items by order_id
exports.getOrderItemsByOrderId = async (req, res) => {
  const { order_id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [order_id]);
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create a new order item
exports.createOrderItem = async (req, res) => {
  const { order_id, perfume_id, request_id, quantity, unit_price } = req.body;
  const subtotal = quantity * unit_price;

  try {
    const [result] = await db.query(
      `INSERT INTO order_items (order_id, perfume_id, request_id, quantity, unit_price, subtotal)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [order_id, perfume_id, request_id, quantity, unit_price, subtotal]
    );
    res.status(201).json({
      success: true,
      message: 'Order item created',
      order_item_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an order item
exports.updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { perfume_id, request_id, quantity, unit_price } = req.body;
  const subtotal = quantity * unit_price;

  try {
    const [result] = await db.query(
      `UPDATE order_items
       SET perfume_id = ?, request_id = ?, quantity = ?, unit_price = ?, subtotal = ?
       WHERE order_item_id = ?`,
      [perfume_id, request_id, quantity, unit_price, subtotal, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Order item not found' });
    }

    res.json({ success: true, message: 'Order item updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete an order item
exports.deleteOrderItem = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM order_items WHERE order_item_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Order item not found' });
    }

    res.json({ success: true, message: 'Order item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
