import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PublicLayout() {
    return (
        <>
            <Header />
            <main className="min-h-[540px]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default PublicLayout