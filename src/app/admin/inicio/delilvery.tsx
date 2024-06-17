import React from 'react'
import ContainerCard from '@/app/components/containerCard'
import { DproductoPedido } from '@/data/DproductoPedido'
import CardItem from "@/app/components/cardItem";


const delilvery = () => {
  return (
    <div className='w-full'>
      <ContainerCard title="Bajo pedido (1 hora)">
        {DproductoPedido.map((item, index) => (
            <CardItem
            key={index}
            title={item.title}
            url={item.url}
            description={item.description}
            consumer_price={item.consumer_price}
            btn={item.btn}
          />
        ))}
      </ContainerCard>
    </div>
  )
}

export default delilvery
