import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProtectedPages() {
  const token = localStorage.getItem("token");

  // if (token) {
  //   return <Navigate to={"/login"} />
  // }

  return (
    <>
      <AppSidebar />
      <main className="min-h-[540px] p-4  grow">
        {token ? <Outlet /> : <Navigate to={"/login"} />}
      </main>
    </>
  );
}
