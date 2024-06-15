import React from 'react'
import { RiCloseFill } from "react-icons/ri";


const modal = () => {
  return (
    <div className='fixed top-0 left-0 inset-1 z-50 bg-black bg-opacity-30 flex justify-center items-center overflow-auto w-full h-full'>
      <div className='max-w-[500px] max-h-[90%] w-full bg-white rounded-lg relative'>
        <div className='w-full py-4 bg-[#277FF2] rounded-t-lg text-center content-center text-white font-bold uppercase '>titulo
        <RiCloseFill className=' text-xl absolute right-4 top-4 cursor-pointer' />
        </div>
        <div className='bg-white overflow-y-auto p-4'>
            {/* contenido */}
        </div>
      </div>
    </div>
  )
}

export default modal
