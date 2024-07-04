'use client';
import ContainerCard2 from '@/app/components/common/containerCard2'
import React from 'react'
import DocumentForm from './documentForm'
const Document = () => {
    // aqui va descarga del pdf documentacion
    const handleDownload = () => {
        console.log("descargando :p");
      };
  return (
    <div>
      <ContainerCard2 title="Archivo de documentación de la web">
        <DocumentForm/>
        <div className='w-full flex justify-center'>
        <button
        onClick={handleDownload}
        type="button"
        className="text-[#666] hover:text-[#F2308B] mt-4 mx-auto"
      >
        Descargar documento
      </button>
        </div>
        
      </ContainerCard2>
    </div>
  )
}

export default Document
