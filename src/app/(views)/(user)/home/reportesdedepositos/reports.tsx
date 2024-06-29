'use client';
import React, { useEffect, useState } from "react";

import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import axios from "axios";
import { useSession } from "next-auth/react";

const Reports = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const data: any[] = [ {}];
  const columns = [
    { Header: "ID", accessor: "id" }, /* con img */
    { Header: "Numero de cuenta", accessor: "number" },
    { Header: "Fecha y hora", accessor: "date" },/* fecha y hora */
    { Header: "Monto", accessor: "value" },
    { Header: "Comprobante", accessor: "value" },
  ];
  const [user, setUser] = useState('');
  const session = useSession();
  if (session.status === "authenticated") {
    setUser(session.data?.user.id);
  }

  const fetchOrder = async () => {
    try {
      const response = await axios.get("/api/voucher");
      console.log(response.data);
      const filteredOrders = response.data.filter((voucher: any) => {
        return voucher.user === user
      });
      /* setVouchers(filteredOrders); */
    } catch (error) {
      console.error("Error fetching voucher:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <NoRecords title="depósitos" />
      ) : (
        <Table
          columns={columns}
          data={data}
          showActions={false}
          title="Historial de depósitos"
          download={true}
        />
      )}
    </>
  );
};

export default Reports;
