"use client";
import { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IoMdClose } from "react-icons/io";
import ActionButton from "@/app/components/common/ActionButton";
import DepositForm from "./depositForm";
import { SubmitHandler } from "react-hook-form";



const Deposits = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
/*   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); */
  const [loading, setLoading] = useState(false);

  /* fetch */
  const fetchDeposits = async () => {
    try {
      const response = await axios.get("/api/voucher");
      setVouchers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  useEffect(() => {
    fetchDeposits();
    fetchUsers();
  }, []);

  const formatDate = (dateString?: string): string => {
    if (!dateString) {
      return "Sin fecha";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return format(date, "PPPp", { locale: es });
  };

  const handleModal = (record: any) => {
    setSelectedRecord(record);
    setIsOpenModal(true);
  };

  const handleImageClick = (voucherId: number) => {
    setSelectedImage(`/vouchers/vouchers_${voucherId}.png`);
  };

/*   const handleDelete = (record: any) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  }; */

/*   const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/voucher/`);
      toast.success("Cuenta eliminada correctamente");
      fetchDeposits();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      toast.error("Hubo un error al eliminar la cuenta");
    }
  }; */

  const handleApprove: SubmitHandler<any> = async (data) => {
    console.log(selectedRecord?.user_id)
    console.log(data);
    try {
      await axios.patch(`/api/balance/${selectedRecord.user_id}`,{
        balance_in_cents: data.value,
      });
      toast.success("Depósito aprobado correctamente");
    } catch (error) {
      toast.error("Error al confirmar el depósito");
      console.log("Error al confirmar deposito", error);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Usuario",
      accessor: (row: any) => {
        if (!users || users.length === 0) return "No asignado";
        const user = users.find((u) => u.id === row.user_id);
        return user ? user.dni : "No asignado";
      },
    },
    { Header: "Número de comprobante", accessor: "number" },
    { Header: "Fecha y hora", accessor: (row: any) => formatDate(row.date) },
    { Header: "Monto (centavos)", accessor: "value" },
    {
      Header: "Comprobante",
      accessor: (row: any) => (
        <img
          className="w-[100px] h-[100px]  object-cover cursor-pointer hover:shadow-lg rounded-md"
          src={`/vouchers/vouchers_${row.id}.png`}
          alt={`comprobante N: ${row.id}`}
          onClick={() => handleImageClick(row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={vouchers}
        showActions={true}
        title="Depósitos"
        /* onDelete={handleDelete} */
        onApprove={handleModal}
      />

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title={"Aprobar Depósito"}
      >
        <DepositForm
        onSubmit={handleApprove}
        />
        {/* <label htmlFor="value">Monto(centavos)</label>
        <input type="number" id="value" required placeholder="Ingresar monto en centavos " title="Ingresar el monto en centavos" className="w-full"/>

        <div className="mx-auto mt-4 w-fit">
          <ActionButton onClick={handleApprove}>
            Confirmar Aprobación
          </ActionButton>
        </div> */}
      </Modal>
      {/* delete modal */}
      {/* <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar esta cuenta?</p>
          <button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white mt-4 px-4 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      </Modal> */}

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <img
            src={selectedImage}
            alt="Ampliación de comprobante"
            className="max-w-[90%] max-h-[90vh] object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <IoMdClose className="text-3xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default Deposits;
