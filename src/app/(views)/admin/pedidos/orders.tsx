"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import OrderForm from "./orderForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignAccountForm from "./assignAccount";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ExportOrders } from "./export";

type userEnabled = "y" | "n";

type Users = {
  id?: number;
  email: string;
  ref_id: number;
  role: string;
  full_name: string;
  dni: string;
  phone: string;
  balance_in_cents: number;
  enabled: userEnabled;
};
const Order = () => {
  const session = useSession();

  const [orders, setOrders] = useState<any[]>([]);
  const [platforms, setPlatform] = useState<any[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchData = async () => {
    try {
      const [ordersResponse, platformResponse, userResponse] =
        await Promise.all([
          axios.get("/api/order"),
          axios.get("/api/platform"),
          axios.get("/api/user"),
        ]);
      setOrders(ordersResponse.data);
      setPlatform(platformResponse.data);
      setUsers(userResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { Header: "Id", accessor: "id" },
    {
      Header: "Plataforma",
      accessor: (row: any) => {
        if (!platforms || platforms.length === 0) return "No disponible";
        const platform = platforms.find((p) => p.id === row.platform_id);
        return platform ? platform.name : "No disponible";
      },
    },
    {
      Header: "Usuario",
      accessor: (row: any) => {
        if (!users || users.length === 0) return "No asignado";
        const user = users.find((u) => u.id === row.user_id);
        return user ? user.dni : "No asignado";
      },
    },
    {
      Header: "Estado",
      accessor: (row: any) =>
        row.status === "ATTENDED" ? (
          <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-green-400">
            Atendido
          </span>
        ) : (
          (<span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-yellow-800">No Atendido</span>)
        ) /* corregir */,
    },
  ];
  /* {
    Header: "Estado de compra",
    accessor: (row: Inputs) =>
      row.status === "BOUGHT" ? (
        <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-blue-400">Comprado</span>
      ) : (
        <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-yellow-800">No Comprado</span>
      ),
  }, */

  const handleSendModal = (record: any) => {
    setSelectedRecord(record);
    setIsSendModalOpen(true);
  };

  const handleAssignAccount: SubmitHandler<any> = async (data) => {
    try {
      const response = await axios.post("/api/order/assign", {
        order_id: selectedRecord.id,
        account_id: Number(data.account),
        user_id: selectedRecord.user_id,
        platform_id: selectedRecord.platform_id,
        status: "ATTENDED",
      });
      setIsSendModalOpen(false);
      toast.success("Cuenta asignada correctamente");
    } catch (error) {
      console.log("Error al asignar cuenta", error);
      toast.error("Error al asignar cuenta");
    }
  };

  function handleDownload() {
    ExportOrders(orders);
  }

  return (
    <>
      <Table
        columns={columns}
        data={orders}
        showActions={true}
        download={true}
        title="Pedidos"
        downloadAction={handleDownload}
        onApprove={handleSendModal}
      />
      <Modal
        isOpen={isSendModalOpen}
        title="Asignar Cuenta"
        onClose={() => setIsSendModalOpen(false)}
      >
        <AssignAccountForm
          platformId={selectedRecord?.platform_id}
          onSubmit={handleAssignAccount}
        />
      </Modal>
    </>
  );
};

export default Order;
