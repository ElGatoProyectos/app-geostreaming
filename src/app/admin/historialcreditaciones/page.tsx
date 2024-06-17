import React from 'react'
import MainLayout from '../layout/mainLayout'
import NoRecords from '@/app/components/noRecords'

const page = () => {
  return (
    <MainLayout>
      {/* si esta vacio mostrar componente */}
      <NoRecords title='ventas'></NoRecords>
    </MainLayout>
  )
}

export default page