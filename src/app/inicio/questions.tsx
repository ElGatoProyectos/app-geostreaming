"use client";
import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Aos from "aos";
import "aos/dist/aos.css";

const data = [
  {
    title: "¿Tiene algún costo el uso de la plataforma?",
    content: "No, el uso de la plataforma es totalmente gratuito.",
  },
  {
    title: "¿Cómo empiezo a trabajar con ustedes?",
    content: "Solo debes tocar en el botón regístrate.",
  },
  {
    title: "¿Qué beneficios tengo al registrarme?",
    content:
      "Trabajas directamente con la plataforma, obtienes los mejores precios, no tienes que llamar ni escribir a nadie para vender una cuenta o una pantalla.",
  },
  {
    title: "¿Estoy contribuyendo con la piratería?",
    content:
      "No, todas las cuentas son compradas legalmente en las plataformas originales.",
  },
  {
    title: "¿Cómo recibo mis ganancias?",
    content:
      "Debes vender los productos por encima del precio que tienes en plataforma. ¡Es por eso que te damos los mejores precios! ¡También obtienes ganancias por cada venta que realicen tus afiliados",
  },
  {
    title: "¿Con cuánto dinero puedo empezar?",
    content: "Puedes empezar desde $10 dólares.",
  },
];

const Questions = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="faq-container px-4 md:px-10 py-16" data-aos="fade-up">
      <div className="faq-container px-4 md:px-10 py-16 max-w-[1440px] mx-auto">
        <h2
          className="text-3xl font-bold uppercase text-[#444444] flex flex-col gap-4 justify-center items-center text-center mb-8"
          data-aos="fade-up"
        >
          preguntas frecuentes <span className="w-12 h-1 bg-[#F2308B]"></span>
        </h2>
        {data.map((faq, index) => (
          <Accordion
            key={index}
            className="shadow-none border-b border-gray-50 group"
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon className="text-[#444444] group-hover:text-[#F2308B] " />
              }
              aria-controls="panel1-content"
              id="panel1-header"
              className="px-0 text-[#444444] text-lg group-hover:text-[#F2308B] transition-all duration-300"
            >
              {faq.title}
            </AccordionSummary>
            <AccordionDetails className="p-0 w-full">
              {faq.content}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Questions;
