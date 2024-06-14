'use client';
import { BsBuildings } from "react-icons/bs";
import { BsEmojiLaughing } from "react-icons/bs";
import { BsEmojiWink } from "react-icons/bs";
import { RiCheckDoubleLine } from "react-icons/ri";

const services = () => {
  const dServices = [
    {
      name: "Servicio para Consumidores Finales.",
      items: [
        "Compra al precio más bajo del mercado.",
        "Entrega inmediata dependiendo el stock.",
        "Las credenciales de la cuenta que compres son personales y te llegan a tu correo o Whatsapp.",
      ],
      description: "Pasa los fines de semana en compañía de tu familia o amigos disfrutando de las mejores películas, canales o series que brinda cada una de las plataformas de streaming que tenemos disponible.",
    },
    {
      name: "Servicio para distribuidores",
      items: [
        "Vende cada uno de nuestros productos al mejor costo de distribución que puedes encontrar.",
        "Genera ganancias ilimitadas con cada venta que realices.",
        "Ofrece más productos en tu negocio y no dejes de tener nuevos clientes.",
      ],
      description: "Si tienes una tienda, farmacia, cyber o cualquier tipo de negocio contáctanos y ofrece cuentas de entretenimiento para que obtengas más ganancias.",
    },
    {
      name: "Servicio WebService",
      items: [
        "Conecta tu plataforma con la nuestra bajo los estándares más seguros.",
        "Evita realizar ventas manuales.",
        " Aumenta tu cartera de productos.",
      ],
      description: "Si tienes una plataforma y necesitas nuestro servicio automático, contáctate con nosotros y distribuye nuestros servicios de una manera más segura..",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <ul className="flex gap-8 w-4/5 mx-auto text-[#444444]">
            <li className="w-1/3 border border-gray-300 group hover:border-gray-200 transition-all duration-300 bg-[#F2308B] ">
              <button className="w-full p-4">
                <BsEmojiLaughing className="text-3xl mx-auto text-white  transition-all duration-300" />
              </button>
            </li>
            <li className="w-1/3 border border-gray hover:border-gray-200 transition-all duration-300-300 group ">
              <button className="w-full p-4">
                <BsEmojiWink className="text-3xl mx-auto group-hover:text-[#F2308B] transition-all duration-300" />
              </button>
            </li>
            <li className="w-1/3 border border-gray-300 group hover:border-gray-200 transition-all duration-300 ">
              <button className="w-full p-4">
                <BsBuildings className="text-3xl mx-auto group-hover:text-[#F2308B]  transition-all duration-300" />
              </button>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <img
            src="https://www.sitiospremium.com/imagenes/interfazexterna/tabs-2.jpg"
            alt="consumidores finales"
          />
          <div className="flex flex-col gap-4 mt-4 text-[#444444]">
            <h3 className="text-[1.5rem] font-semibold ">Servicio para Consumidores Finales.</h3>
            <ul>
              <li className="mb-4">
                <RiCheckDoubleLine className="text-[#F2308B] text-xl inline-block mr-2" />
                <span>Compra al precio más bajo del mercado.</span>
              </li>
              <li className="mb-4">
                <RiCheckDoubleLine className="text-[#F2308B] text-xl inline-block mr-2" />
                <span>Entrega inmediata dependiendo el stock.</span>
              </li>
              <li className="mb-4">
                <RiCheckDoubleLine className="text-[#F2308B] text-xl inline-block mr-2" />
                <span>
                  {" "}
                  Las credenciales de la cuenta que compres son personales y te
                  llegan a tu correo o Whatsapp.
                </span>
              </li>
            </ul>
            <p>
              Pasa los fines de semana en compañía de tu familia o amigos
              disfrutando de las mejores películas, canales o series que brinda
              cada una de las plataformas de streaming que tenemos disponible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default services;
