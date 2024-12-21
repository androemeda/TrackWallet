const express = require('express');
const { MdViewModule } = require('react-icons/md');
const {
  addTransaction,
  getAllTransactions,
} = require('../controllers/transactionController');

const router = express.Router();

//add transaction POST
router.post('/add-transaction', addTransaction);

//get all transactions
router.post('/get-transactions', getAllTransactions);

module.exports = router;
