"use client";
import { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import AccountForm from "./accountForm";
import { SubmitHandler } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


type Inputs = {
  id?: number;
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  product_id: number;
  user_id: number;
  description: string;
  platform_id: number;
};

const Account = () => {
  const [accounts, setAccounts] = useState<Inputs[]>([]);
  const [products, setProducts] = useState<any[]>([]);
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
      const [productResponse, userResponse] = await Promise.all([
        axios.get("/api/account"),
        axios.get("/api/product"),
        axios.get("/api/user"),
      ]);
      setProducts(productResponse.data.products);
      setUsers(userResponse.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchData();
  }, []);

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Plataforma",
      accessor: (row: Inputs) => {
        if (!products || products.length === 0) return "No disponible";
        const product = products.find((p) => p.id === row.product_id);
        return product ? product.platform.name : "No disponible";
      },
    },
    { Header: "Correo", accessor: "email" },
    { Header: "Contraseña", accessor: "password" },
    { Header: "Pin", accessor: "pin" },
    {
      Header: "Estado",
      accessor: (row: Inputs) => (row.is_active ? "activo" : "inactivo"),
    },
    { Header: "Fecha de compra", accessor: "numb_days_duration" },
    { Header: "Fecha de renovación", accessor: "numb_days_duration" },
    
    {
      Header: "Usuario",
      accessor: (row: Inputs) => {
        if (!users || users.length === 0) return "No asignado";
        const user = users.find((u) => u.id === row.user_id);
        return user ? user.email : "No asignado";
      },
    },
  ];

  const handleEdit = async (record: Inputs) => {
    try {
      const response = await axios.get(`/api/account/${record.id}`);
      setSelectedRecord(response.data);
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
  const handleUpload = async () => {
    //
  };

  const handleSaveAccount: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (data.id) {
        await axios.put(`/api/account/${data.id}`, {
          is_active: data.is_active ? true : false,
          email: data.email,
          password: data.password,
          description: data.description,
          pin: data.pin,
          numb_profiles: data.numb_profiles,
          numb_days_duration: data.numb_days_duration,
          platform_id: data.platform_id,
          product_id: data.product_id,
          user_id: data.user_id,
        });
        toast.success("Se actualizo correctamente");
      } else {
        await axios.post("/api/account", {
          is_active: data.is_active,
          email: data.email,
          password: data.password,
          description: data.description,
          pin: data.pin,
          numb_profiles: data.numb_profiles,
          numb_days_duration: data.numb_days_duration,
          platform_id: data.platform_id,
          product_id: data.product_id,
          user_id: data.user_id,
        });
        toast.success("Se guardo correctamente");
      }

      useEffect(() => {
        fetchAccounts();
      }, []);

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
          defaultValues={
            selectedRecord || {
              is_active: true,
              email: "",
              password: "",
              pin: "",
              numb_profiles: 0,
              numb_days_duration: 0,
              product_id: 1,
              platform_id: 1,
              user_id: 1,
              description: "",
            }
          }
          onSubmit={handleSaveAccount}
        />
      </Modal>
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
