import { ModalOwnProps } from "@mui/material";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 inset-1 z-50 bg-black bg-opacity-30 flex justify-center items-center overflow-auto w-full h-full">
      <div className="max-w-[500px] max-h-[90%] w-full relative">
        <div className="w-full py-4 bg-[#277FF2] rounded-t-lg text-center content-center text-white font-bold uppercase ">
          <h2>{title}</h2>
          <button className=" absolute right-4 top-4" onClick={onClose}>
            <RiCloseFill className="text-xl" />
          </button>
        </div>
        <div className="bg-white overflow-y-auto px-8 py-8 rounded-b-lg">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
