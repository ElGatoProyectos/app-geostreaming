"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import { GrUpdate } from "react-icons/gr";
import Modal from "@/app/components/common/modal";
import ActionButton from "@/app/components/common/ActionButton";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { access } from "fs";

const Reports = () => {
  const session = useSession();

  const [orders, setOrders] = useState<any[]>([]);
  const [platforms, setPlatform] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const [accountsResponse, platformResponse, userResponse] = await Promise.all([
        axios.get("/api/account"),
        axios.get("/api/platform"),
        axios.get("/api/user"),
      ]);
      const filteredOrders = accountsResponse.data.filter((order: any) => {
        return order.user_id === Number(session.data?.user.id);
      });
      setOrders(filteredOrders);
      setPlatform(platformResponse.data);
      setUsers(userResponse.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    { Header: "Código", accessor: "id" },
    {
      Header: "Plataforma",
      accessor: (row: any) => {
        if (!platforms || platforms.length === 0) return "No disponible";
        const platform = platforms.find((p) => p.id === row.platform_id);
        return platform ? platform.name : "No disponible";
      },
    },
    { Header: 'Correo', accessor: 'email' },
    { Header: 'Contraseña', accessor: 'password' },
    { Header: 'pin', accessor: 'pin'},
    {
      Header: "Estado",
      accessor: (row: any) => row.is_active ? (
        <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-green-400">Activo</span>
      ) : (
        <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-gray-400">Inactivo</span>
      ),
    },
    {
      Header: "Fecha de compra",
      accessor: (row: any) => formatDate(row.purchase_date),
    },
    {
      Header: "Fecha de renovación",
      accessor: (row: any) => formatDate(row.renewal_date),
    },/* 
    { Header: "Fecha de compra", accessor: "status" },
    { Header: "Fecha de vencimiento", accessor: "platform_id" }, */
   
  ];


  const formatDate = (dateString?: string): string => {
    if (!dateString) {
      return "Sin fecha";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return format(date, "PPPp", { locale: es });
  };


  const handleModal = (record: any) => {
    setSelectedRecord(record);
    setIsOpenModal(true);
    
  };
  const onRenovate = async () => {
    try {
      await axios.post("/api/renovate", {
        account_id: selectedRecord.id,
        platform_id: selectedRecord.platform_id,
        user_id: Number(session.data?.user.id),
      });
      setIsOpenModal(false);
      toast.success("Registro eliminado correctamente");
    } catch (error) {
      console.error("Error", error);
      setIsOpenModal(false);
      toast.error("Hubo un error al eliminar el registro");
    }
  };

  return (
    <>
      {orders.length === 0 ? (
        <NoRecords title="ventas" />
      ) : (
        <Table
          columns={columns}
          data={orders}
          showActions={true}
          title="Historial de ventas"
          download={true}
          onRenovate={handleModal}
        />
      )}
      <Modal
        isOpen={isOpenModal}
        title="Confirmar renovación"
        onClose={() => setIsOpenModal(false)}
      >
        <h2 className="text-xl text-center">
          ¿Esta seguro de Renovar la cuenta?
        </h2>
        <div className="text-center mt-4">
          {/* <button>renovar</button> */}
          <ActionButton onClick={onRenovate} >Renovar</ActionButton>
        </div>
      </Modal>
    </>
  );
};

export default Reports;
