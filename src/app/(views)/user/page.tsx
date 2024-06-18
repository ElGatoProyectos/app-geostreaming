import React from 'react'
import MainLayout from '@/app/components/layout/mainLayout'
import Delivery from './delilvery'
import Request from './request'

const page = () => {
  return (
    <MainLayout>
      <div className='flex flex-col gap-8'>
      <Delivery/>
      <Request/>
      </div>
    </MainLayout>
  )
}

export default page
