'use client';
import { useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import AccountForm from "@/app/components/forms/accountForm";
import { SubmitHandler } from "react-hook-form";

type Inputs = {
  id: string;
  name: string;
};

const Account = () => {
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

  const handleSaveAccount: SubmitHandler<Inputs> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar cuenta:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar cuenta:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "CUENTA", accessor: "name" },
  ];

  const data = [
    {
      id: 1,
      name: "prueba1",
    },
    {
      id: 2,
      name: "prueba2",
    },
  ];

  const handleEdit = (record: Inputs) => {
    setSelectedRecord(record);
    setModalTitle("Editar cuenta");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar cuenta");
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
      <div>
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
        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
          <AccountForm
            defaultValues={selectedRecord || { id: "", name: "" }}
            onSubmit={handleSaveAccount}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirmar eliminación"
        >
          <div>
            <p>¿Está seguro(a) de que quiere eliminar esta cuenta?</p>
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white mt-4 px-4 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        </Modal>
        </div>
  );
};

export default Account;
