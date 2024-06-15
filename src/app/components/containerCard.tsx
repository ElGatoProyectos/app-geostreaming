import React from "react";
import CardProduct from "./cardProduct";
import Modal from "./admin/modal";
import { string } from "zod";

interface Product {
    isNew: boolean;
    title: string;
    url: string;
    description: string;
    consumer_price: string;
  }
interface Props {
    data: Product[];
    title: string;
}

const ContainerCard: React.FC<Props> = (props) => {

    const { data, title } = props;

  return (
    <div className="w-full rounded-xl shadow-box bg-white p-8">
      <h2 className="text-[#277FF2] capitalize text-xl mb-8 font-semibold">
        {title}
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center items-start gap-4 md:gap-8 lg:gap-12 2xl:gap-16">
        {data.map((item, index) => (
            <CardProduct
            key={index}
            isNew={item.isNew}
            title={item.title}
            url={item.url}
            description={item.description}
            consumer_price={item.consumer_price}
          />
        ))}
      </section>
      {/* <Modal/> */}
    </div>
  );
};

export default ContainerCard;
