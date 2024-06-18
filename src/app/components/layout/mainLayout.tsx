import Header from "@/app/components/layout/header";
import Contact from "@/app/components/admin/contact";
import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="lg:left-[220px] top-[100px]  relative lg:w-[calc(100%-220px)]  px-4 md:px-10 py-6 w-full">
        {children}
      </main>
      {/* <Contact /> */}
    </>
  );
};

export default MainLayout;
