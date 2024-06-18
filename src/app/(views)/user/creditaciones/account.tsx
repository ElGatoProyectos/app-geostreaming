import React from "react";
import ContainerCard from "@/app/components/common/containerCard";
import { Dcuentas } from "@/data/Dcuentas";
import CardItem from "@/app/components/common/cardItem";

const Account = () => {
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
          />
        ))}
      </ContainerCard>
    </div>
  );
};

export default Account;
