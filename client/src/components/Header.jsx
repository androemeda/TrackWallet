import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Header() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState('');

  //using useEffect to get data from local storage.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setLoginUser(user);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('user logged out.');
    navigate('/login');
  };

  return (
    <div
      className="bg-gray-500 flex justify-between p-1 px-2 items-center absolute top-0 w-full"
      style={{ height: '60px' }}
    >
      <h1>Expense Management App</h1>
      <div className="flex justify-center items-center space-x-2">
        <p>{loginUser.name}</p>
        <button className="bg-gray-300 rounded-lg p-2" onClick={logoutHandler}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Header;
