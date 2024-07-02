"use client";
import React, { useEffect, useState } from "react";
import ContainerCard2 from "@/app/components/common/containerCard2";
import UserForm from "./userForm";
import BankForm from "./bankForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";

type InputsPersonal = {
  dni: string;
  full_name: string;
  email: string;
  phone: string;
  country_code?: string;
  file?: string;
};

const profile = () => {
  const session = useSession();
  const [user, setUser] = useState<any>({});

  const fetchData = async () => {
    const { data } = await axios.get(`/api/user/${session.data?.user.id}`);
    console.log(data);
    setUser(data);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      fetchData();
    }
  }, []);
  
  const handleSavePersonal: SubmitHandler<InputsPersonal> = async (data) => {
    console.log("Editar información personal:", data);
  };
 
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8">
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
    </div>
  );
};

export default profile;
