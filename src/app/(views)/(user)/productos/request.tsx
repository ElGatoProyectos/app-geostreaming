"use client";
import React, { useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import { DproductoInmediato } from "@/data/DproductoInmediato";
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

const request = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ProductInfo | null>(null);
  const [registeredInfo, setRegisteredInfo] = useState<ProductInfo | null>(
    null
  );

  const handleOpenModal = (title: string, info: ProductInfo) => {
    setModalTitle(title);
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalInfo = (info: ProductInfo) => {
    setRegisteredInfo(info);
    setIsModalInfoOpen(true);
  };

  const closeModalInfo = () => {
    setIsModalInfoOpen(false);
  };

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    // Lógica
    console.log(data);
    // verificar si el producto está disponible

    closeModal();
  };
  return (
    <div className="w-full">
      <ContainerCard title="Entrega inmediata">
        {DproductoInmediato.map((item, index) => (
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
      {/* modal de confirmacion */}
      <Modal
        isOpen={isModalInfoOpen}
        onClose={closeModalInfo}
        title="Producto Registrado"
      >
          <div>
            <table className="max-w-250px w-full mx-auto table-auto">
              <tbody>
                <tr>
                  <td className="font-medium p-2">Item:</td>
                  <td className="p-2"> item</td>
                </tr>
                <tr>
                  <td className="font-medium p-2">Item:</td>
                  <td className="p-2"> item</td>
                </tr>
                <tr>
                  <td className="font-medium p-2">Item:</td>
                  <td className="p-2"> item</td>
                </tr>
              </tbody>
            </table>
          </div>
      </Modal>
    </div>
  );
};

export default request;
