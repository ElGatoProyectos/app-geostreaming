"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ConsumerForm from "./consumerForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExportConsumidores } from "./export";

type userEnabled = "y" | "n";

type Users = {
  id?: number;
  role: string;
  enabled: userEnabled;
};
const Consumers = () => {
  const [users, setUsers] = useState<any[]>([]);
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
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      const filteredUser = response.data.filter((user: any) => {
        return user.role === "USER";
      });
      const descendingUsers = filteredUser.sort((a:any, b:any) => b.id - a.id);
      setUsers(descendingUsers);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveConsumer: SubmitHandler<Users> = async (data) => {
    setLoading(true);
    try {
      if (selectedRecord?.id) {
        /* modificar user?? */
        await axios.put(`/api/user/${selectedRecord?.id}`, {
          role: data.role,
          enabled: data.enabled,
        });
        toast.success("Se actualizo correctamente");
      }
        fetchUsers();
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
    { Header: "Celular", accessor: (row:any) => String(row.country_code + ' ' + row.phone) },
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
    
      toast.error("Error al obtener los datos");
    }
  };


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

  const handleDownload = () => {
    ExportConsumidores(users);
  };

  return (
    <>
      <Table
        columns={columns}
        data={users}
        downloadAction={handleDownload}
        showActions={true}
        onEdit={handleEdit}
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
