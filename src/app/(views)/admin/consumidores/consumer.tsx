"use client";
import React, { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ProductForm from "@/app/components/forms/productForm";
import { SubmitHandler } from "react-hook-form";


/* FALTA CORREGIR :c*/
type Inputs = {
  id: string;
  producto: string;
  precio_consumidor: string;
  precio_distribuidor: string;
  descripcion: string;
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
    { Header: "PRODUCTOS", accessor: "producto" },
    { Header: "PRECIO CONSUMIDOR", accessor: "precio_consumidor" },
    { Header: "PRECIO DISTRIBUIDOR", accessor: "precio_distribuidor" },
    { Header: "DESCRIPCION", accessor: "descripcion" },
  ];

  const data = [
    {
      id: 1,
      producto: "producto 1",
      precio_consumidor: "2.00",
      precio_distribuidor: "1.89",
      descripcion: "descripcion del produto 1",
    },
    {
      id: 2,
      producto: "producto 2",
      precio_consumidor: "2.00",
      precio_distribuidor: "1.89",
      descripcion: "descripcion del produto 2",
    },
    {
      id: 3,
      producto: "producto 3",
      precio_consumidor: "2.00",
      precio_distribuidor: "1.89",
      descripcion: "descripcion del produto 3",
    },
    {
      id: 1,
      producto: "producto 4",
      precio_consumidor: "2.00",
      precio_distribuidor: "1.89",
      descripcion: "descripcion del produto 4",
    },
  ];

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
        <ProductForm
          defaultValues={
            selectedRecord || {
              id: "",
              producto: "",
              precio_consumidor: "",
              precio_distribuidor: "",
              descripcion: "",
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
    </>
  );
};

export default Consumers;
