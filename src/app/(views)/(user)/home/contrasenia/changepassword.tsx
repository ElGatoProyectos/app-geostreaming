import React from "react";
import ContainerCard2 from "@/app/components/common/containerCard2";
import PasswordForm from "./passwordForm";

const profile = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto mt-8">
      <ContainerCard2 title="Cambiar contraseña">
        <PasswordForm />
      </ContainerCard2>
    </div>
  );
};

export default profile;
