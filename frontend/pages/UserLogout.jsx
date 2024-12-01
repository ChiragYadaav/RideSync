import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const navigator = useNavigate();
    const token = localStorage.getItem('token');    

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigator('/login')
        }
    })

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout;