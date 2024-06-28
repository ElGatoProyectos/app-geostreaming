import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
    flag: string;
  }

  
const CountrySelect:React.FC<SelectFieldProps> = ({
    id,
    register,
    error,
    defaultValue ='',
    isDisabled = false,
}) => {
    const [codes, setCodes] = useState<Country[]>([]);
    const fetchCountries = async () => {
        try {
          const response = await axios.get("https://restcountries.com/v3.1/all");
          let countryData: Country[] = response.data.map((country: any) => ({
            name: country.name.common,
            code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
            flag: country.flags.svg,
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
    <div className='w-full text-[#444]'>
      <label htmlFor={id} className=' capitalize'>
          Código del país
          <select
            id={id}
            defaultValue={defaultValue}
            className={`mt-2 w-full text-[#666] bg-gray-100 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
              error
                ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                : "border-gray-200 "
            }`}
            {...register}
          >
            <option value="">Seleccione un país</option>
            {codes.map((country, index) => (
              <option key={index} value={country.code}>
                ({country.code}) {country.name} 
              </option>
            ))}
          </select>
          {error && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {error?.message}
          </p>
        )}
        </label>
    </div>
  )
}

export default CountrySelect
