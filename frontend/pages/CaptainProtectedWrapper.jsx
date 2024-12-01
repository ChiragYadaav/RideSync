import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios';


const CaptainProtectedWrapper = ({ children }) => {

    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true);
    
    const navigator = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigator('/captain-login')
        }
    }, [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            setCaptain(response.data.captain)
            setIsLoading(false);
        }
    }).catch(err => {
        console.log(err);
        localStorage.removeItem(token);
        navigator('/captain-login');
    })


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

export default CaptainProtectedWrapper