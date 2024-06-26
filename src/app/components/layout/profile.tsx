import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdLockReset } from "react-icons/md";

interface ProfileProps {
  username: string;
  userEmail: string;
  avatar: string;
}
const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <div className=" user-select-none absolute top-[65px]  bg-white shadow-cardFloat w-fit right-0 flex flex-col gap-4 pt-8 items-center rounded-md">
      <img
        src={props.avatar}
        alt="user"
        className="h-20 w-20 object-cover rounded-full shadow "
      />
      <div>
        <p className="text-center text-sm text-[#444] mb-1">{props.username}</p>
        <p className="text-center text-xs text-[#888]">{props.userEmail}</p>
      </div>
      <ul>
        <li>
          <Link
            href={"user/perfil"}
            className="w-full flex gap-4 border-b border-gray-200 px-6 py-2 text-[#888] whitespace-nowrap hover:bg-[#f3f3f9]"
          >
            <FaRegUser className="text-xl text-[#F2308B]" /> Mi Perfil
          </Link>
        </li>
        <li>
          <Link
            href={"user/contrasenia"}
            className="w-full flex gap-4 border-b border-gray-200 px-6 py-2 text-[#888] whitespace-nowrap hover:bg-[#f3f3f9]"
          >
            <MdLockReset className="text-xl text-[#F2308B]" /> Cambiar
            contraseña
          </Link>
        </li>
        <li>
          <Link
            href={"ingresar"}
            className="w-full flex gap-4 px-6 py-2 text-[#888] whitespace-nowrap hover:bg-[#f3f3f9]"
          >
            <IoMdLogOut className="text-xl text-[#F2308B]" /> Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
