import { createContext, useEffect, useState } from "react";

interface ThemeContextI {
    theme: string;
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextI>({ theme: "", toggleTheme: () => { } });

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        console.log("clicked the toggle func")
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        if(theme==="dark"){
            window.document.body.classList.add("dark")
        } else {
            window.document.body.classList.remove("dark")
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider