import React from "react";
import Table from "@/app/components/common/table";
import dataTable from "@/data/dataTable.json";
import NoRecords from "@/app/components/common/noRecords";

const Reports = () => {
  const data: string[] = [];
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
    { Header: "Referencia", accessor: "product_id" }, /* email y contrasenia pin (info de la cuenta en si)*/
    { Header: "Observación", accessor: "user_id" }, 
  ];

  return (
    <>
      {data.length === 0 ? (
        <NoRecords title="ventas" />
      ) : (
        <Table
          columns={columns}
          data={dataTable}
          showActions={false}
          title="Historial de ventas"
          download={true}
        />
      )}
    </>
  );
};

export default Reports;
