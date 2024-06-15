import React from 'react'
import ContainerCard from '@/app/components/containerCard'
import { Dcuentas } from '@/data/Dcuentas'


const counts = () => {
  return (
    <div className='w-full'>
      <ContainerCard data={Dcuentas} title="Cuentas" />
    </div>
  )
}

export default counts
