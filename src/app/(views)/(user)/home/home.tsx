"use client";
import { useSession } from "next-auth/react";
import Delivery from "./delivery";
import Request from "./request";
import { useState } from "react";
import Modal from "@/app/components/common/modal";
import axios from "axios";

const Home = () => {
  const [openModal, setOpenModal] = useState(true);
  const session = useSession();

  const closeModal = () => {
    setOpenModal(false);
  };
  const [description, setDescription] = useState("");

  const fetch = async () => {
    const response = await axios.get("/api/alerts");
    console.log(response.data);
    setDescription(response.data.description);
  };
  useState(() => {
    fetch();
  });

  return (
    <div className="flex flex-col gap-8">
      <Request />
      <Delivery />
      {session.data?.user.role !== "ADMIN" && (
        <Modal title="Avisos" isOpen={openModal} onClose={closeModal}>
          <div className="text-center border-[#F2308B] border p-4 rounded-lg text-[#444]  flex flex-col justify-center items-center gap-8">
            <h2 className=" text-xl font-semibold ">
              Estimados Distribuidores
            </h2>
            <p>{description}</p>
            <p className=" font-semibold ">Gracias por su colaboración</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
