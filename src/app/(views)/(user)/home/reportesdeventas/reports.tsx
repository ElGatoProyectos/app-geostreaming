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

const Reports = () => {
  const session = useSession();

  const [orders, setOrders] = useState<any[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const fetchOrder = async () => {
    try {
      const response = await axios.get("/api/account");
      const filteredOrders = response.data.filter((order: any) => {
        return order.user_id === Number(session.data?.user.id);
      });
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const columns = [
    { Header: "Código", accessor: "id" },
    /* { Header: "Estado", accessor: "status" }, */
    { Header: "Fecha de compra", accessor: "status" },
    { Header: "Fecha de vencimiento", accessor: "platform_id" },
  ];

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

  /* const customCode = (
    <>
      <button
        onClick={()=> handleModal()}
        className="relative rounded content-center text-white px-1 py-1 bg-[#5A62F3] w-8 h-8 hover:bg-[#868BF1] group"
      >
        <GrUpdate className=" mx-auto" />
        <span className="px-2 py-0.6 absolute -top-2 z-10 bg-white rounded-full left-1/2 -translate-x-1/2 -translate-y-full text-[#444] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
          Renovar
        </span>
      </button>
    </>
  ); */

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
