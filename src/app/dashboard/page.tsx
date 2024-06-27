"use client";

import { Button } from "@mui/material";
import { useState } from "react";

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
      quantity: 1,
      user_id: 1,
      product_id: 1,
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
      </div>
    </div>
  );
}
