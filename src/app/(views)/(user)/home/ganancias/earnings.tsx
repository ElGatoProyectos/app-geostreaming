"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import axios from "axios";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

const Reports = () => {
  const [earnings, setEarnings] = useState<any[]>([]);
  const session = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [platforms, setPlatform] = useState<any[]>([]);

  const fetchEarnings = async () => {
    try {
      const response = await axios.get(
        `/api/userSales/${session.data?.user.id}`
      );
      const descendingEarnings = response.data.sort((a:any, b:any) => b.id - a.id);
      setEarnings(descendingEarnings);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [platformResponse, userResponse] = await Promise.all([
        axios.get("/api/platform"),
        axios.get("/api/user"),
      ]);
      setPlatform(platformResponse.data);
      setUsers(userResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchEarnings();
      fetchData();
    }
  }, [session.status]);

  const columns = [
    { Header: "Código", accessor: "id" },
    {
      Header: "Usuario",
      accessor: (row: any) => {
        if (!users || users.length === 0) return "No asignado";
        const user = users.find((u) => u.id === row.user_id);
        return user ? user.full_name : "No asignado";
      },
    },
    {
      Header: "Producto",
      accessor: (row: any) => {
        if (!platforms || platforms.length === 0) return "No disponible";
        const platform = platforms.find((p) => p.id === row.platform_id);
        return platform ? platform.name : "No disponible";
      },
    },
    {
      Header: "Tipo",
      accessor: (row: any) => {
        if (!platforms || platforms.length === 0) return "No disponible";
        const platform = platforms.find((p) => p.id === row.platform_id);
        return platform
          ? platform.status === "UPON_REQUEST"
            ? "A Pedido"
            : "Entrega inmediata"
          : "No disponible";
      },
    },

    {
      Header: "Ganancia",
      accessor: (row: any) => <span className="mx-auto">$ 0.10</span>,
    },
  ];

  return (
    <>
      {earnings.length === 0 ? (
        <NoRecords title="ganancias" />
      ) : (
        <Table
          columns={columns}
          data={earnings}
          showActions={false}
          title="Historial de ganancias"
          download={true}
        />
      )}
    </>
  );
};

export default Reports;
