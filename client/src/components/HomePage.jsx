import React , {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Modal , Button , Form , Input , Select} from 'antd'

function HomePage() {

  const [showModal , setShowModal] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    setShowModal(false);
  }

  return <div className='relative h-screen'>
    <Header></Header>
    <div className='pt-[calc(60px)]'>
      <div className='flex justify-between items-center p-2 border shadow-sm'>
        <div>range filters</div>
        <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={() => setShowModal(true)}>Add New</button>
      </div>
    </div>

    <Modal title='Add Transaction' open={showModal} footer={false} onCancel={() => setShowModal(false)}>
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
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
    </Modal>
    <Footer></Footer>
  </div>
}

export default HomePage;