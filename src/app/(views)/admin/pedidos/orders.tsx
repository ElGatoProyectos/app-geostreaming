"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import OrderForm from "./orderForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuSend } from "react-icons/lu";
import AssignAccountForm from "./assignAccount";

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
  const [users, setUsers] = useState<Users[]>([]);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Users | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchUsers = async () => {
    /* try {
      const response = await axios.get("/api/user", {
        params: { role: "USER" },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching user:", error);
    } */
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveOrder: SubmitHandler<Users> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (data.id) {
        await axios.put(`/api/user/${data.id}`, {});
        toast.success("Se actualizo correctamente");
      } else {
        await axios.post("/api/user", {});
        toast.success("Se guardo correctamente");
      }

      useEffect(() => {
        fetchUsers();
      }, []);

      closeModal();
    } catch (error) {
      console.error("Error al guardar la cuenta:", error);
      toast.error("Hubo un error al guardar la cuenta");
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Usuario", accessor: "name" },
    { Header: "Producto", accessor: "product_id" },
    { Header: "Estado", accessor: "status" },
    { Header: "Referido", accessor: "ref_id" },
    { Header: "Cédula", accessor: "dni" },
    { Header: "Celular", accessor: "phone" },
    {
      Header: "Activo",
      accessor: (row: Users) => (row.enabled === "y" ? "activo" : "inactivo"),
    },
  ];

  const handleEdit = async (record: Users) => {
    try {
      const response = await axios.get(`/api/user/${record.id}`);
      setSelectedRecord(response.data);
      setModalTitle("Editar pedido");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  };

  /*   const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar pedido");
    setIsModalOpen(true);
  };
 */
  const handleDelete = (record: Users) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      /*  await axios.delete(`/api/account/${selectedRecord?.id}`);
      toast.success("Registro eliminado correctamente");
      fetchUsers(); */
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      toast.error("Hubo un error al eliminar el registro");
    }
    setIsDeleteModalOpen(false);
  };
  const data: any[] = [
    {
      id: 1,
      name: "prueba",
      product_id: 2,
      status: "active",
      ref_id: 2,
      dni: "32443243",
      phone: "2342434",
    },
  ];
  const handleSendModal = () => {
    setIsSendModalOpen(true);
  }

  const handleAssignAccount = () => {
    console.log("oli")
  }
  


  const customCode = (
    <>
      <button onClick={handleSendModal} className="rounded content-center text-white px-1 py-1 bg-[#5A62F3] w-8 h-8 hover:bg-[#868BF1]">
        <LuSend className="text-white mx-auto"/>
      </button>
    </>
  );

  return (
    <>
      <Table
        columns={columns}
        data={data}
        showActions={true}
        download={true}
        title="Pedidos"
        onEdit={handleEdit}
        onDelete={handleDelete}
        code={customCode}
      />
      {/* modal form add and edit */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <OrderForm
          defaultValues={
            selectedRecord || {
              email: "",
              ref_id: 0,
              role: "",
              full_name: "",
              dni: "",
              phone: "",
              balance_in_cents: 0,
              enabled: "y",
            }
          }
          onSubmit={handleSaveOrder}
        />
      </Modal>
      {/* modal delete */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este pedido?</p>
          <button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white mt-4 px-4 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      </Modal>
      {/* modal send */}
      <Modal isOpen={isSendModalOpen} title="Asignar Cuenta" onClose={() => setIsSendModalOpen(false)}>
        <AssignAccountForm onSubmit={handleAssignAccount}/>
      </Modal>
    </>
  );
};

export default Order;
