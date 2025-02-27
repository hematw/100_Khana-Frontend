import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProtectedPages() {
  const token = localStorage.getItem("token");

  // if (token) {
  //   return <Navigate to={"/login"} />
  // }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="min-h-[540px] p-4  grow">
          <SidebarTrigger className="fixed top-4" />

          {token ?
            <Outlet />
            : <Navigate to={"/login"} />}
        </main>
      </SidebarProvider>
    </>
  );
}
