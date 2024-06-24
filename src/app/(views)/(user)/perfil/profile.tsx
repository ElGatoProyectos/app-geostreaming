"use client";
import React from "react";
import ContainerCard2 from "@/app/components/common/containerCard2";
import UserForm from "./userForm";
import BankForm from "./bankForm";
import { SubmitHandler } from "react-hook-form";

type InputsPersonal = {
  username: string;
  name: string;
  email: string;
  phone: string;
  acreditaciones: string;
  avatar: string;
};
type InputsBank = {
  bank: string;
  number: string;
  owner: string;
  type: string;
};

const profile = () => {
  const data = 
    {
      username: "user 1",
      name: "name",
      email: "email@example.com",
      phone: "999999999",
      acreditaciones: "prueba",
      avatar: "url",
    };
  
  const dataBank = 
    {
      bank: "banco prueba",
      number: "",
      owner: "",
      type: "",
    };


  const handleSavePersonal: SubmitHandler<InputsPersonal> = async (data) => {
    console.log("Editar informacion personal:", data);
  };
  const handleSaveBank: SubmitHandler<InputsBank> = async (data) => {
    console.log("Editar informacion del banco:", data);
  };
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8">
      <ContainerCard2 title="Tu Información Personal">
        <UserForm
          defaultValues={ 
            {username: data.username,
              name: data.name,
              email: data.email,
              phone: data.phone,
              acreditaciones: data.acreditaciones,
              avatar:data.avatar,
            }
          }
          onSubmit={handleSavePersonal}
        />
      </ContainerCard2>

      <ContainerCard2 title="Tu Información Bancaria">
        <BankForm
          defaultValues={{
            bank: dataBank.bank,
            number: dataBank.number,
            owner: dataBank.owner,
            type: dataBank.type,
          }}
          onSubmit={handleSaveBank}
        />
      </ContainerCard2>
    </div>
  );
};

export default profile;
