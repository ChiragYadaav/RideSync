import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext'

const UserProtectedWrapper = ({ children }) => {
  
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const navigator = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigator('/login');
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
          setUser(response.data.user)
          setIsLoading(false);
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem(token);
      navigator('/login');
  })
  
  }, [token])


if (isLoading) {
    return (
        <div>Loading...</div>
    )
}

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper