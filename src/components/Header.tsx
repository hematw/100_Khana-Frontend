import Dropdown from "./Dropdown";
import { TbSmartHome, } from "react-icons/tb";
import { RiBuildingLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";

export default function Header() {

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer"
        >
          <a href="/">
            <img src="/100khana.png" alt="Our logo" className="w-16 h-12" />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-2 bg-gray-200 rounded-full p-1">
          <li
            className="flex items-center gap-2 py-1 px-2 transition-all duration-200 text-gray-700 rounded-full hover:bg-red-400 hover:text-white cursor-pointer"
          >
            <TbSmartHome />
            Home
          </li>
          <li
            className="flex items-center gap-2 py-1 px-2 transition-all duration-200 text-gray-700 rounded-full hover:bg-red-400 hover:text-white cursor-pointer"
          >
            <RiBuildingLine />
            Find Houses
          </li>
          <li
            className="flex items-center gap-2 py-1 px-2 transition-all duration-200 text-gray-700 rounded-full hover:bg-red-400 hover:text-white cursor-pointer"
          >
            <FiInfo />
            Support
          </li>
        </ul>
        <Dropdown />
      </nav>
    </header>
  );
}

// export default Navbar;