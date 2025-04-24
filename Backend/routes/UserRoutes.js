const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Get all users
router.get('/get/all', UserController.getAllUsers);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Create a new user
router.post('/add/new', UserController.createUser);

// Update a user
router.put('/edit/:id', UserController.updateUser);

// Delete a user
router.delete('/delete/:id', UserController.deleteUser);

// Test route
router.get('/test', (req, res) => {
  res.send('User routes working ✅');
});

module.exports = router;
