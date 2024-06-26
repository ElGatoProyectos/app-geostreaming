"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import ProductForm from "./productForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProductStatus = "IMMEDIATE_DELIVERY" | "UPON_REQUEST";

const statusMapping: Record<ProductStatus, string> = {
  IMMEDIATE_DELIVERY: "Entrega inmediata",
  UPON_REQUEST: "A pedido",
};

const reverseStatusMapping: Record<string, ProductStatus> = {
  "Entrega inmediata": "IMMEDIATE_DELIVERY",
  "A pedido": "UPON_REQUEST",
};

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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        const transformedProducts = response.data.products.map(
          (product: Product) => ({
            ...product,
            status: statusMapping[product.status],
          })
        );
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSaveProduct: SubmitHandler<Product> = async (data) => {
    if (selectedRecord) {
      // Lógica para editar
      console.log("Editar producto:", data);
    } else {
      // Lógica para agregar
      console.log("Agregar producto:", data);
    }
    closeModal();
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "producto", accessor: (row: Product) => row.platform.name },
    { Header: "Tipo", accessor: "status" },
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

  const handleEdit = (record: Product) => {
    const editedRecord = {
      ...record,
      status: reverseStatusMapping[record.status],
    };
    setSelectedRecord(editedRecord);
    setModalTitle("Editar producto");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar producto");
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
      const updatedProduct = products.filter((product) => product.id !== selectedRecord.id);
      setProducts(updatedProduct);
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
        data={products}
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

export default Products;
