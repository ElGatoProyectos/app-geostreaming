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
    <div className="fixed top-0 left-0 inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center overflow-auto w-screen h-screen">
      <div className="w-[90%] lg:max-w-[500px]  max-h-[90%] lg:w-full relative overflow-y-auto ">
        <div className="w-full py-4 bg-[#F2308B] rounded-t-lg text-center content-center text-white font-bold uppercase ">
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
