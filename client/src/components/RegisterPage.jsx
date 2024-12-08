import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  const submitForm = async (values) => {
    // console.log(values);
    try {
      await axios.post('/users/register', values);
      message.success('Registration successful.');
      navigate('/login');
    } catch (error) {
      message.error('somethng went wrong.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold m-2">Register Page</h1>
      <Form layout="vertical" className="w-1/2" onFinish={submitForm}>
        <Form.Item label={'Name'} name={'name'}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'Email'} name={'email'}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'Password'} name={'password'}>
          <Input></Input>
        </Form.Item>
        <div className="flex justify-center items-center space-x-3">
          <Link to="/login">Already have an account ? Go to Login Page.</Link>
          <button className="border border-black p-1 rounded-lg">submit</button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterPage;
