"use client";
import React, { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ConsumerForm from "./consumerForm";
import { SubmitHandler } from "react-hook-form";
import NoRecords from "@/app/components/common/noRecords";

type Inputs = {
  username: string;
  email: string;
  ref_id?: number;
  role: number;
  full_name: string;
  dni?: string;
  phone: string;
};
const Consumers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Inputs | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveConsumer: SubmitHandler<Inputs> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar consumidor:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar consumidor:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Username", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Referido", accessor: "ref_id" },
    { Header: "Nombre", accessor: "full_name" },
    { Header: "Role", accessor: "role" },
    { Header: "DNI", accessor: "dni" },
    { Header: "Celular", accessor: "phone" },
    { Header: "Activo", accessor: "enebled" },
  ];

  const data: string[] = [];


  const handleEdit = (record: Inputs) => {
    setSelectedRecord(record);
    setModalTitle("Editar producto");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar producto");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Inputs) => {
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
        data={data}
        showActions={true}
        addRecord={true}
        title="Consumidores"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <ConsumerForm
          defaultValues={
            selectedRecord || {
              username: "",
              email: "",
              ref_id: 0,
              role: 0,
              full_name: "",
              dni: "",
              phone: "",
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
