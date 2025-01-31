const express = require('express');
const { MdViewModule } = require('react-icons/md');
const {
  addTransaction,
  getAllTransactions,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

const router = express.Router();

//add transaction POST
router.post('/add-transaction', addTransaction);

//get all transactions
router.post('/get-transactions', getAllTransactions);

//edit transaction
router.post('/edit-transaction', editTransaction);

//delete transaction
router.post('/delete-transaction', deleteTransaction);

module.exports = router;
