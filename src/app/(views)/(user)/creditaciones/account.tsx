'use client'
import React, { useState } from "react";
import ContainerCard from "@/app/components/common/containerCard";
import { Dcuentas } from "@/data/Dcuentas";
import CardItem from "@/app/components/common/cardItem";
import Modal from "@/app/components/common/modal";
import CreditacionesForm from "./creditacionesForm";
import { SubmitHandler } from "react-hook-form";

interface AccountInfo {
  title: string;
  account_number?: string;
}
type Inputs = {
  voucher_number: string;
  value: string;
  date: string;
};
const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalInfo, setModalInfo] = useState<AccountInfo | null>(null);

  const handleOpenModal = (title: string, info: AccountInfo) => {
    setModalTitle("Registrar Deposito");
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    // Lógica para manejar el envío del formulario
    console.log(data);
    closeModal(); 
  };

  return (
    <div className="w-full">
      <ContainerCard title="Cuentas">
        {Dcuentas.map((item, index) => (
          <CardItem
            key={index}
            title={item.title}
            url={item.url}
            account_number={item.account_number}
            account_holder={item.account_holder}
            btn={item.btn}
            type= {item.type}
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
