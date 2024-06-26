import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" animate-spin ">
      <AiOutlineLoading3Quarters className="text-6xl text-[#F2308B]"/>
      </div>
    </div>
  );
};

export default Loading;
