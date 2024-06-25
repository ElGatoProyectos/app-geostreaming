import React from "react";
import Table from "@/app/components/common/table";
import dataTable from "@/data/dataTable.json";
import NoRecords from "@/app/components/common/noRecords";

const Reports = () => {
  const data: string[] = [];
  const columns = [
    { Header: "Codigo", accessor: "codigo" },
    { Header: "Producto", accessor: "producto" },
    { Header: "Cliente", accessor: "cliente" },
    { Header: "Fecha", accessor: "fecha" },
    { Header: "Valor", accessor: "valor" },
    { Header: "Total", accessor: "total" },
    { Header: "Estado", accessor: "estado" },
    { Header: "Referencia", accessor: "referencia" },
    { Header: "Observacion", accessor: "observacion" },
  ];

  return (
    <>
      {data.length === 0 ? (
        <NoRecords title="Historial de ventas" />
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
