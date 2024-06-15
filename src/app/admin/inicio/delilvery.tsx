import React from 'react'
import ContainerCard from '@/app/components/containerCard'
import { DproductoPedido } from '@/data/DproductoPedito'


const delilvery = () => {
  return (
    <div className='w-full'>
      <ContainerCard data={DproductoPedido} title="Bajo pedido" />
    </div>
  )
}

export default delilvery
