"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import DistributorForm from "./distributorForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Export } from "./export";

type userEnabled = "y" | "n";

type Users = {
  id?: number;
  role: string;
  enabled: userEnabled;
};
const Distributors = () => {
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
        return user.role === "DISTRIBUTOR";
      });
      setUsers(filteredUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveDistributor: SubmitHandler<Users> = async (data) => {
    setLoading(true);
    console.log(data);
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
      setModalTitle("Editar Distribuidor");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  };

/*   const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar afiliado");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Users) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  }; */

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
    Export(users)
  }

  return (
    <>
      <Table
        columns={columns}
        data={users}
        showActions={true}
        download={true}
        onEdit={handleEdit}
        downloadAction={handleDownload}
        title="Distribuidores"
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <DistributorForm
          defaultValues={
            selectedRecord || {
              role: "",
              enabled: "y",
            }
          }
          onSubmit={handleSaveDistributor}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este distribuidor?</p>
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

export default Distributors;
