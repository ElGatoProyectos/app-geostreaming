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
  ref_id?: number;
  role: number;
  full_name: string;
  dni?: string;
  phone: string;
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
      console.log("Editar categoría:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar categoría:", data);
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
          title="Afiliados"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <AfiliadosForm
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
          onSubmit={handleSaveAfiliados}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este afiliado?</p>
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

export default register;
