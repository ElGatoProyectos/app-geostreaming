"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const sections = [
  { id: "banner", name: "Inicio" },
  { id: "about", name: "Nosotros" },
  { id: "services", name: "Servicios" },
  { id: "products", name: "Productos" },
  { id: "contact", name: "Contáctanos" },
];

const navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );
      let currentSectionId = sections[0].id;

      for (let sectionElement of sectionElements) {
        if (
          sectionElement &&
          sectionElement.getBoundingClientRect().top <= 50
        ) {
          currentSectionId = sectionElement.id;
        }
      }
      setActiveSection(currentSectionId);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="fixed z-10 top-0 left-0 h-[60px] lg:h-[70px] shadow w-full bg-white  ">
      <div className="h-full w-full px-4 md:px-10  gap- py-2  flex justify-between items-center max-w-[1440px] mx-auto">
        <Link href={"/"} className="h-full">
          <img
            className="h-full w-auto object-contain"
            src="/logo.png"
            alt="Geostreaming"
          />
        </Link>
        <div className="flex gap-4 md:gap-4 lg:gap-8">
          <div className="hidden lg:flex items-center">
            <ul className=" flex gap-8 text-[#111111]">
              {sections.map((section) => (
                <li
                key={section.id}
                  className={`transition-all duration-300 ${
                    activeSection === section.id
                      ? "text-[#F2308B]"
                      : "hover:text-[#F2308B]"
                  }`}
                >
                  <Link href={`#${section.id}`}>{section.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
          <Link
            href={"/registrarse"}
            className="bg-[#F2308B] rounded text-white text-sm md:text-base px-3 md:px-4 py-1 md:py-2 w-full"
          >
            Regístrate
          </Link>
          <Link
            href={"ingresar"}
            className="bg-[#F2308B] rounded text-white text-sm md:text-base px-3 md:px-4 py-1 md:py-2 w-full"
          >
            Ingresa
          </Link>
          </div>
          

          <button onClick={toggleMenu} className=" lg:hidden">
            <IoMenu className="text-2xl text-[#444444]" />
          </button>
        </div>
      </div>

      {/* submenues */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full  h-screen z-50 bg-black bg-opacity-90  pt-14 px-4 pb-4 overflow-hidden ">
          <button onClick={toggleMenu} className="absolute top-5 right-5 ">
            <IoMdClose className="text-white text-xl" />
          </button>
          <div className="w-full h-full flex flex-col gap-4 bg-white p-6">
            <ul className=" flex flex-col gap-4 font-primarySemibold">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`transition-all duration-300 ${
                    activeSection === section.id
                      ? "text-[#F2308B]"
                      : "hover:text-[#F2308B]"
                  }`}
                >
                  <Link href={`#${section.id}`} onClick={toggleMenu}>
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default navigation;
