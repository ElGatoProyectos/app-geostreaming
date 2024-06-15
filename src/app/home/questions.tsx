import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const data = [
  {
    title: "¿Cómo vender una cuenta streaming?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ducimus ipsa obcaecati velit officia fugit sunt quas, iusto deleniti hic placeat cum facilis, dolore delectus cupiditate tenetur reprehenderit est deserunt.",
  },
  {
    title: "¿Cómo acredito saldo a mi cuenta?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ducimus ipsa obcaecati velit officia fugit sunt quas, iusto deleniti hic placeat cum facilis, dolore delectus cupiditate tenetur reprehenderit est deserunt.",
  },
  {
    title: "¿Qué garantía tengo si la cuenta falla?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ducimus ipsa obcaecati velit officia fugit sunt quas, iusto deleniti hic placeat cum facilis, dolore delectus cupiditate tenetur reprehenderit est deserunt.",
  },
  {
    title: "¿En qué tiempo me llega las credenciales?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ducimus ipsa obcaecati velit officia fugit sunt quas, iusto deleniti hic placeat cum facilis, dolore delectus cupiditate tenetur reprehenderit est deserunt.",
  },
  {
    title: "¿Cuántos y cuáles productos puedo vender?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ducimus ipsa obcaecati velit officia fugit sunt quas, iusto deleniti hic placeat cum facilis, dolore delectus cupiditate tenetur reprehenderit est deserunt.",
  },
];

const Questions = () => {
  return (
    <div className="faq-container px-4 md:px-10 py-16">
      <div className="faq-container px-4 md:px-10 py-16 max-w-[1440px] mx-auto">
      <h2 className="text-3xl font-bold uppercase text-[#444444] flex flex-col gap-4 justify-center items-center text-center mb-8">
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
