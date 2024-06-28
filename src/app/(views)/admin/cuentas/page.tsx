
import { Metadata } from "next";
import Account from "./account";

import MainLayout from "@/app/components/layout/mainLayout";

export const metadata: Metadata = {
  title: "Cuentas - Admin",
};
const page = () => {
  return (
      <MainLayout>
        <Account />
      </MainLayout>
  );
};

export default page;
