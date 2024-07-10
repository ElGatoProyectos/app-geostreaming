import axios from "axios";
import React, { useEffect, useState } from "react";

interface SelectFieldProps {
  id: string;
  defaultValue?: string;
  isDisabled?: boolean;
  register?: any;
  error?: any;
}

interface Country {
  name: string;
  code: string;
}

const CountrySelect: React.FC<SelectFieldProps> = ({
  id,
  register,
  error,
  defaultValue = "",
  isDisabled = false,
}) => {
  const [codes, setCodes] = useState<Country[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/Desarrollo2Gato/countries/main/data.json"
      );
      let countryData: Country[] = response.data.map((country: any) => ({
        name: country.country,
        code: country.calling_code,
      }));
      countryData = countryData.sort((a, b) => a.name.localeCompare(b.name));
      setCodes(countryData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="w-full text-[#444]">
      <label htmlFor={id} className="capitalize">
        Código del país
        <div className="mt-2">
          <select
            id={id}
            name={id}
            defaultValue={defaultValue}
            className={` bg-gray-100 w-full text-[#666] bg-gray-10 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
              error
                ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                : "border-gray-200 "
            }`}
            {...register}
          >
            <option value="" disabled hidden>
              Seleccione...
            </option>
            {codes.map((country) => (
              <option
                key={country.code}
                value={country.code}
                selected={country.code === defaultValue}
              >
                ({country.code}) {country.name}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  );
};

export default CountrySelect;
