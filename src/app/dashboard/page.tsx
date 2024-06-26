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

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
        {file && <img src={URL.createObjectURL(file)} />}
        <img src="/platforms/avatar-full-acheron (1).webp" alt="img" />
      </div>
    </div>
  );
}
