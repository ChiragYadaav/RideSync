import React from 'react'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div className='h-screen bg-[#3A6AE5] w-full flex flex-col lg:flex-row lg:justify-center lg:items-center p-4'>
      {/* Left Section for Logo on Large Screens */}
      <div className='flex flex-col justify-center items-center lg:w-1/2 lg:h-full'>
        <img
          className='w-24 pt-12 lg:w-40 lg:pt-0'
          src= {import.meta.env.VITE_WHITE_LOGO}
          alt="Logo"
        />
      </div>

      {/* Right Section for Content */}
      <div className='flex flex-col justify-center items-center lg:w-1/2 lg:h-full lg:bg-white lg:rounded-md lg:shadow-lg lg:p-8'>
        <img
          className='w-[35rem] pt-2 lg:w-[20rem] lg:mb-6'
          src= {import.meta.env.VITE_HOME_LOGO}
          alt="Car"
        />
        <h2 className='text-white text-3xl font-semibold text-center lg:text-black lg:mt-4'>
          Get started with Uber
        </h2>
        <p className='text-white m-6 text-center text-sm lg:text-black lg:mb-6'>
          Become an Uber One member for savings and exclusive offers on Uber Eats.
        </p>
        <Link
          to='/login'
          className='flex bg-black text-white p-4 w-full justify-center text-lg rounded-md lg:w-full lg:bg-[#3A6AE5] lg:text-white lg:p-6'
        >
          Continue →
        </Link>
      </div>
    </div>
  )
}

export default StartPage
