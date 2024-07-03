"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ConsumerForm from "./consumerForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const Consumers = () => {
  const [users, setUsers] = useState<Users[]>([]);
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
    try {
      const response = await axios.get("/api/user");
      const filteredUser = response.data.filter((user: any) => {
        return user.role === "USER";
      });
      setUsers(filteredUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveConsumer: SubmitHandler<Users> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (data.id) {
        await axios.put(`/api/user/${data.id}`, {
          email: data.email,
          ref_id: data.ref_id,
          role: data.role,
          full_name: data.full_name,
          dni: data.dni,
          phone: data.phone,
          enabled: data.enabled,
        });
        toast.success("Se actualizo correctamente");
      } else {
        await axios.post("/api/user", {
          email: data.email,
          ref_id: data.ref_id,
          role: data.role,
          full_name: data.full_name,
          dni: data.dni,
          phone: data.phone,
          enabled: data.enabled,
        });
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
    { Header: "Email", accessor: "email" },
    {
      Header: "Referido",
      accessor: (row: any) => {
        if (!users || users.length === 0) return "No asignado";
        const user = users.find((u) => u.id === row.ref_id);
        return user ? user.full_name : "No asignado";
      },
    },
    { Header: "Nombre", accessor: "full_name" },
    { Header: "Role", accessor: (row:any) => row.role === 'USER' ? 'Consumidor' : 'Distribuidor' },
    { Header: "DNI", accessor: "dni" },
    { Header: "Celular", accessor: "phone" },
    { Header: "Créditos($)", accessor: (row:any) => (row.balance_in_cents/100).toFixed(2)},
    {
      Header: "Estado",
      accessor: (row: Users) => (row.enabled === "y" ? (<span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-green-400">Activo</span>) : (
        <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-gray-400">Inactivo</span>
      )),
    },
  ];

  const handleEdit = async (record: Users) => {
    try {
      const response = await axios.get(`/api/user/${record.id}`);
      setSelectedRecord(response.data);
      setModalTitle("Editar consumidor");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  };

  /*   const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar consumidor");
    setIsModalOpen(true);
  };
 */
  const handleDelete = (record: Users) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/account/${selectedRecord?.id}`);
      toast.success("Registro eliminado correctamente");
      fetchUsers();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      toast.error("Hubo un error al eliminar el registro");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Table
        columns={columns}
        data={users}
        showActions={false}
        download={true}
        title="Consumidores"
        
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <ConsumerForm
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
          onSubmit={handleSaveConsumer}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este consumidor?</p>
          <button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white mt-4 px-4 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Consumers;
