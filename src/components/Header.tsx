import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import ThemeSwitch from "./theme-switch";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/theme-context";
import { Drawer,  } from "@heroui/drawer";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const {} = useDisclosure()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`px-6 py-4 bg-white dark:bg-zinc-900 shadow-md  my-4 rounded-lg  flex justify-between items-center max-w-6xl lg:mx-auto mx-8 transition-all duration-200 ${
          isScrolled && "backdrop-blur-md bg-white/50 dark:bg-zinc-900/50"
        }`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          <a href="/">
            <img src="/100khana.png" alt="Our logo" className="w-18 h-12" />
          </a>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex justify-between space-x-2 rounded-full gap-4">
          <NavLink
            to="/"
            className={`py-1 px-2 transition-all duration-200 hover:text-prime`}
          >
            Buy
          </NavLink>
          <NavLink
            to="/houses"
            className={`py-1 px-2 transition-all duration-200 hover:text-prime `}
          >
            Rent
          </NavLink>
          <NavLink
            to="/support"
            className={`py-1 px-2 transition-all duration-200 hover:text-prime `}
          >
            Mortgage
          </NavLink>
          <NavLink
            to="/support"
            className={`py-1 px-2 transition-all duration-200 hover:text-prime `}
          >
            Property Consultants
          </NavLink>
          <NavLink
            to="/support"
            className={`py-1 px-2 transition-all duration-200 hover:text-prime `}
          >
            Real Estate & Properties
          </NavLink>
        </div>
        <Drawer>

        </Drawer>
        <div className="flex items-center gap-2">
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
          <NavDropdown />
        </div>
      </nav>
    </header>
  );
}

// export default Navbar;
