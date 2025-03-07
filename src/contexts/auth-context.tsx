import axiosIns from "@/axios";
import { addToast } from "@heroui/toast";
import { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IUser {
    username: string,
    firstName: string,
    lastName: string,
    phone: string,
    govId: string,
    profile: string,
    background: string,
    email: string,
    password: string,
    bio: string
}

interface ILoginForm {
    email: string;
    password: string;
}


const AuthContext: React.Context<{ login: (values: ILoginForm) => Promise<void>, logout: () => void, user: IUser }> = createContext();

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>(() => {
        const userData = localStorage.getItem("user")
        if (userData) { return JSON.parse(userData) }
        else { return null }
    });
    const [loginError, setLoginError] = useState();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    const login = async (values: ILoginForm) => {
        try {
            const { data } = await axiosIns.post("/auth/login", values);
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user)
            navigate("/");

        } catch (error) {
            if (error?.status == 401) {
                console.error("Unauthorized")
                addToast({ title: "Invalid credential", color: "danger" })
            }
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => (useContext(AuthContext))