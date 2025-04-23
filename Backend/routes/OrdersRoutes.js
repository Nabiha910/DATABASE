const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
router.get('/get/all', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/add/new', OrderController.createOrder);
router.put('/edit/:id', OrderController.updateOrder);
router.delete('/delete/:id', OrderController.deleteOrder);
// Order items routes
router.post('/order_items/add', OrderController.createOrderItem);
router.get('/get/all/order_items', OrderController.getAllOrderItems);
router.get('/order_items/:order_id', OrderController.getOrderItemsByOrderId);
router.delete('/order_items/delete/:id', OrderController.deleteOrderItem);
router.put('/order_items/edit/:id', OrderController.updateOrderItem);

// Test route to check if the order routes are working


router.get('/test', (req, res) => {
  res.send('Order routes working ✅');
});

module.exports = router;


//router.get('/order_items', OrderController.getAllOrderItems);
