"use client";
import React, { useEffect, useState } from "react";
import ContainerCard2 from "@/app/components/common/containerCard2";
import UserForm from "./userForm";
import BankForm from "./bankForm";
import { SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type InputsPersonal = {
  full_name?: string;
  email?: string;
  phone?: string;
  country_code?: string;
  file?: string;
};
type InputsBank = {
  bank: string;
  number: string;
  name: string;
  type: string;
};

const profile = () => {
  const session = useSession();
  const [admin, setAdmin] = useState<any>({});

  const fetchData = async () => {
    const { data } = await axios.get(`/api/admin/${session.data?.user.id}`);
    console.log(data);
    setAdmin(data);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      fetchData();
    }
  }, []);

  const handleSavePersonal: SubmitHandler<InputsPersonal> = async (
    data: any
  ) => {
    try {
      const formDataAll = new FormData();
      formDataAll.append("email", data.email);
      formDataAll.append("role", String(session.data?.user.role));
      formDataAll.append("full_name", data.full_name);
      formDataAll.append("file", data.file[0]);
      formDataAll.append("phone", String(data.phone));
      formDataAll.append("country_code", data.country_code);

      console.log(formDataAll);
      await axios.patch(`/api/admin/${session.data?.user.id}`, formDataAll, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Información actualizado");
    } catch (e) {
      console.log("Error", e);
      toast.error("Error al actualizar su información");
    }
  };
  /*   const handleSaveBank: SubmitHandler<InputsBank> = async (data) => {
    console.log("Editar información del banco:", data);
  }; */
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8">
      {session.status === "authenticated" && (
        <ContainerCard2 title="Tu Información Personal">
          <UserForm
            defaultValues={{
              full_name: admin.full_name,
              phone: admin.phone,
              country_code: admin.country_code,
              email: session.data?.user.email,
            }}
            avatar={`/admin/admin_${admin.id}.png` }
            onSubmit={handleSavePersonal}
          />
        </ContainerCard2>
      )}

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
