"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import DistributorForm from "./distributorForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";

type userEnabled = "y" | "n";
const enableMapping: Record<userEnabled, string> = {
  y: "Activo",
  n: "Inactivo",
};

const reverseEnabledMapping: Record<string, userEnabled> = {
  Activo: "y",
  Inactivo: "n",
};

type Users = {
  id: number;
  email: string;
  ref_id: number;
  role: string;
  full_name: string;
  dni: string;
  phone: string;
  balance_in_cents: number
  enabled: userEnabled;
}
const Distributors = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Users | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user", {
          params: {role: "DISTRIBUTOR"}
        });
        const transformedUsers = response.data.users.map(
          (user: Users) => ({
            ...user,
            enabled: enableMapping[user.enabled],
          })
        )
        setUsers(transformedUsers); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSaveDistributor: SubmitHandler<Users> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar distribuidor:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar distribuidor:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Email", accessor: "email" },
    { Header: "Referido", accessor: "ref_id" },
    { Header: "Nombre", accessor: "full_name" },
    { Header: "Role", accessor: "role" },
    { Header: "DNI", accessor: "dni" },
    { Header: "Celular", accessor: "phone" },
    { Header: "Créditos", accessor: "balance_in_cents" },
    { Header: "Activo", accessor: "enabled" },
  ];
  const data: string[] = [];

  const handleEdit = (record: Users) => {
    const editedRecord = {
      ...record,
      status: reverseEnabledMapping[ record.enabled]
    };
    setSelectedRecord(editedRecord);
    setModalTitle("Editar afiliado");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar afiliado");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Users) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Lógica para eliminar el registro
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Table
        columns={columns}
        data={users}
        showActions={true}
        addRecord={true}
        title="Distribuidores"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <DistributorForm
          defaultValues={
            selectedRecord || {
              id: 0,
              email: "",
              ref_id: 0,
              role: "",
              full_name: "",
              dni: "",
              phone: "",
              balance_in_cents: 0,
              enabled: 'y',
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
