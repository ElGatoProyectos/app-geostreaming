import React from "react";
import ContainerCard from "@/app/components/common/containerCard";
import { DproductoInmediato } from "@/data/DproductoInmediato";
import CardItem from "@/app/components/common/cardItem";
const request = () => {
  return (
    <div className="w-full">
      <ContainerCard title="Entrega inmediata">
        {DproductoInmediato.map((item, index) => (
          <CardItem
            key={index}
            title={item.title}
            url={item.url}
            description={item.description}
            consumer_price={item.consumer_price}
            btn={item.btn}
          />
        ))}
      </ContainerCard>
    </div>
  );
};

export default request;
