"use client";
import React from "react";
import ContainerCard2 from "@/app/components/common/containerCard2";
import UserForm from "./userForm";
import BankForm from "./bankForm";
import { SubmitHandler } from "react-hook-form";

type InputsPersonal = {
  username: string;
  full_name: string;
  email: string;
  phone: string;
  acreditaciones?: string;
  avatar?: string;
  code_country?:string;
};
type InputsBank = {
  bank: string;
  number: string;
  name: string;
  type: string;
};

const profile = () => {
  const data = 
    {
      username: "user1",
      full_name: "name",
      email: "email@example.com",
      phone: "999999999",
      acreditaciones: "prueba",
      avatar: "/user.jpg",
    };
  
  const dataBank = 
    {
      bank: "banco prueba",
      number: "",
      name: "",
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
              full_name: data.full_name,
              email: data.email,
              phone: data.phone,
              acreditaciones: data.acreditaciones,
            }
          }
          avatar={data.avatar}
          onSubmit={handleSavePersonal}
        />
      </ContainerCard2>

     {/*  <ContainerCard2 title="Tu Información Bancaria">
        <BankForm
          defaultValues={{
            bank: dataBank.bank,
            number: dataBank.number,
            name: dataBank.name,
            type: dataBank.type,
          }}
          onSubmit={handleSaveBank}
        />
      </ContainerCard2> */}
    </div>
  );
};

export default profile;
