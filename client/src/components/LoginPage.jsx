import React , { useEffect} from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Password from 'antd/es/input/Password';

function LoginPage() {
  const navigate = useNavigate();
  const submitForm = async (values) => {
    // console.log(values)
    try {
      const response = await axios.post('/api/v1/users/login', values);
      message.success('login success.');
      localStorage.setItem(
        'user',
        JSON.stringify({ ...response.data.user, password: '' })
      );
      navigate('/');
    } catch (error) {
      message.error('something went wrong.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold m-2">Login Page</h1>
      <Form layout="vertical" className="w-1/2" onFinish={submitForm}>
        <Form.Item label={'Email'} name={'email'}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={'Password'} name={'password'}>
          <Input></Input>
        </Form.Item>
        <div className="flex justify-center items-center space-x-3">
          <Link to="/register">
            Dont have an account ? Go to Register Page.
          </Link>
          <button className="border border-black p-1 rounded-lg">submit</button>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
