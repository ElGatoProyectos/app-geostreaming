"use client";
import { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import CategoryForm from "@/app/components/forms/categoryForm";
import { SubmitHandler } from "react-hook-form";
import NoRecords from "@/app/components/common/noRecords";

import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  id: string;
  category: string;
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

  const handleSaveCategory: SubmitHandler<Inputs> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar categoría:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar categoría:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "CATEGORIA", accessor: "category" },
  ];

  const data: string[] = [];

  const handleEdit = (record: Inputs) => {
    setSelectedRecord(record);
    setModalTitle("Editar categoría");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar categoría");
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
      {data.length === 0 ? (
        <NoRecords title="Historial de ventas" />
      ) : (
        <Table
          columns={columns}
          data={data}
          showActions={true}
          addRecord={true}
          title="Categorias"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <CategoryForm
          defaultValues={selectedRecord || { id: "", category: "" }}
          onSubmit={handleSaveCategory}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar esta categoría?</p>
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
