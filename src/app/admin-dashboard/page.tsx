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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <span>this is the dashboard admi</span>
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
    </div>
  );
}
