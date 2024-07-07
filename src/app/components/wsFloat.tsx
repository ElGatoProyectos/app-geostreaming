import Link from "next/link";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";

const wsFloat = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div
      className={`fixed z-20  right-0 md:right-4 rounded-t-[50px] h-fit md:max-w-[300px] ${
        show ? "w-full bottom-0" : "w-fit bottom-4"
      }`}
    >
      <button
        onClick={handleShow}
        className={`${
          show ? "absolute top-0 right-0 -translate-y-1/2" : "relative"
        } p-2 bg-white border-gray-100 border rounded-lg text-[#F2308B] z-[5] shadow-xl  hover:bg-gray-300 transition-all duration-300`}
      >
        <FaAngleDoubleDown className={` ${show? '' : 'rotate-180'}`} />
      </button>
      {show && (
        <div className="relative z-[1] bg-[#F2308B] rounded-t-[50px] flex px-8 py-3 text-white text-sm flex-row gap-4 items-center w-full">
          <img
            src="/chica.png"
            alt="chica call center"
            loading="lazy"
            className="md:absolute h-16 md:h-20 top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-full"
          />
          <div className="flex flex-col items-center text-xs">
            <p className=" text-white text-center">
              Para aprobación de acreditaciones, envíe su info y comprobante al
              sgte. numero.
            </p>
            <Link
              href={"https://wa.link/5hyrwj"}
              target="_blank"
              className="mt-2 "
            >
              <FaWhatsapp className="text-green-600 inline text-lg md:text-xl mr-2" />
              +593986221088{" "}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default wsFloat;
