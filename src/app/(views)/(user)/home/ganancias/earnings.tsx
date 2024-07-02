'use client';
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reports = () => {
  const [earnings, setEarnings] = useState<any[]>([]);
  const data: any[] = [];
  const session = useSession();

  const fetchEarnings = async () => {
    try {
      const response = await axios.get(`/api/userSales/${session.data?.user.id}`);
      console.log(response.data);
      setEarnings(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };
  useEffect(() => {
    fetchEarnings();
  }, []);
  
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
