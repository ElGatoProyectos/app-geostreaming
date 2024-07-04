"use client";
import React, { useEffect, useState } from "react";
import ContainerCard2 from "@/app/components/common/containerCard2";
import UserForm from "./userForm";
import BankForm from "./bankForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type InputsPersonal = {
  dni?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  country_code?: string;
  file?: string;
};

const profile = () => {
  const session = useSession();
  const [user, setUser] = useState<any>({});

  const fetchData = async () => {
    const { data } = await axios.get(`/api/user/${session.data?.user.id}`);
  
    setUser(data);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      fetchData();
    }
  }, []);
  
  const handleSavePersonal: SubmitHandler<InputsPersonal> = async (data:any) => {
    try {
      // aqui va fetch profile
      const formDataAll = new FormData();
      formDataAll.append("email", String(data.email));
      formDataAll.append("role", String(session.data?.user.role));
      formDataAll.append("full_name", String(data.full_name));
      formDataAll.append("dni", String(data.dni));
      formDataAll.append("file", data.file[0]);
      formDataAll.append("phone", String(data.phone));
      formDataAll.append("country_code", String(data.country_code));

     
      await axios.patch(`/api/user/${session.data?.user.id}`, formDataAll, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Información actualizado");
    } catch (e) {
     
      toast.error("Error al actualizar su información");
    }
  };
 
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8">
      {session.status === "authenticated" && (
         <ContainerCard2 title="Tu Información Personal">
         <UserForm
           defaultValues={{
             dni: user.dni,
             full_name: user.full_name,
               phone: user.phone,
               country_code: user.country_code,
               email: String(session.data?.user.email),
           }}
           avatar={`/users/user_${user.id}.png`}
           onSubmit={handleSavePersonal}
         />
       </ContainerCard2>

      ) }
     
    </div>
  );
};

export default profile;
