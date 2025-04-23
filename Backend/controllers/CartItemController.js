const db = require('../DbSetup/MySqlConnection');

// Get all cart items
exports.getAllCartItems = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM cart_items');
    res.json({ success: true, message: 'Cart items fetched.', data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching cart items.', error: err.message });
  }
};

// Get cart items for a specific user
exports.getCartItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const [results] = await db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user cart.', error: err.message });
  }
};

// Add item to cart
exports.addCartItems = async (req, res) => {
  try {
    const { user_id, perfume_id, request_id, quantity } = req.body;
    const [result] = await db.query(
      `INSERT INTO cart_items (user_id, perfume_id, request_id, quantity, added_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [user_id, perfume_id, request_id, quantity]
    );
    res.status(201).json({ success: true, message: 'Item added to cart.', cart_item_id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding item.', error: err.message });
  }
};

// Update a cart item
exports.updateCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const [result] = await db.query(
      'UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?',
      [quantity, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }
    res.json({ success: true, message: 'Cart item updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating item.', error: err.message });
  }
};

// Delete cart item
exports.deleteCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM cart_items WHERE cart_item_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }
    res.json({ success: true, message: 'Cart item deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting item.', error: err.message });
  }
};
