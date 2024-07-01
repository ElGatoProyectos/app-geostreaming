"use client";
import { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import AccountForm from "./accountForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";


type Inputs = {
  id?: number;
  is_active?: string;
  email?: string;
  password?: string;
  pin?: string;
  purchase_date?: string;
  renewal_date?: string;
  user_id?: number;
  description?: string;
  platform_id?: number;
  status?: string;
};

const Account = () => {
  const [accounts, setAccounts] = useState<Inputs[]>([]);
  const [platforms, setPlatform] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Inputs | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/account");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const fetchData = async () => {
    try {
      const [platformResponse, userResponse] = await Promise.all([
        axios.get("/api/platform"),
        axios.get("/api/user"),
      ]);
      setPlatform(platformResponse.data);
      setUsers(userResponse.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
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
    { Header: "ID", accessor: "id" },
    {
      Header: "Plataforma",
      accessor: (row: Inputs) => {
        if (!platforms || platforms.length === 0) return "No disponible";
        const platform = platforms.find((p) => p.id === row.platform_id);
        return platform ? platform.name : "No disponible";
      },
    },
    { Header: "Correo", accessor: "email" },
    { Header: "Contraseña", accessor: "password" },
    { Header: "Pin", accessor: "pin" },
    {
      Header: "Activo",
      accessor: (row: Inputs) => (row.is_active ? "si" : "no"),
    },
    {
      Header: "Estado",
      accessor: (row: Inputs) =>
        row.status === "BOUGHT" ? "comprado" : "no comprado",
    },
    {
      Header: "Fecha de compra",
      accessor: (row: Inputs) => formatDate(row.purchase_date),
    },
    {
      Header: "Fecha de renovación",
      accessor: (row: Inputs) => formatDate(row.renewal_date),
    },

    {
      Header: "Usuario",
      accessor: (row: Inputs) => {
        if (!users || users.length === 0) return "No asignado";
        const user = users.find((u) => u.id === row.user_id);
        return user ? user.full_name : "No asignado";
      },
    },
  ];

  const handleEdit = async (record: Inputs) => {
    try {
      const response = await axios.get(`/api/account/${record.id}`);
      const data = response.data;
      data.is_active = data.is_active ? "1" : "0";

      console.log(data);
      if (data.purchase_date) {
        const date = new Date(data.purchase_date);
        data.purchase_date = date.toISOString().slice(0, 16);
      }
      setSelectedRecord(data);
      setModalTitle("Editar cuenta");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar cuenta");
    setIsModalOpen(true);
  };

  const handleDelete = (record: Inputs) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/account/${selectedRecord?.id}`);
      toast.success("Cuenta eliminada correctamente");
      fetchAccounts();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      toast.error("Hubo un error al eliminar la cuenta");
    }
  };

/*   const formatDateInsert = (date: string | undefined): string | undefined => {
    if (!date) return undefined;
  
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error('Fecha de compra inválida:', date);
      return undefined;
    }
  
    return format(dateObj, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  }; */
  

  const handleSaveAccount: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
   
    try {
      /* const formattedPurchaseDate = formatDateInsert(data.purchase_date); */

      if (data.id) {
        await axios.patch(`/api/account/${data.id}`, {
          is_active: data.is_active === "1" ? true : false,
          email: data.email,
          password: data.password,
          pin: data.pin,
          description: data.description,
          platform_id: data.platform_id,
          status: data.status,
        });
        toast.success("Se actualizo correctamente");
      } else {
        await axios.post("/api/account", JSON.stringify( {
          is_active: data.is_active === "1" ? true : false,
          email: data.email,
          password: data.password,
          pin: data.pin,
          description: data.description,
          platform_id: data.platform_id,
          status: 'NOT_BOUGHT',
        }));
        toast.success("Se guardo correctamente");
      }
        fetchAccounts();
      closeModal();
    } catch (error) {
      console.error("Error al guardar la cuenta:", error);
      toast.error("Hubo un error al guardar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        data={accounts}
        showActions={true}
        addRecord={true}
        title="Cuentas"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <AccountForm
          defaultValues={selectedRecord || {}}
          onSubmit={handleSaveAccount}
        />
      </Modal>
      {/* delete modal */}
      <Modal
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
      </Modal>
    </>
  );
};

export default Account;
