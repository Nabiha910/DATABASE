const db = require('../DbSetup/MySqlConnection');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');
    res.json({
      success: true,
      message: 'Users fetched successfully.',
      data: results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching users.', error: err.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User fetched successfully.',
      data: results[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user.', error: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const [result] = await db.query(
      'INSERT INTO users (name, email, phone, address, password, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, email, phone, address, password]
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      user_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating user.', error: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, password } = req.body;

    const [result] = await db.query(
      `UPDATE users 
       SET name = ?, email = ?, phone = ?, address = ?, password = ?
       WHERE user_id = ?`,
      [name, email, phone, address, password, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: `No user found with ID ${id}` });
    }

    res.json({
      success: true,
      message: 'User updated successfully.',
      updatedUser: {
        user_id: id,
        name,
        email,
        phone,
        address,
        password,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating user.', error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'No user found with that ID' });
    }

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting user.', error: err.message });
  }
};
