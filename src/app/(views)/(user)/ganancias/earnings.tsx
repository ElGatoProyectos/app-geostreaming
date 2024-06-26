import React from "react";
import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";

const Reports = () => {
  const data: string[] = [];
  const columns = [
    { Header: "Código", accessor: "id" },
    { Header: "Mes-Año", accessor: "date" },
    { Header: "Estado", accessor: "status" },
    { Header: "Tipo", accessor: "type" }, /* método de pago */
    { Header: "Valor", accessor: "value" },/* ganancia */
    { Header: "Observación", accessor: "observation" }, /* info general tipo de pago, saldo actual, ganacia, etc */
  ];
  
  return (
    <>
    {data.length === 0 ? (
        <NoRecords title="ganancias" />
      ) : (
        <Table
        columns={columns}
        data={data}
        showActions={false}
        title="Historial de ganancias"
        download={true}
      />
      )}
      
    </>
  );
};

export default Reports;
