import React from 'react';
import { Form, Input , Button} from 'antd';
import { Link } from 'react-router-dom';

function LoginPage() {

    const submitForm = (values) => {
        console.log(values)
    }

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
        <div className='flex justify-center items-center space-x-3'>
            <Link to='/register'>Dont have an account ? Go to Register Page.</Link>
            <button className='border border-black p-1 rounded-lg'>submit</button>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
