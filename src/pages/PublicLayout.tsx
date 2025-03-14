import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Navbar from "@/components/Navbar";

function PublicLayout() {
    return (
        <>
            <Header />
            {/* <Navbar /> */}
            <main className="min-h-[540px] mt-40">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default PublicLayout