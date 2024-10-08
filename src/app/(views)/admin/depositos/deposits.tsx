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
import { url_front_to_wsp } from "@/context/token";
import { Link } from "phosphor-react";

const Deposits = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  /* fetch */
  const fetchDeposits = async () => {
    try {
      const response = await axios.get("/api/voucher");
      const descendingVouchers = response.data.sort(
        (a: any, b: any) => b.id - a.id
      );
      setVouchers(descendingVouchers);
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
    const value = record.status==="UNREAD"
    setIsOpenModal(value);
  };
  // const [showVoucher, setShowVoucher] = useState("");
  const handleImageClick =(voucher_url: string) => {
   /*  let response;
    try {
      response = await axios.get(
        `${url_front_to_wsp}/file/voucher/${voucherId}`,
        {
          responseType: "blob",
        }
      );
    } catch (e) {
      console.log(e);
    }
    if (!response) return;

    const imageUrl = URL.createObjectURL(response.data); */
    // setShowVoucher(imageUrl);
    setSelectedImage(voucher_url);
  };

  const handleApprove: SubmitHandler<any> = async (data) => {
    try {
      await axios.patch(`/api/balance/${selectedRecord.user_id}`, {
        balance_in_cents: data.value,
        voucher_id: Number(selectedRecord.id),
      });
      toast.success("Depósito aprobado correctamente");
      setIsOpenModal(false);
    } catch (error) {
      toast.error("Error al confirmar el depósito");
      console.log("Error al confirmar deposito", error);
    }
    fetchDeposits();
    
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
    /* {
      Header: "Comprobante",
      accessor: (row: any) => (
        <button
          className="p-2 rounded-lg bg-[#F2308B] text-white"
          onClick={() => handleImageClick(row.voucher_url)}
        >
          Ver Imagen
        </button>
      ),
    }, */
    {
      Header: "Estado",
      accessor: (row: any) =>
        row.status === "READ" ? (
          <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-green-400">
            Aprobado
          </span>
        ) : (
          <span className=" whitespace-nowrap px-3 py-0.5 rounded-full bg-gray-100 font-medium text-gray-600">
            Sin Revisar
          </span>
        ),
    },
    /* {
      Header: "Voucher (url)",
      accessor: (row: any) => <Link href={row.voucher_url}>{row.voucher_url}</Link>,
    }, */
  ];

  return (
    <>
      <Table
        columns={columns}
        data={vouchers}
        showActions={true}
        title="Depósitos"
        onApprove={handleModal}
      />

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title={"Aprobar Depósito"}
      >
        <DepositForm onSubmit={handleApprove} />
      </Modal>

      
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <img
            src={selectedImage}
            alt="Ampliación de comprobante"
            className="max-w-[90%] w-full h-full max-h-[90vh] object-contain"
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
