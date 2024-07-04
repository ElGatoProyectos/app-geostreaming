"use client";
import React, { useEffect, useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import CardItem from "@/app/components/common/cardItem";
import Modal from "@/app/components/common/modal";
import ProductForm from "./PlatformForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from "next-auth/react";
import PlatformForm from "../PlatformForm";

interface ProductInfo {
  id: number;
  title: string;
  url?: string;
}

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
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ProductInfo | null>(null);
  const [registeredInfo, setRegisteredInfo] = useState<ProductInfo | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const session = useSession();

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
  const handleFormSubmit:SubmitHandler<any>  = async (data) => {
    try {
      await axios.post("/api/order/", {
        user_id: Number(session.data?.user.id),
        platform_id: modalInfo?.id,
        phone: data.phone,
        country_code: data.country_code,
        status: "PENDING",
      });
      closeModal();
      toast.success("Plataforma comprada");
    } catch (error) {
      
      toast.error("Error de compra");
      closeModal();
    }
  };

  /* const handleFormSubmit = async (id: number) => {
    try {
      await axios.post("/api/order/", {
        user_id: Number(session.data?.user.id),
        platform_id: id,
        status: "PENDING",
      });
      closeModal();
      toast.success("Plataforma comprada");
    } catch (error) {
      toast.error("error de compra");
      closeModal();
    }
  }; */
  return (
    <div className="w-full">
      <ContainerCard title="Bajo pedido (1 hora)">
        {platforms.map((platform, index) => (
          <CardItem
            key={index}
            id={platform.id}
            title={platform.name}
            url={platform.img_url}
            description={platform.description}
            price_in_cents={platform.price_in_cents}
            price_distributor_in_cents={platform.price_distributor_in_cents}
            btn={"Comprar"}
            onOpenModal={handleOpenModal}
          />
        ))}
      </ContainerCard>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalInfo && (
          <PlatformForm info={modalInfo} onSubmit={handleFormSubmit}></PlatformForm>
        )}
      </Modal>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalInfo && (
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              className="h-16 w-16 object-contain"
              src={modalInfo.url}
              alt={modalInfo.title}
            />
            <h2 className="font-semibold">{modalInfo.title}</h2>
            <div className=" w-full flex flex-col gap-4">
              <button
                onClick={() => handleFormSubmit(modalInfo.id)}
                className="bg-[#F2308B] text-white mt-4 px-4 py-1 rounded hover:bg-[#F06FAC] transition-all duration-300 mx-auto "
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <AiOutlineLoading3Quarters className=" animate-spin inline-block" />{" "}
                    Cargando
                  </span>
                ) : (
                  "Comprar"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal> */}
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

export default Delivery;
