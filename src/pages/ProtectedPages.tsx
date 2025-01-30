import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProtectedPages() {
  const token = localStorage.getItem("token");

  // if (token) {
  //   return <Navigate to={"/login"} />
  // }

  return (
    <>
      <SidebarProvider>
        <DashboardSidebar/>
        <main className="min-h-[540px] p-4">
        <SidebarTrigger className="-ml-1" />
          {token ?
            <Outlet />
            : <Navigate to={"/login"} />}
        </main>
      </SidebarProvider>
    </>
  );
}
