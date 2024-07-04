"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import PlatformForm from "./platformForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadForm from "./uploadForm";

type PlatformStatus = "IMMEDIATE_DELIVERY" | "UPON_REQUEST";

type Platform = {
  id?: number;
  name?: string;
  description?: string;
  img_url?: string;
  price_in_cents?: number;
  price_distributor_in_cents?: number;
  status?: PlatformStatus;
  days_duration?: number;
};
type InputsUpload = {
  file: string;
};

const Platform = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Platform | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  /* modal add and edit */

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* modal upload */
  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get("/api/platform");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching platforms:", error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  /* carga masiva */
  const handleUpload: SubmitHandler<InputsUpload> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      await axios.post("/api/platform/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Se subió correctamente");
    } catch (e) {
      
      toast.error("Error al subir el archivo");
    }
    closeUploadModal();
  };

  const handleSavePlatform: SubmitHandler<Platform> = async (data) => {
  
    setLoading(true);
    try {
      if (data.id) {
      
        await axios.patch(`/api/platform/${data.id}`, {
          img_url: data.img_url,
          name: data.name,
          description: data.description,
          days_duration: data.days_duration,
          price_in_cents: data.price_in_cents,
          price_distributor_in_cents: data.price_distributor_in_cents,
          status: data.status,
        });
        toast.success("Se actualizo correctamente");
      } else {
     
        await axios.post("/api/platform", {
          img_url: data.img_url,
          name: data.name,
          description: data.description,
          days_duration: data.days_duration,
          price_in_cents: data.price_in_cents,
          price_distributor_in_cents: data.price_distributor_in_cents,
          status: data.status,
        });
        toast.success("Se guardo correctamente");
      }
      fetchPlatforms();

      closeModal();
    } catch (error) {
      console.error("Error al guardar la cuenta:", error);
      toast.error("Hubo un error al guardar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Imagen",
      accessor: (row: Platform) => (
        <img
          className="w-10 h-10 object-cover aspect-square rounded-full"
          src={row.img_url}
          alt={row.name}
        />
      ),
    },
    {
      Header: "Plataforma",
      accessor: "name",
    },
    {
      Header: "Tipo",
      accessor: (row: Platform) =>
        row.status === "IMMEDIATE_DELIVERY" ? "Entrega inmediata" : "A pedido",
    },
    { Header: "PRECIO CONSUMIDOR ($)", accessor: (row: any) => (row.price_in_cents/100).toFixed(2) },
    {
      Header: "PRECIO DISTRIBUIDOR ($)",
      accessor: (row: any) =>(row.price_distributor_in_cents/100).toFixed(2) ,
    },
    {
      Header: "DESCRIPCIÓN",
      accessor: "description",
    },
    {
      Header: "Días de duración",
      accessor: "days_duration",
    },
  ];

  const handleEdit = async (record: Platform) => {
    try {
      const response = await axios.get(`/api/platform/${record.id}`);
      setSelectedRecord(response.data);
      setModalTitle("Editar plataforma");
      setIsModalOpen(true);
    } catch (error) {
    
      toast.error("Error al obtener los datos");
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar plataforma");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Platform) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRecord) return;

    try {
      await axios.delete(`/api/platform/${selectedRecord.id}`);

      setSelectedRecord(null);
      setIsDeleteModalOpen(false);
      toast.success("Se elimino correctamente");
    } catch (e) {
      
      toast.error("Error al eliminar registro");
    }
  };

  return (
    <>
      <Table
        columns={columns}
        data={platforms}
        showActions={true}
        addRecord={true}
        title="Plataformas"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        uploadFile={true}
        onUpload={openUploadModal}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <PlatformForm
          defaultValues={selectedRecord || {}}
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
      {/* modal carga masiva */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Carga masiva"
      >
        <UploadForm onSubmit={handleUpload} />
      </Modal>
    </>
  );
};

export default Platform;
