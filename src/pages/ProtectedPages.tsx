import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ProtectedPages() {
  const token = localStorage.getItem("token");

  // if (token) {
  //   return <Navigate to={"/login"} />
  // }

  return (
    <>
      <Header />
      <SidebarProvider>
        <main className="min-h-[540px]">
          {token ?
            <Outlet />
            : <Navigate to={"/login"} />}
        </main>
      </SidebarProvider>
      <Footer />
    </>
  );
}
