"use client";
import ContainerCard2 from "@/app/components/common/containerCard2";
import React from "react";
import DocumentForm from "./documentForm";
import { url_front_to_wsp } from "@/context/token";
const Document = () => {
  return (
    <div>
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
    </div>
  );
};

export default Document;
