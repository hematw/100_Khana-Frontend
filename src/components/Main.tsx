import { ArrowDown, ArrowRight } from "lucide-react";
import Card from "../components/Card";
import { Button } from "./ui/button";

const images = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
];

const info = {
  title: "Luxury Apartment",
  address: "23 st, 12 district, Kabul",
  price: 5000,
  status: "Sell",
  rating: 4.3,
  images,
};

export default function Main() {
  return (
    <>
      <section className="h-screen bg-[url(./landing-background.jpg)] bg-cover">
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="relative backdrop-blur-sm  max-w-5xl  bg-gradient-to-b from-gray-50 to-transparent mx-10 text-stone-800 text-center rounded-full border-2 border-gray-300/50">
            <h1 className="text-7xl px-10 py-6 font-semibold font-clash">
              Find Your Perfect Space with <span className=" text-red-500">100-Khana </span>
            </h1>
            <p className="absolute -top-6 left-1/2 -translate-x-1/2 -rotate-3 border-3 border-gray-400/50 bg-gradient-to-b from-slate-500 to-gray-700 px-6 py-2 text-white rounded-full">Buy, Rent, or Mortgage—All in One Place!</p>
          </div>
          <Button className="px-4 py-8 absolute bottom-6 right-6 rounded-full">
            Search in properties...
            <span className="rounded-full bg-white p-2 text-red-400">
              <ArrowRight size={32} />
            </span>
          </Button>
          <a href="" className="flex items-center text-white shadow-md absolute bottom-6 hover:scale-95 transition-all duration-150 left-1/2 -translate-x-1/2">Explore More <ArrowDown /></a>
        </div>
      </section>
      <section className="max-w-[1480px] min-h-screen mx-auto my-28 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 place-items-center">
          {Array.from("abcdefgh").map((_, index) => (
            <Card {...info} className="min-w-[270px]" key={index} />
          ))}
        </div>
      </section>
    </>
  );
}
