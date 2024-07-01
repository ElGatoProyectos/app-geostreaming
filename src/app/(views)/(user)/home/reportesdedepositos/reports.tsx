"use client";
import React, { useEffect, useState } from "react";

import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import axios from "axios";
import { useSession } from "next-auth/react";

const Reports = () => {
  const session = useSession();
  const [vouchers, setVouchers] = useState<any[]>([]);
  const columns = [
    { Header: "ID", accessor: "id" } /* con img */,
    { Header: "Numero de cuenta", accessor: "number" },
    { Header: "Fecha y hora", accessor: "date" } /* fecha y hora */,
    { Header: "Monto", accessor: "value" },
    { Header: "Comprobante", accessor: "value" },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/voucher");
      const filteredVoucher = response.data.filter((voucher: any) => {
        return voucher.user_id === Number(session.data?.user.id);
      });
      setVouchers(filteredVoucher);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {vouchers.length === 0 ? (
        <NoRecords title="depósitos" />
      ) : (
        <Table
          columns={columns}
          data={vouchers}
          showActions={false}
          title="Historial de depósitos"
          download={true}
        />
      )}
    </>
  );
};

export default Reports;
