import React from 'react'

const LocationSearchPanel = () => {

  const obj = [
    'XYX XKAIA, RADMNJK, nsjdank',
    'bjhvjuj XYX XKAIA, RADMNJK, nsjdank',
    'cgchvjkb XYX XfKAIA, RADMNJK, nsjdank'
  ]

  return (
    <div className='pt-5'>
      {
        obj.map(function (elem) {
          return <div key={elem} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
        })
    }
    
    </div>
  )
}

export default LocationSearchPanel