"use client";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { IoLogoUsd } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
    
  }, [pathname]);

  const sections = [
    {
      title: null,
      links: [
        {
          href: "/admin/inicio",
          label: "Inicio",
          icon: <IoMdHome className="text-xl" />,
        },
      ],
    },
    {
      title: "Ventas",
      links: [
        {
          href: "/admin/productos",
          label: "Productos",
          icon: <IoMdCart className="text-xl" />,
        },
        {
          href: "/admin/reportesdeventas",
          label: "Reporte ventas",
          icon: <MdMenuBook className="text-xl" />,
        },
      ],
    },
    {
      title: "Saldo",
      links: [
        {
          href: "/admin/creditaciones",
          label: "Acreditar saldo",
          icon: <IoLogoUsd className="text-xl" />,
        },
        {
          href: "/admin/historialcreditaciones",
          label: "Reporte deposito",
          icon: <MdMenuBook className="text-xl" />,
        },
      ],
    },
    {
      title: "Herramientas",
      links: [
        {
          href: "#",
          label: "Mi Perfil",
          icon: <FaRegUser className="text-xl" />,
        },
        {
          href: "#",
          label: "Cambiar contraseña",
          icon: <MdLockReset className="text-xl" />,
        },
        {
          href: "#",
          label: "Cerrar sesión",
          icon: <IoMdLogOut className="text-xl" />,
        },
      ],
    },
  ];
  return (
    <div
      className={`bg-[#F2308B] w-[220px] py-4 max-h-[calc(100vh-100px)] h-full fixed top-[100px] z-50 text-white transition-transform duration-300 overflow-y-auto ${
        isOpen ? "translate-x-0 shadow-sidebar " : "-translate-x-full lg:translate-x-0 shadow-none "
      }`}
    >
      <div className="flex flex-col gap-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="w-full">
            {section.title && (
              <div className="uppercase text-xs mx-8  font-semibold border-b border-[#F06FAC] pb-1">
                {section.title}
              </div>
            )}
            <ul className="mt-2">
              {section.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className={`pl-8 py-3 mr-2 rounded-r-full mb-2 ${
                    currentPath === link.href
                      ? "bg-white text-[#277FF2] font-semibold"
                      : "hover:bg-white hover:text-[#277FF2] transition-all duration-300 group"
                  }`}
                >
                  <Link href={link.href} className="flex gap-4 items-center">
                    {link.icon}
                    <span className="text-sm capitalize">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
