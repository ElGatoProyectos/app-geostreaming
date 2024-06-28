"use client";
import { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import { SubmitHandler } from "react-hook-form";
import AfiliadosForm from "./afiliadosForm";
import NoRecords from "@/app/components/common/noRecords";

type Inputs = {
  username: string;
  email: string;
  full_name: string;
  phone: string;
  date: string;
};

const register = () => {
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

  const handleSaveAfiliados: SubmitHandler<Inputs> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar afiliado:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar afiliado:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "Código", accessor: "id" },
    { Header: "Username", accessor: "username" },
    { Header: "Nombre", accessor: "full_name" },
    { Header: "Correo", accessor: "email" },
    { Header: "Celular", accessor: "phone" },
    { Header: "Fecha de ingreso", accessor: "date" },
  ];

  const data: any[] = [];

  const handleEdit = (record: Inputs) => {
    setSelectedRecord(record);
    setModalTitle("Editar afiliado");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar afiliado");
    setIsModalOpen(true);
  };

  return (
    <>
      <Table
        columns={columns}
        data={data}
        showActions={true}
        addRecord={true}
        title="Afiliados"
        onAdd={handleAdd}
        onEdit={handleEdit}
        /* hay un carrito */
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <AfiliadosForm
          defaultValues={
            selectedRecord || {
              username: "",
              email: "",
              full_name: "",
              phone: "",
              date: "",
            }
          }
          onSubmit={handleSaveAfiliados}
        />
      </Modal>
    </>
  );
};

export default register;
