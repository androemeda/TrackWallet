import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  message,
  Table,
  DatePicker,
} from 'antd';
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import Analytics from './Analytics';
const { RangePicker } = DatePicker;

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(true);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date', //name of the model
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
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
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/api/v1/transactions/get-transactions', {
        userid: user._id,
        frequency,
        type,
        selectedDate,
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
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      await axios.post('/api/v1/transactions/delete-transaction', {
        transactionId: record._id,
      });
      getAllTransactions();
      message.success('transaction deleted');
    } catch (error) {
      console.log(error);
      message.error('unable to delete');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (editable) {
        await axios.post('/api/v1/transactions/edit-transaction', {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        message.success('Transaction edited succesfully');
      } else {
        await axios.post('/api/v1/transactions/add-transaction', {
          ...values,
          userid: user._id,
        });
        message.success('Transaction added succesfully');
      }
      getAllTransactions();
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      message.error('Failed to add transaction');
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header></Header>
      <div className="flex-grow pt-[calc(60px)]">
        <div className="flex justify-between items-center p-2 border shadow-sm">
          <div className="flex">
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => {
                  setSelectedDate(values);
                }}
              />
            )}
          </div>
          <div className="flex">
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => {
                  setSelectedDate(values);
                }}
              />
            )}
          </div>
          <div className="mx-2 switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === 'table' ? 'active-icon' : 'inactive-icon'
              }`}
              onClick={() => {
                setViewData('table');
              }}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === 'analytics' ? 'active-icon' : 'inactive-icon'
              }`}
              onClick={() => {
                setViewData('analytics');
              }}
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
        {viewData === 'table' ? (
          <Table
            columns={columns}
            dataSource={allTransactions}
            footer={false}
          />
        ) : (
          <Analytics allTransactions={allTransactions} />
        )}
        <Modal
          title={editable ? 'Edit transaction' : 'Add Transaction'}
          open={showModal}
          footer={false}
          onCancel={() => setShowModal(false)}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
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
