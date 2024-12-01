import React from 'react'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className = 'h-screen bg-[#3A6AE5] w-full flex flex-col justify-between items-center p-4'>
      <img className='w-24 pt-12' src='https://freelogopng.com/images/all_img/1659768779uber-logo-white.png' />
      <img className='w-[35rem] pt-2' src='https://dkbaba.in/wp-content/uploads/2023/07/dkbaba-car-rental.svg' />
      <div className='pb-10'>
        <h2 className='text-white text-3xl font-semibold text-center'>Get started with Uber</h2>
        <p className=' text-white m-6 text-center text-sm'>Become an Uber One member for savings and exclusive offers on Uber Eats.</p>
        <Link to='/login' className='flex bg-black text-white p-4 justify-center text-lg rounded-md'>Continue →</Link>
      </div>
    </div>
  )
} 

export default StartPage