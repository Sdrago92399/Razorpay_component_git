const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId, paymentId, amount, currency, status } = req.body;
    const transaction = new Transaction({ orderId, userId, paymentId, amount, currency, status });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions
exports.fetchTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId }).populate('orderId');
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single transaction by ID
exports.fetchTransactionByID = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('orderId');
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
