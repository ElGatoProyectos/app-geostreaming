import React from 'react'
import ContainerCard from '@/app/components/containerCard'
import { DproductoInmediato } from '@/data/DproductoInmediato'
const request = () => {
  return (
    <div className='w-full'>
      <ContainerCard data={DproductoInmediato} title="Entrega inmediata" />
    </div>
  )
}

export default request
