import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Modal, Button, Form, Input, Select, message, Table } from 'antd';
import axios from 'axios';

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date', //name of the model
    },
    {
      title: 'Amount',
      dataIndex: 'amount', //name of the model
    },
    {
      title: 'Type',
      dataIndex: 'type', //name of the model
    },
    {
      title: 'Category',
      dataIndex: 'category', //name of the model
    },
    {
      title: 'Reference',
      dataIndex: 'reference', //name of the model
    },
    {
      title: 'Actions',
    },
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/transactions/get-transactions', {
        userid: user._id,
      });
      setAllTransactions(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error('fetching all transactions failed.');
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('/transactions/add-transaction', {
        ...values,
        userid: user._id,
      });
      message.success('Transaction added succesfully');
      setShowModal(false);
    } catch (error) {
      message.error('Failed to add transaction');
    }
  };

  return (
    <div className="relative h-screen">
      <Header></Header>
      <div className="pt-[calc(60px)]">
        <div className="flex justify-between items-center p-2 border shadow-sm">
          <div>range filters</div>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
        <Table columns={columns} dataSource={allTransactions} footer={false} />
        <Modal
          title="Add Transaction"
          open={showModal}
          footer={false}
          onCancel={() => setShowModal(false)}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">TAX</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Refrence" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                {' '}
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
