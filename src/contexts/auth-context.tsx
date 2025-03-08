import axiosIns from "@/axios";
import { addToast } from "@heroui/toast";
import { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  govId: string;
  profile: string;
  background: string;
  email: string;
  password: string;
  bio: string;
}

interface ILoginForm {
  email: string;
  password: string;
}

const defaultUser: IUser = {
  username: "",
  firstName: "",
  lastName: "",
  phone: "",
  govId: "",
  profile: "",
  background: "",
  email: "",
  password: "",
  bio: "",
};

const AuthContext = createContext<{
  login: (values: ILoginForm) => Promise<void>;
  logout: () => void;
  user: IUser;
  isLoggedIn: boolean;
}>({
  login: () => Promise.resolve(),
  logout: () => {},
  user: defaultUser,
  isLoggedIn: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  });
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  async function login(values: ILoginForm) {
    try {
      const { data } = await axiosIns.post("/auth/login", values);
      console.log(data);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      addToast({ title: "Login Success", color: "success" });
      navigate("/", { replace: true });
    } catch (error) {
      if (isAxiosError(error) && error?.status == 401) {
        console.error("Unauthorized");
        addToast({ title: "Invalid Credential", color: "danger" });
      }
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
