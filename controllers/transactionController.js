const transactionModel = require('../models/transactionModel');

const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await transactionModel.find({userid : req.body.userid});
    res.status(200).json(allTransactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json({
      message: 'transaction created',
      newTransaction,
    });
  } catch (error) {
    console.log(error);
    res.staus(500).json(error);
  }
};

module.exports = { getAllTransactions, addTransaction };
