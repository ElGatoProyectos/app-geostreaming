'use client';
import { DproductoPedido } from "@/data/DproductoPedido";
import React, { useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import CardItem from "@/app/components/common/cardItem";
import Modal from "@/app/components/common/modal";
import ProductForm from "./ProductForm";
import { SubmitHandler } from "react-hook-form";

interface ProductInfo {
  title: string;
  url?: string;
}
type Inputs = {
  email: string;
};

const delilvery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalInfo, setModalInfo] = useState<ProductInfo | null>(null);

  const handleOpenModal = (title: string, info: ProductInfo) => {
    setModalTitle(title);
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    // Lógica 
    console.log(data);
    closeModal(); 
  };
  return (
    <div className="w-full">
      <ContainerCard title="Bajo pedido (1 hora)">
        {DproductoPedido.map((item, index) => (
          <CardItem
          key={index}
          title={item.title}
          url={item.url}
          description={item.description}
          consumer_price={item.consumer_price}
          distributors_price={item.distributors_price}
          btn={item.btn}
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

export default delilvery;
