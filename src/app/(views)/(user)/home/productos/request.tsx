"use client";
import React, { useEffect, useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import CardItem from "@/app/components/common/cardItem";
import Modal from "@/app/components/common/modal";
import ProductForm from "./ProductForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";

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

const request = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/platform");
        console.log(response.data);
        const filteredPlatforms = response.data.filter((platform: any) => {
          return platform.status === "IMMEDIATE_DELIVERY";
        });
        setProducts(filteredPlatforms);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      axios.post;
    } catch (error) {
      closeModal();
      // mensaje de error
    }
  };
  return (
    <div className="w-full">
      <ContainerCard title="Entrega inmediata">
        {products.map((product, index) => (
          <CardItem
            key={index}
            title={product.name} /* name plataforma */
            url={product.img_url}
            description={
              product.description
            } /* description plataforma */
            price_in_cents={product.price_in_cents}
            price_distributor_in_cents={product.price_distributor_in_cents}
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
