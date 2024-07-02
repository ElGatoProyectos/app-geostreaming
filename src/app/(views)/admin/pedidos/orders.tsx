"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/common/table";
import Modal from "@/app/components/common/modal";
import OrderForm from "./orderForm";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignAccountForm from "./assignAccount";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type userEnabled = "y" | "n";

type Users = {
  id?: number;
  email: string;
  ref_id: number;
  role: string;
  full_name: string;
  dni: string;
  phone: string;
  balance_in_cents: number;
  enabled: userEnabled;
};
const Order = () => {
  const session = useSession();

  const [orders, setOrders] = useState<any[]>([]);
  const [platforms, setPlatform] = useState<any[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchData = async () => {
    try {
      const [ordersResponse, platformResponse, userResponse] = await Promise.all([
        axios.get("/api/order"),
        axios.get("/api/platform"),
        axios.get("/api/user"),
      ]);
      /* const filteredOrders = accountsResponse.data.filter((order: any) => {
        return order.user_id === Number(session.data?.user.id);
      }); */
      setOrders(ordersResponse.data);
      setPlatform(platformResponse.data);
      setUsers(userResponse.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* const handleSaveOrder: SubmitHandler<Users> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      if (data.id) {
        await axios.put(`/api/user/${data.id}`, {});
        toast.success("Se actualizo correctamente");
      } else {
        await axios.post("/api/user", {});
        toast.success("Se guardo correctamente");
      }



      closeModal();
    } catch (error) {
      console.error("Error al guardar la cuenta:", error);
      toast.error("Hubo un error al guardar la cuenta");
    } finally {
      setLoading(false);
    }
  }; */
  const columns = [
    { Header: "Id", accessor: "id" },
    {
      Header: "Plataforma",
      accessor: (row: any) => {
        if (!platforms || platforms.length === 0) return "No disponible";
        const platform = platforms.find((p) => p.id === row.platform_id);
        return platform ? platform.name : "No disponible";
      },
    },
    {
      Header: "Usuario",
      accessor: (row: any) => {
        if (!users || users.length === 0) return "No disponible";
        const user = users.find((p) => p.id === row.platform_id);
        return user ? user.dni : "No disponible";
      },
    },
    /* { Header: 'Correo', accessor: 'email' },
    { Header: 'Contraseña', accessor: 'password' },
    { Header: 'pin', accessor: 'pin'}, */
    {
      Header: "Estado",
      accessor: (row: any) => (row.status === 'ATTENDED' ? "Atendido" : "No atendido"),/* corregir */
    },
    /* {
      Header: "Fecha de compra",
      accessor: (row: any) => formatDate(row.purchase_date),
    },
    {
      Header: "Fecha de renovación",
      accessor: (row: any) => formatDate(row.renewal_date),
    }, *//* 
    { Header: "Fecha de compra", accessor: "status" },
    { Header: "Fecha de vencimiento", accessor: "platform_id" }, */
   
  ];

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

/*   const handleEdit = async (record: Users) => {
    try {
      const response = await axios.get(`/api/user/${record.id}`);
      setSelectedRecord(response.data);
      setModalTitle("Editar pedido");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los datos");
    }
  }; */

  /*   const handleAdd = () => {
    setSelectedRecord(null);
    setModalTitle("Agregar pedido");
    setIsModalOpen(true);
  };
 */
  const handleDelete = (record: Users) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

/*   const handleDeleteConfirm = async () => {
    try {
       await axios.delete(`/api/account/${selectedRecord?.id}`);
      toast.success("Registro eliminado correctamente");
      fetchUsers();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      toast.error("Hubo un error al eliminar el registro");
    }
    setIsDeleteModalOpen(false);
  }; */
  const handleSendModal = (record: any) => {
    setSelectedRecord(record);
    console.log(record);
    setIsSendModalOpen(true);
  }

  const handleAssignAccount: SubmitHandler<any> = async(data) => {
    console.log({
      order_id: selectedRecord.id,
      account_id: Number(data.account),
      user_id: selectedRecord.user_id,
      platform_id: selectedRecord.platform_id,
      status: 'ATTENDED'
    });

    try {
     const response = await axios.post('/api/order/assign', {
        order_id: selectedRecord.id,
        account_id: data.account,
        user_id: selectedRecord.user_id,
        platform_id: selectedRecord.platform_id,
        status: 'ATTENDED'
      });
      console.log(response);
      toast.success("Cuenta asignada correctamente");
    } catch (error) {
      console.log("Error al eliminar el registro", error);
      toast.error("Error al asignar cuenta");
    }
  }
  


/*   const customCode = (
    <>
      <button onClick={handleSendModal} className="rounded content-center text-white px-1 py-1 bg-[#5A62F3] w-8 h-8 hover:bg-[#868BF1]">
        <LuSend className="text-white mx-auto"/>
      </button>
    </>
  ); */

  return (
    <>
      <Table
        columns={columns}
        data={orders}
        showActions={true}
        download={true}
        title="Pedidos"
        /* onEdit={handleEdit} */
       /*  onDelete={handleDelete} */
        onApprove={handleSendModal}
      />
      {/* modal form add and edit */}
     {/*  <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <OrderForm
          defaultValues={
            selectedRecord || {
              email: "",
              ref_id: 0,
              role: "",
              full_name: "",
              dni: "",
              phone: "",
              balance_in_cents: 0,
              enabled: "y",
            }
          }
          onSubmit={handleSaveOrder}
        />
      </Modal> */}
      {/* modal delete */}
     {/*  <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <div>
          <p>¿Está seguro(a) de que quiere eliminar este pedido?</p>
          <button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white mt-4 px-4 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      </Modal> */}
      {/* modal send */}
      <Modal isOpen={isSendModalOpen} title="Asignar Cuenta" onClose={() => setIsSendModalOpen(false)}>
        <AssignAccountForm platformId={selectedRecord?.platform_id} onSubmit={handleAssignAccount}/>
      </Modal>
    </>
  );
};

export default Order;
