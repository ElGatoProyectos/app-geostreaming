"use client";

import { convertNumber } from "@/utils/convertToFloat";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import * as xlsx from "xlsx";

export default function Page() {
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/bank");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBanks(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const [file, setFile] = useState<File | null>(null);

  const orderProduct = async () => {
    const data = {
      user_id: 1,
      platform_id: 1,
      status: "ATTENDED",
    };
    const jsonData = JSON.stringify(data);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: jsonData,
      });

      const text = await res.text();
      if (!text) {
        console.error("Respuesta vacía");
        return;
      }

      const data = JSON.parse(text);
      console.log("data", data);
    } catch (error) {
      console.error("Error al ordenar", error);
    }
  };

  const putBalance = async () => {
    const userid = 1;
    const data = {
      balance_in_cents: 1000,
    };
    const jsonData = JSON.stringify(data);
    try {
      const res = await fetch(`/api/balance/${userid}`, {
        method: "PATCH",
        body: jsonData,
      });

      if (!res.ok) {
        console.error("Error en la respuesta:", res.statusText);
        return;
      }

      const text = await res.text();
      if (!text) {
        console.error("Respuesta vacía");
        return;
      }

      const data = JSON.parse(text);
      console.log("data", data);
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
    }
  };

  const handleAdmin = async () => {
    const userid = 1;
    const data = {
      balance_in_cents: 1000,
    };
    const jsonData = JSON.stringify(data);
    try {
      const res = await fetch(`/api/admin/${userid}`, {
        method: "DELETE",
        // body: jsonData,
      });

      if (!res.ok) {
        console.error("Error en la respuesta:", res.statusText);
        return;
      }

      const text = await res.text();
      if (!text) {
        console.error("Respuesta vacía");
        return;
      }

      const data = JSON.parse(text);
      console.log("data", data);
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
    }
  };

  const [qrimagen, setQrimagen] = useState("");

  const getQR = async () => {
    // try {
    //   const res = await fetch("/api/qr", {
    //     method: "GET",
    //   });

    //   const text = await res.text();
    //   if (!text) {
    //     console.error("Respuesta vacía");
    //     return;
    //   }

    //   const data = JSON.parse(text);
    //   console.log("data", data);
    //   setQrimagen(data.qr);
    // } catch (error) {
    //   console.error("Error al ordenar", error);
    // }

    const fetchQR = async () => {
      try {
        const response = await axios.get("http://localhost:4000/qrcode", {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setQrimagen(imageUrl);
        setError(null);
      } catch (err) {
      } finally {
      }
    };

    fetchQR();
  };

  const exportExcel = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const text = await res.text();
      if (!text) {
        console.error("Respuesta vacía");
        return;
      }

      const data = JSON.parse(text);
      console.log("data", data);

      const formatUsers = data.map((item: any) => ({
        role: item.role,
        email: item.email,
        full_name: item.full_name,
        dni: item.dni,
        country_code: item.country_code,
        phone: item.phone,
        balance_in_cents: convertNumber(item.balance_in_cents),
      }));
      const heading = [
        [
          "Rol",
          "Email",
          "Nombre completo",
          "N° de Documento",
          "Codigo de pais",
          "Celular",
          "Balance",
        ],
      ];

      // const worksheet = xlsx.utils.json_to_sheet(data);
      // console.log("worksheet", worksheet);
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(formatUsers);
      xlsx.utils.sheet_add_aoa(worksheet, heading);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

      return xlsx.writeFile(workbook, "reporte-users.xlsx");
    } catch (error) {
      console.error("Error al ordenar", error);
    }
  };

  const handlesubmitt = async (e: any) => {
    e.preventDefault();
    const selectedDate = e.target.date.value;
    const fechaDeExpiracionObjeto = new Date(selectedDate);

    console.log("Fecha seleccionada:", selectedDate);
    console.log("fechaDeExpiracionObjeto", fechaDeExpiracionObjeto);
  };

  const [excelFile, setExcelFile] = useState<File | null>(null);

  return (
    <div>
      <span>this is the dashboard user</span>
      <div>
        <h1>Banks</h1>
        <Button onClick={fetchData}>get banks</Button>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {banks.map((bank: any) => (
              <li key={bank.id}>{bank.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h1>Upload excel</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!excelFile) return;

              console.log("datafile", excelFile);
              const datafile = new FormData();
              datafile.set("file", excelFile);
              console.log("datafile", datafile);

              try {
                const res = await fetch("/api/accounts", {
                  method: "POST",
                  body: datafile,
                });

                if (!res.ok) {
                  console.error("Error en la respuesta:", res.statusText);
                  return;
                }

                const text = await res.text();
                if (!text) {
                  console.error("Respuesta vacía");
                  return;
                }

                const data = JSON.parse(text);
                console.log("data", data);
              } catch (error) {
                console.error("Error al enviar el archivo:", error);
              }
            }}
          >
            <label>upload excel</label>
            <input
              type="file"
              accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => {
                if (e.currentTarget.files) {
                  console.log(e.currentTarget.files[0]);
                  setExcelFile(e.currentTarget.files[0]);
                }
              }}
            />
            <button className="bg-gray-400 p-5 rounded-xl">subir excel</button>
          </form>
        </div>
        <h1>Upload</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!file) return;

            const datafile = new FormData();
            datafile.set("file", file);
            datafile.set("route", "vouchers");

            try {
              const res = await fetch("/api/img/upload", {
                method: "POST",
                body: datafile,
              });

              if (!res.ok) {
                console.error("Error en la respuesta:", res.statusText);
                return;
              }

              const text = await res.text();
              if (!text) {
                console.error("Respuesta vacía");
                return;
              }

              const data = JSON.parse(text);
              console.log("data", data);
            } catch (error) {
              console.error("Error al enviar el archivo:", error);
            }
          }}
        >
          <label>upload file</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.currentTarget.files) {
                console.log(e.currentTarget.files[0]);
                setFile(e.currentTarget.files[0]);
              }
            }}
          />
          <button className="bg-gray-400 p-5 rounded-xl">upload</button>
        </form>
        <span>Delete</span>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!file) return;

            const datafile = new FormData();
            // datafile.set("file", file);
            datafile.set("name", "software.png");
            datafile.set("route", "platforms");

            try {
              const res = await fetch("/api/img/delete", {
                method: "DELETE",
                body: datafile,
              });

              if (!res.ok) {
                console.error("Error en la respuesta:", res.statusText);
                return;
              }

              const text = await res.text();
              if (!text) {
                console.error("Respuesta vacía");
                return;
              }

              const data = JSON.parse(text);
              console.log("data", data);
            } catch (error) {
              console.error("Error al enviar el archivo:", error);
            }
          }}
        >
          <label>Delete file</label>

          <button className="bg-gray-400 p-5 rounded-xl">delete</button>
        </form>

        <div>
          <button onClick={orderProduct} className="bg-gray-400 rounded-xl p-5">
            buy account
          </button>
        </div>

        <div>
          <button onClick={putBalance} className="bg-gray-400 rounded-xl p-5">
            get balance to user_id 1
          </button>
        </div>
        <div>
          <button onClick={handleAdmin} className="bg-gray-400 rounded-xl p-5">
            Borrar admi
          </button>
        </div>

        <div>
          <button onClick={getQR} className="bg-gray-400 rounded-xl p-5">
            obtener qr
          </button>
        </div>

        <img src={qrimagen} alt="imagenrq" className="h-52 w-52" />

        <form onSubmit={handlesubmitt}>
          <label htmlFor="date">Selecciona una fecha: </label>
          <input type="datetime-local" id="date" name="date" />

          <button type="submit">Enviar</button>
        </form>
      </div>
      <div>
        <div>
          <button
            onClick={exportExcel}
            type="button"
            className="bg-gray-400 rounded-xl p-5"
          >
            exportar en excel orders
          </button>
        </div>
        <h1>Upload json + file</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!file) return;

            const datafile = new FormData();
            datafile.set("file", file);
            datafile.set("email", "usertest@gmail.com");
            datafile.set("ref_id", "1");
            datafile.set("role", "USER");
            datafile.set("full_name", " full name");
            datafile.set("dni", "513513585");
            datafile.set("phone", "777888999");
            datafile.set("password", "123456");
            datafile.set("country_code", "+51");

            try {
              const res = await fetch("/api/user/1", {
                method: "PATCH",
                body: datafile,
              });

              if (!res.ok) {
                console.error("Error en la respuesta:", res.statusText);
                return;
              }

              const text = await res.text();
              if (!text) {
                console.error("Respuesta vacía");
                return;
              }

              const data = JSON.parse(text);
              console.log("data", data);
            } catch (error) {
              console.error("Error al enviar el archivo:", error);
            }
          }}
        >
          <label>upload file</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.currentTarget.files) {
                console.log(e.currentTarget.files[0]);
                setFile(e.currentTarget.files[0]);
              }
            }}
          />
          <button className="bg-gray-400 p-5 rounded-xl">upload</button>
        </form>
      </div>
    </div>
  );
}
