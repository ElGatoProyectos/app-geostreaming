import Header from "@/app/components/layout/header";
import { ReactNode } from "react";
import { Suspense, lazy } from "react";
import Loading from "@/app/loading"
import { ToastContainer} from 'react-toastify';
interface LayoutProps {
  children: ReactNode;
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
    <div className="relative  ">
      <Header userRole="admin" />
      <main className="bg-gray-50 min-h-[calc(100vh-70px)] lg:left-[220px] top-[70px]  relative lg:w-[calc(100%-220px)]  px-4 md:px-10 py-6 w-full">
        {children}
      </main>
      <ToastContainer 
       position= "top-right"
       autoClose= {5000}
       theme= "light"
       />
    </div>
    </Suspense>
  );
};

export default Layout;
