import Link from 'next/link'
import React from 'react'

const banner = () => {
  return (
    <div className='h-[calc(100vh-60px)] relative'>
      <img src="/banner.jpg" alt="banner" className='h-full w-full object-cover' />
      <div className='w-full h-full bg-black bg-opacity-60 absolute top-0 left-0 flex justify-center items-center'>
        <div className=' flex flex-col items-center gap-4 text-center max-w-[90%]'>
          <h2 className='text-white font-bold text-[1.6rem] drop-shadow-lg'>Todo el entretenimiento en un solo lugar</h2>
          <p className=' text-white drop-shadow-lg'>Contamnos con una gran variedad de productos</p>
          <Link href={'../users/login'} className='text-white bg-[#F2308B] border-2 border-[#F2308B] rounded  px-6 py-2 text-lg hover:bg-transparent hover:border-white transition-all duration-300' >Ingresa</Link>
        </div>
      </div>
    </div>
  )
}

export default banner
