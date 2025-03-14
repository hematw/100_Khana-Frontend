import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const [previousPage, setPreviousPage] = useState("/");
  const location = useLocation();

  useEffect(() => {
    const prevPage = location.state?.from || "/";
    setPreviousPage(prevPage);
  }, [location]);

  return (
    <>
      <Header />
      <div className="min-h-svh flex justify-center items-center text-center mt-10">
        <div className="max-w-fit drop-shadow-2xl">
          <img src="/not-found.svg" alt="" />
          <h3 className="text-3xl font-semibold mt-10">Looks you are lost?</h3>
          <p className="mt-2">Requested page not found in our server</p>
          <Link
            to={previousPage}
            className="bg-danger-400 w-full mt-6 px-4 py-2 text-white rounded-lg shadow-lg inline-block hover:drop-shadow-2xl duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
