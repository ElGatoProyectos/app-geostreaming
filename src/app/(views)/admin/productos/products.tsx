"use client";
import React, { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ProductForm from "./productForm";
import { SubmitHandler } from "react-hook-form";
import NoRecords from "@/app/components/common/noRecords";

type Inputs = {
  id: number;
  platform_id: number;
  name: string;
  price_in_cents: string;
  price_distributor_in_cents: string;
  description: string;
};

const Products = () => {
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
    { Header: "PRODUCTO", accessor: "name" },
    { Header: "PLATAFORMA", accessor: "platform_id" },
    { Header: "PRECIO CONSUMIDOR", accessor: "price_in_cents" },
    { Header: "PRECIO DISTRIBUIDOR", accessor: "price_distributor_in_cents" },
    { Header: "DESCRIPCIÓN", accessor: "description" },
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
        title="Productos"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <ProductForm
          defaultValues={
            selectedRecord || {
              id: 0,
              name: "",
              platform_id: 0,
              price_in_cents: "",
              price_distributor_in_cents: "",
              description: "",
            }
          }
          onSubmit={handleSaveCategory}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este producto?</p>
          <button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white mt-4 px-4 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      </Modal>
      {/* si no hay datos mostrar 
    <NoRecords title="Historial de ventas"/>  */}
    </>
  );
};

export default Products;
