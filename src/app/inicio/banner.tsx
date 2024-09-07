'use client';
import Link from 'next/link'
import React, { useEffect } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';

const banner = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className='h-[calc(100vh-60px)] relative' id='banner'>
      <img src="/banner-geo.png" alt="banner" className='h-full w-full object-cover' loading="lazy"/>
      <div className='w-full h-full bg-black bg-opacity-70 absolute top-0 left-0 '>
        <div className='w-full h-full flex justify-center items-center md:justify-start max-w-[1440px] mx-auto px-4 md:px-8'>
        <div className='md:max-w-[50%] flex flex-col items-center md:items-start gap-4 text-center md:text-start w-[90%] ' data-aos="zoom-out">
          <h2 className='text-white font-bold text-[1.6rem] md:text-[3rem] drop-shadow-lg' >Todo el entretenimiento en un solo lugar</h2>
          <p className='text-white drop-shadow-lg md:text-[2rem]' >Contamos con una gran variedad de productos</p>
          <Link href={'/ingresar'} className='text-white bg-[#F2308B] border-2 border-[#F2308B] rounded  px-6 py-2 text-lg hover:bg-transparent hover:border-white transition-all duration-300' >Ingresa</Link>
        </div>
        </div>
       
      </div>
    </div>
  )
}

export default banner
