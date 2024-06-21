import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" animate-spin ">
      <AiOutlineLoading3Quarters className="text-6xl text-blue-300"/>
      </div>
    </div>
  );
};

export default loading;
