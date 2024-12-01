import React, { useState } from 'react'
import { createContext } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    
    const [captain, setCaptain] = useState('');

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }

    const value = {
        captain,
        setCaptain,
        updateCaptain
    }

    return (
    <CaptainDataContext.Provider value={value}>
        {children} 
    </CaptainDataContext.Provider>
    )
}

export default CaptainContext;