
import React from 'react'
import MainLayout from '@/app/components/layout/mainLayout'
import Table from '@/app/components/common/table'
import dataTable from '@/data/dataTable.json';


const page: React.FC = () => {
  const columns = [
    { Header: 'Codigo', accessor: 'codigo' },
    { Header: 'Producto', accessor: 'producto' },
    { Header: 'Cliente', accessor: 'cliente' },
    { Header: 'Fecha', accessor: 'fecha' },
    { Header: 'Valor', accessor: 'valor' },
    { Header: 'Total', accessor: 'total' },
    { Header: 'Estado', accessor: 'estado' },
    { Header: 'Referencia', accessor: 'referencia' },
    { Header: 'Observacion', accessor: 'observacion' },
  ];

  return (
    <MainLayout>
       <Table columns={columns} data={dataTable} showActions={false} title='Historial de depositos' />
    </MainLayout>
  )
}

export default page
