"use client";
import { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import { SubmitHandler } from "react-hook-form";
import AfiliadosForm from "./afiliadosForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Inputs = {
  email?: string;
  full_name?: string;
  phone?: string;
  password?: string;
  country_code?: string;
  dni?: string;
};

const register = () => {
  const [afiliados, setAfiliados] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Inputs | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const session = useSession();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAfiliados: SubmitHandler<Inputs> = async (data) => {
    try {
      if (selectedRecord) {
        // Lógica para editar
        toast.success("Se actualizo correctamente");
        console.log("Editar afiliado:", data);
      } else {
        await axios.post("/api/user", {
          full_name: data.full_name,
          email: data.email,
          dni: data.dni,
          country_code: data.country_code,
          phone: data.phone,
          password: data.password,
          ref_id: session.data?.user.id,
        });
        console.log("Agregar afiliado:", data);
        toast.success("Se registro correctamente");
      }
    } catch (e) {
      console.log("error:", e);
      toast.error("Error al enviar el registro");
    }

    closeModal();
  };

  const fetchData = async () => {
    const response = await axios.get("/api/user");
    const filteredUsers = response.data.filter((user: any) => {
      return user.ref_id === session.data?.user.id;
    });
    console.log(filteredUsers);
    setAfiliados(filteredUsers);
  };

  useEffect(() => {
    fetchData();
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

  const columns = [
    { Header: "Código", accessor: "id" },
    { Header: "N Documento de identidad", accessor: "dni" },
    { Header: "Nombre", accessor: "full_name" },
    { Header: "Correo", accessor: "email" },
    { Header: "Celular", accessor: "phone" },
    { Header: "Fecha de ingreso", accessor: (row : any) => formatDate(row.created_at)},
  ];

  const handleEdit = (record: Inputs) => {
    setSelectedRecord(record);
    setModalTitle("Editar afiliado");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar afiliado");
    setIsModalOpen(true);
  };

  return (
    <>
      <Table
        columns={columns}
        data={afiliados}
        showActions={true}
        addRecord={true}
        title="Afiliados"
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <AfiliadosForm
          defaultValues={selectedRecord || {}}
          onSubmit={handleSaveAfiliados}
        />
      </Modal>
    </>
  );
};

export default register;
