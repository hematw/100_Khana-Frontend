import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { House, Building2, Info } from "lucide-react";
import ThemeSwitch from "./theme-switch";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme-context";


export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);


  return (
    <header className="fixed top-0 left-0 w-full bg-white/50 dark:bg-black/50 shadow-md z-50  backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          <a href="/">
            <img src="/100khana.png" alt="Our logo" className="w-16 h-12" />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-2 bg-gray-200 rounded-full p-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 px-2 transition-all duration-200  rounded-full hover:bg-red-400 hover:text-white cursor-pointer ${isActive ? "bg-red-400 text-white" : "text-gray-700"
              } `
            }
          >
            <House />
            Home
          </NavLink>
          <NavLink
            to="/houses"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 px-2 transition-all duration-200  rounded-full hover:bg-red-400 hover:text-white cursor-pointer ${isActive ? "bg-red-400 text-white" : "text-gray-700"
              } `
            }
          >
            <Building2 />
            Find Houses
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `flex items-center gap-2 py-1 px-2 transition-all duration-200  rounded-full hover:bg-red-400 hover:text-white cursor-pointer ${isActive ? "bg-red-400 text-white" : "text-gray-700"
              } `
            }
          >
            <Info />
            Support
          </NavLink>
        </ul>
        <div className="flex items-center gap-2">
          <ThemeSwitch
            theme={theme} toggleTheme={toggleTheme} />
          <Dropdown />
        </div>
      </nav>
    </header>
  );
}

// export default Navbar;
