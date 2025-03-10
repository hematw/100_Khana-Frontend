import { Link, NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import ThemeSwitch from "./theme-switch";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/theme-context";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { useDisclosure } from "@heroui/use-disclosure";
import { Button } from "@heroui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

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
        className={`bg-white dark:bg-zinc-900 shadow-md rounded-lg  flex justify-between items-center w-full md:max-w-6xl md:my-4 px-6 py-4 lg:mx-auto md:mx-8 transition-all duration-200 ${
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
        <Button
          isIconOnly
          variant="light"
          onPress={onOpen}
          className="md:hidden -order-1"
        >
          <Menu />
        </Button>
        <Drawer
          isOpen={isOpen}
          size="xs"
          onOpenChange={onOpenChange}
          placement="right"
        >
          <DrawerContent>
            {() => (
              <div className="flex flex-col space-y-4 p-6 bg-white h-full shadow-lg rounded-lg">
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Buy
                </NavLink>
                <NavLink
                  to="/houses"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Rent
                </NavLink>
                <NavLink
                  to="/support"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Mortgage
                </NavLink>
                <NavLink
                  to="/support"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Property Consultants
                </NavLink>
                <NavLink
                  to="/support"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
                >
                  Real Estate & Properties
                </NavLink>
              </div>
            )}
          </DrawerContent>
        </Drawer>
        <div className="flex items-center gap-2">
          <ThemeSwitch
            theme={theme}
            toggleTheme={toggleTheme}
            className="hidden md:block"
          />
          <Button
            onPress={() => navigate("/properties")}
            variant="bordered"
            color="danger"
          >
            Add Property
          </Button>
          {/* <NavDropdown /> */}
        </div>
      </nav>
    </header>
  );
}

// export default Navbar;
