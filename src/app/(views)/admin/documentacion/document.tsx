"use client";
import ContainerCard2 from "@/app/components/common/containerCard2";
import React from "react";
import DocumentForm from "./documentForm";
import AlertForm from "./alertForm";
import { url_front_to_wsp } from "@/context/token";
const Document = () => {
  return (
    <div className="flex flex-col gap-8">
      <ContainerCard2 title="Archivo de documentación de la web">
        <DocumentForm />
        <div className="w-full flex justify-center">
          <a
            className="text-[#666] hover:text-[#F2308B] mt-4 mx-auto"
            href={`${url_front_to_wsp}/file/pdf`}
            download
            target="_blank"
          >
            Descargar documento
          </a>
        </div>
      </ContainerCard2>
      <ContainerCard2 title="Comunicado para Distribuidores">
        <AlertForm />
        <div className="w-full flex justify-center">
        </div>
      </ContainerCard2>
    </div>
  );
};

export default Document;
