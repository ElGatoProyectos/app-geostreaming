import React from "react";

import Table from "@/app/components/common/table";
import dataTable from "@/data/dataTable.json";
import NoRecords from "@/app/components/common/noRecords";

const Reports = () => {
  const data: string[] = [];
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Banco", accessor: "bank" },
    { Header: "Numero de cuenta", accessor: "number" },
    { Header: "Fecha", accessor: "date" },
    { Header: "Monto", accessor: "value" },
  ];

  return (
    <>
      {data.length === 0 ? (
        <NoRecords title="depósitos" />
      ) : (
        <Table
          columns={columns}
          data={dataTable}
          showActions={false}
          title="Historial de depósitos"
          download={true}
        />
      )}
    </>
  );
};

export default Reports;
