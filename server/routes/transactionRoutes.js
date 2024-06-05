const express = require('express');
const { createTransaction, fetchTransactions, fetchTransactionByID } = require('../controllers/transactionController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/trnsc', verifyToken, createTransaction);
router.get('/api/trnsc', verifyToken, fetchTransactions);
router.get('/api/trnsc/:id', verifyToken, fetchTransactionByID);

module.exports = router;