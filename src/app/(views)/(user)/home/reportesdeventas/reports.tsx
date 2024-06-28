"use client";
import React, { use, useState } from "react";
import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import { GrUpdate } from "react-icons/gr";
import Modal from "@/app/components/common/modal";
import ActionButton from "@/app/components/common/ActionButton";

const Reports = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const data: any[] = [{ id: 1, email: "oline@gmail.com" }];

  const columns = [
    /* { Header: "ID", accessor: "id" },
    { Header: "Correo", accessor: "email" },
    { Header: "Contraseña", accessor: "password" },
    { Header: "Pin", accessor: "pin" },
    { Header: "numb_profiles", accessor: "numb_profiles" },
    { Header: "Duración (días)", accessor: "numb_days_duration" },
    { Header: "status", accessor: "status" },
    { Header: "Plataforma", accessor: "platform_id" },
    { Header: "Producto", accessor: "product_id" },
    { Header: "Usuario", accessor: "user_id" }, */

    /* segun vista en sitospremium */
    { Header: "Código", accessor: "id" },
    { Header: "Producto", accessor: "email" },
    { Header: "Cliente", accessor: "password" },
    { Header: "Fecha", accessor: "pin" },
    { Header: "Actual", accessor: "numb_profiles" },
    { Header: "Valor", accessor: "numb_days_duration" },
    { Header: "Total", accessor: "status" },
    { Header: "Estado", accessor: "platform_id" },
    {
      Header: "Referencia",
      accessor: "product_id",
    } /* email y contrasenia pin (info de la cuenta en si)*/,
    { Header: "Observación", accessor: "user_id" },
  ];

  const handleModal = () => {
    setIsOpenModal(true);
  };
  const Renovate = () => {
    console.log("cuenta renovada");
  }

  const customCode = (
    <>
      <button
        onClick={handleModal}
        className="relative rounded content-center text-white px-1 py-1 bg-[#5A62F3] w-8 h-8 hover:bg-[#868BF1] group"
      >
        <GrUpdate className=" mx-auto" />
        <span className="px-2 py-0.6 absolute -top-2 z-10 bg-white rounded-full left-1/2 -translate-x-1/2 -translate-y-full text-[#444] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
          Renovar
        </span>
      </button>
    </>
  );

  return (
    <>
      {data.length === 0 ? (
        <NoRecords title="ventas" />
      ) : (
        <Table
          columns={columns}
          data={data}
          showActions={true}
          title="Historial de ventas"
          download={true}
          code={customCode}
        />
      )}
      <Modal
        isOpen={isOpenModal}
        title="Confirmar renovación"
        onClose={() => setIsOpenModal(false)}
      >
        <h2 className="text-xl text-center">Esta seguro de Renovar la cuenta?</h2>
        <div className="text-center mt-4">
        <ActionButton onClick={Renovate}>Renovar</ActionButton>
        </div>
        
      </Modal>
    </>
  );
};

export default Reports;
