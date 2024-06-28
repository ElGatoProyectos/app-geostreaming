"use client";
import React, { useEffect, useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import { Dcuentas } from "@/data/Dcuentas";
import CardItem from "@/app/components/common/cardItem";
import Modal from "@/app/components/common/modal";
import CreditacionesForm from "./creditacionesForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AccountInfo {
  title: string;
  account_number?: string;
}
type Inputs = {
  id?: number;
  voucher_number: string;
  value: string;
  date: string;
};

const Account = () => {
  const [banks, setBanks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalInfo, setModalInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (title: string, info: AccountInfo) => {
    setModalTitle("Registrar Deposito");
    setModalInfo(info);
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

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      await axios.put(`/api/voucher/`, {
        voucher_number: data.voucher_number,
        value: data.value,
        date: data.date,
        user_id: 1 /* modificar */,
      });
      toast.success("Se registro correctamente");
      useEffect(() => {
        fetchBanks();
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
      <ContainerCard title="Cuentas">
        {banks.map((item) => (
          <CardItem
            key={item.id}
            title={item.bank}
            url={item.url}
            account_number={item.number}
            account_holder={item.name}
            btn={"Registrar"}
            type={item.type}
            onOpenModal={handleOpenModal}
          />
        ))}
      </ContainerCard>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalInfo && (
          <CreditacionesForm
            info={{
              title: modalInfo.title,
              numberAccount: modalInfo.account_number!,
            }}
            onSubmit={handleFormSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default Account;
