import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CapatainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigator = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      email: email,
      password: password,
    };
    setEmail('');
    setPassword('');

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, newCaptain);

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigator('/captain-home');
    }
  };

  return (
    <div className='h-screen w-full flex flex-col lg:flex-row'>
      {/* Left Section for Large Screens */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-400 to-teal-500 text-white flex-col justify-center items-center text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome Captain!</h1>
        <p className='text-lg max-w-sm'>
          Sign in as a Captain to manage your rides and schedule.
        </p>
        <img
          className='max-w-sm mt-10'
          src= {import.meta.env.VITE_CAPTAIN_HOME_LOGO}
          alt='Captain Illustration'
        />
      </div>

      {/* Right Section for Large Screens */}
      <div className='lg:w-1/2 p-7 flex flex-col justify-center h-screen'>
        <div className='max-w-md mx-auto'>
          {/* Centered Logo */}
          <div className='flex justify-center mb-8'>
            <img
              className='w-24 mb-1'
              src={import.meta.env.VITE_CAPTAIN_LOGO}
              alt='Captain Logo'
            />
          </div>

          {/* Login Form */}
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type='email'
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='password'
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >
              Login
            </button>
          </form>

          <p className='text-center'>
            New here?{' '}
            <Link to='/captain-signup' className='text-blue-600'>
              Create new Account
            </Link>
          </p>

          <Link
            to='/login'
            className='bg-[#3A6AE5] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mt-12'
          >Sign in as User
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;