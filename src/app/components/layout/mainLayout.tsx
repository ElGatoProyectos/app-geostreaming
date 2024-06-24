import Header from "@/app/components/layout/header";
import { ReactNode } from "react";
import { Suspense, lazy } from "react";
import Loading from "@/app/loading"
interface LayoutProps {
  children: ReactNode;
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
     
    
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <main className=" lg:left-[220px] top-[70px]  relative lg:w-[calc(100%-220px)]  px-4 md:px-10 py-6 w-full">
        {children}
      </main>
    </div>
    </Suspense>
  );
};

export default Layout;
