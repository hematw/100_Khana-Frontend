import axiosIns from "@/axios";
import { IRegisterForm } from "@/pages/Register";
import { ILoginForm, IUser } from "@/types";
import { addToast } from "@heroui/toast";
import { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";



const defaultUser: IUser = {
  _id: "",
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
  signUp: (values: IRegisterForm) => Promise<void>;
  logout: () => void;
  user: IUser;
  isLoggedIn: boolean;
}>({
  login: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  logout: () => {},
  user: defaultUser,
  isLoggedIn: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => {
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
    setUser(null);
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
        addToast({ title: "Invalid Credential", color: "primary" });
      }
      console.error(error);
    }
  }

  async function signUp(values: IRegisterForm) {
    try {
      const { data } = await axiosIns.post("/auth/register", values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.createdUser));
      setUser(data.createdUser)
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      addToast({
        title: "Register Failed",
        description: "Something went wrong, Please try again later.",
        color: "primary"
      })
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, signUp, user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
