import { Suspense, lazy } from "react";
import Loading from "@/app/loading";
const Index = lazy(() => import("./index"));

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Index></Index>
      </div>
    </Suspense>
  );
}
