"use client";
import { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import BankForm from "./bankForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  id?: number;
  bank?: string;
  number?: string;
  name?: string;
  type?: string;
  img_url?: string;
};
const Bank = () => {
  const [banks, setBanks] = useState<Inputs[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Inputs | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchBanks = async () => {
    try {
      const response = await axios.get("/api/bank");
      setBanks(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };
  useEffect(() => {
    fetchBanks();
  }, []);

  const handleSaveBank: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (data.id) {
        console.log("hehe");
        await axios.put(`/api/bank/${data.id}`, {
          bank: data.bank,
          number: data.number,
          name: data.name,
          type: data.type,
        });
        toast.success("Se actualizo correctamente");
      } else {
        console.log("hehe");

        // const res = await fetch("/api/img/upload", {
        //   method: "POST",
        //   body: data.img_url,
        // });

        // if (!res.ok) {
        //   console.error("Error en la respuesta:", res.statusText);
        //   return;
        // }

        // const text = await res.text();
        // if (!text) {
        //   console.error("Respuesta vacía");
        //   return;
        // }

        // const dataimg = JSON.parse(text);
        // console.log("data", dataimg);

        await axios.post("/api/bank", {
          bank: data.bank,
          number: data.number,
          name: data.name,
          type: data.type,
          bank_url: "sadsadsa",
        });
        toast.success("Se guardo correctamente");
      }

      useEffect(() => {
        fetchBanks();
      }, []);

      closeModal();
    } catch (error) {
      console.error("Error al guardar el registro:", error);
      toast.error("Hubo un error al guardar el registro");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Banco", accessor: "bank" },
    { Header: "Número", accessor: "number" },
    { Header: "Nombre", accessor: "name" },
    { Header: "Tipo", accessor: "type" },
  ];

  const handleEdit = async (record: Inputs) => {
    try {
      const response = await axios.get(`/api/bank/${record.id}`);
      setSelectedRecord(response.data);
      setModalTitle("Editar banco");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar banco");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Inputs) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/bank/${selectedRecord?.id}`);
      toast.success("Registro eliminado correctamente");
      fetchBanks();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      toast.error("Hubo un error al eliminar el registro");
    }
  };

  return (
    <div>
      <Table
        columns={columns}
        data={banks}
        showActions={true}
        addRecord={true}
        title="Bancos"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <BankForm
          defaultValues={selectedRecord || {}}
          onSubmit={handleSaveBank}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este banco?</p>
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

export default Bank;
