"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import NoRecords from "@/app/components/common/noRecords";
import { GrUpdate } from "react-icons/gr";
import Modal from "@/app/components/common/modal";
import ActionButton from "@/app/components/common/ActionButton";
import { useSession } from "next-auth/react";
import axios from "axios";

const Reports = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const data: any[] = [{ id: 1, email: "oline@gmail.com" }];
  const [user, setUser] = useState("");
  const session = useSession();
  if (session.status === "authenticated") {
    setUser(session.data?.user.id);
  }

  const fetchOrder = async () => {
    try {
      const response = await axios.get("/api/order");
      console.log(response.data);
      const filteredOrders = response.data.filter((order: any) => {
        return order.user === user;
      });
      /* setOrders(filteredOrders); */
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    { Header: "Código", accessor: "id" },
    {
      Header: "Referencia",
      accessor: "product_id",
    },
    { Header: "Correo", accessor: "email" },
    { Header: "Contraseña", accessor: "password" },
    { Header: "Pin", accessor: "pin" },
    { Header: "Costo", accessor: "numb_profiles" },
    { Header: "Fecha de compra", accessor: "status" },
    { Header: "Fecha de vencimiento", accessor: "platform_id" },
  ];

  const handleModal = () => {
    setIsOpenModal(true);
  };
  const Renovate = () => {
    console.log("cuenta renovada");
  };

  const customCode = (
    <>
      <button
        onClick={handleModal}
        className="relative rounded content-center text-white px-1 py-1 bg-[#5A62F3] w-8 h-8 hover:bg-[#868BF1] group"
      >
        <GrUpdate className=" mx-auto" />
        <span className="px-2 py-0.6 absolute -top-2 z-10 bg-white rounded-full left-1/2 -translate-x-1/2 -translate-y-full text-[#444] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
          Renovar
        </span>
      </button>
    </>
  );

  return (
    <>
      {data.length === 0 ? (
        <NoRecords title="ventas" />
      ) : (
        <Table
          columns={columns}
          data={data}
          showActions={true}
          title="Historial de ventas"
          download={true}
          code={customCode}
        />
      )}
      <Modal
        isOpen={isOpenModal}
        title="Confirmar renovación"
        onClose={() => setIsOpenModal(false)}
      >
        <h2 className="text-xl text-center">
          Esta seguro de Renovar la cuenta?
        </h2>
        <div className="text-center mt-4">
          <ActionButton onClick={Renovate}>Renovar</ActionButton>
        </div>
      </Modal>
    </>
  );
};

export default Reports;
