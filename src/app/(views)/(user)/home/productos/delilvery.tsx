"use client";
import React, { useEffect, useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import CardItem from "@/app/components/common/cardItem";
import Modal from "@/app/components/common/modal";
import ProductForm from "./ProductForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductInfo {
  title: string;
  url?: string;
}
type Inputs = {
  email: string;
};

type Product = {
  id: number;
  platform_id: number;
  price_in_cents: number;
  price_distributor_in_cents: number;
  inOnDemand: boolean;
  name: string;
  img_url: string;
  description: string;
};

const Delivery = () => {
  const [platforms, setPlatforms] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalInfo, setModalInfo] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (title: string, info: ProductInfo) => {
    setModalTitle(title);
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchPlatform = async () => {
    try {
      const response = await axios.get("/api/platform");
      const filteredPlatforms = response.data.filter((platform: any) => {
        return platform.status === "UPON_REQUEST";
      });
      setPlatforms(filteredPlatforms);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchPlatform();
  }, []);

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);
    try {

      await axios.put(`/api/order/`, {
        
      });
      toast.success("Se registro correctamente");
      useEffect(() => {
        fetchPlatform();
      }, []);

      closeModal();
    } catch (error) {
      console.error("Error al registrar su compra:", error);
      toast.error("Hubo un error al registrar su compra");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <ContainerCard title="Bajo pedido (1 hora)">
        {platforms.map((platform, index) => (
          <CardItem
            key={index}
            title={platform.name} 
            url={platform.img_url}
            description={
              platform.description
            } 
            price_in_cents={platform.price_in_cents}
            price_distributor_in_cents={platform.price_distributor_in_cents}
            btn={"Comprar"}
            onOpenModal={handleOpenModal}
          />
        ))}
      </ContainerCard>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalInfo && (
          <ProductForm
            info={{
              title: modalInfo.title,
              url: modalInfo.url,
            }}
            onSubmit={handleFormSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default Delivery;
