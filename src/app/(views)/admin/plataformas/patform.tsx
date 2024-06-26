"use client";
import { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import PlatformForm from "./platformForm";
import { SubmitHandler } from "react-hook-form";
import NoRecords from "@/app/components/common/noRecords";

import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  img_url: string;
  name: string;
  description: string;
};

const Platform = () => {
  /* toast.success(message);
    toast.error(message);
    toast.warning(message);
    toast.info(message); */

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

  const handleSavePlatform: SubmitHandler<Inputs> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar plataforma:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar plataforma:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Plataforma", accessor: "name" },
    { Header: "Descripción", accessor: "description" },
  ];

  const data: string[] = [];

  const handleEdit = (record: Inputs) => {
    setSelectedRecord(record);
    setModalTitle("Editar plataforma");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    //logica para agregar plataforma

    setSelectedRecord(null);
    setModalTitle("Agregar plataforma");
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
        title="Plataforma"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <PlatformForm
          defaultValues={selectedRecord || { img_url: "", name: "", description: "" }}
          onSubmit={handleSavePlatform}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar esta plataforma?</p>
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

export default Platform;
