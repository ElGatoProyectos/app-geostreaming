import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { AssignAccountFormSchema } from "@/app/schemas/assignAccountFormSchema";
import axios from "axios";

type Inputs = {
  id?: number;
  account: string;
};

interface AssignAccountProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
  platformId: number;
}

const AssignAccountForm: React.FC<AssignAccountProps> = ({
  defaultValues,
  onSubmit,
  platformId,
}) => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(AssignAccountFormSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/account", {
          params: { status: "NOT_BOUGHT" },
        });
        const filteredPlatform = response.data.filter((platform: any) => {
          return platform.platform_id === platformId;
        });

        setAccounts(filteredPlatform);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };
    fetchData();
    console.log(defaultValues)
  }, []);

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error al asignar cuenta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="relative flex w-full flex-col gap-4"
    >
      {defaultValues?.id && (
        <input type="hidden" {...register("id")} value={defaultValues.id} />
      )}
      <div className="overflow-auto">
        <Autocomplete
          defaultItems={accounts}
          placeholder="Seleccione una cuenta"
          className="bg-gray-100 placeholder:text-[#444]"
        >
          {(account: any) => (
            <AutocompleteItem key={account.id}>
              {account.email}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      {/* <label htmlFor="type" className="text-[#444]">
        Seleccionar Cuenta:
        <select
          id="account"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.account
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("account")}
        >
          <option value="">Seleccione una cuenta</option>
          <option value="1">cuenta 1</option>
          <option value="2">cuenta 2</option>
        </select>
        {errors.account && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.account.message}
          </p>
        )}
      </label> */}
      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#F2308B] text-white mt-4 px-4 py-1 rounded hover:bg-[#F06FAC] transition-all duration-300 mx-auto "
          disabled={loading}
        >
          {loading ? (
            <span>
              <AiOutlineLoading3Quarters className=" animate-spin inline-block" />{" "}
              Cargando
            </span>
          ) : (
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
};

export default AssignAccountForm;
