"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ProductForm from "./platformForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadForm from "./uploadForm";

type ProductStatus = "IMMEDIATE_DELIVERY" | "UPON_REQUEST";

interface Platform {
  id: number;
  name: string;
  description: string;
  img_url: string;
}

type Product = {
  id: number;
  price_in_cents: number;
  price_distributor_in_cents: number;
  platform: Platform;
  status: ProductStatus;
};

const Platform = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  /* modal add and edit */
  const openModal = () => {
    setIsModalOpen(true);
  };

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
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (data.id) {
        await axios.put(`/api/product/${data.id}`,
          {
            
          } );
        toast.success("Se actualizo correctamente");
      } else {
        await axios.post("/api/product", {
          
        });
        toast.success("Se guardo correctamente");
      }

      useEffect(() => {
        fetchProducts();
      }, []);

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
    { Header: "plataforma", accessor: (row: Product) => row.platform.name },
    {
      Header: "Tipo",
      accessor: (row: Product) =>
        row.status === "IMMEDIATE_DELIVERY" ? "Entrega inmediata" : "A pedido",
    },
    { Header: "PRECIO CONSUMIDOR ($)", accessor: "price_in_cents" },
    {
      Header: "PRECIO DISTRIBUIDOR ($)",
      accessor: "price_distributor_in_cents",
    },
    {
      Header: "DESCRIPCIÓN",
      accessor: (row: Product) => row.platform.description,
    },
  ];

  const handleEdit = async (record: Product) => {
    try {
      const response = await axios.get(`/api/product/${record.id}`);
      setSelectedRecord(response.data);
      setModalTitle("Editar plataforma");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar plataforma");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Product) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRecord) return;

    try {
      await axios.delete(`/api/product/${selectedRecord.id}`);
      const updatedProduct = products.filter(
        (product) => product.id !== selectedRecord.id
      );
      setProducts(updatedProduct);
      setSelectedRecord(null);
      setIsDeleteModalOpen(false);
      toast.success("Se elimino correctamente");
    } catch (e) {
      toast.error("Error al eliminar registro");
    }
  };
  /* carga masiva */
  const handleUpload = async () =>{
    //
  }

  return (
    <>
      <Table
        columns={columns}
        data={products}
        showActions={true}
        addRecord={true}
        title="Productos"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        uploadFile={true}
        onUpload={openUploadModal} 
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <ProductForm
          defaultValues={
            selectedRecord || {
              id: 0,
              price_in_cents: 0,
              price_distributor_in_cents: 0,
              status: "IMMEDIATE_DELIVERY",
              platform: {
                id: 0,
                name: "",
                description: "",
                img_url: "",
              },
            }
          }
          onSubmit={handleSaveProduct}
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
        <UploadForm onSubmit={handleUpload}/>
      </Modal>
    </>
  );
};

export default Platform;
