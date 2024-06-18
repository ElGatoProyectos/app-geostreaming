import React from 'react'
import ContainerCard from "@/app/components/common/containerCard";
import Delivery from './delilvery'
import Request from './request'
import MainLayout from '@/app/components/layout/mainLayout'


const page = () => {
  return (
    <MainLayout>
      <div className='flex flex-col gap-8'>
      
      <Request/>
      <Delivery/>
      </div>
    </MainLayout>
  )
}

export default page
