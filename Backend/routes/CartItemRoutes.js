const express = require('express');
const router = express.Router();
const CartItemController = require('../controllers/CartItemController');

router.get('/get/all/', CartItemController.getAllCartItems);
router.get('/user/:userId', CartItemController.getCartItemsByUserId);
router.post('/add/new', CartItemController.addCartItems);
router.put('/:id', CartItemController.updateCartItems);
router.delete('/:id', CartItemController.deleteCartItems);

module.exports = router;
