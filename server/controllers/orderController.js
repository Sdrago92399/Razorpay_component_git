const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, totalAmount } = req.body;
    const userId = req.user.id;
    const id = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const order = new Order({ productId, userId, quantity, totalAmount });
    await order.save();

    // Initiate payment with Razorpay
    const instance = new Razorpay({
      key_id: id,
      key_secret: secret
    });

    const options = {
      amount: totalAmount * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `${order._id}`
    };

    const payment = await instance.orders.create(options);
    res.status(201).json({ order, payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders
exports.fetchOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate('productId').populate('userId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single order by ID
exports.fetchOrderByID = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findById(req.params.id).populate('productId').populate('userId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
