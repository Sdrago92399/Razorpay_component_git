const express = require('express');
const { createOrder, fetchOrders, fetchOrderByID } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/orders', verifyToken, createOrder);
router.get('/api/orders', verifyToken, fetchOrders);
router.get('/api/orders/:id', fetchOrderByID);

module.exports = router;