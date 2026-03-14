"use client";
import { IUserSession } from "@/types/types";
import { useRouter } from "next/navigation";
import {useContext, createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";


export interface IAuthContextProps {
    userData: IUserSession | null;
    setUserData: (data: IUserSession | null) => void;
    handleLogout: () => void;
}

export const AuthContext = createContext<IAuthContextProps>({
    userData: null,
    setUserData: () => {},
    handleLogout: () => {},
});

export interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider:React.FC<AuthProviderProps>= ({children}) => {
    const router = useRouter();
    const [userData, setUserData] = useState<IUserSession| null>(null);

useEffect(() => {

    console.log("AuthContext userData:", userData);

    if(userData) {

        const sessionData = JSON.stringify({
            token: userData.token,
            user: userData.user
        });

        localStorage.setItem('userSession', sessionData);

        Cookies.set("usersSession", sessionData, {
            expires: 7,
            path: "/",
        });
    }

}, [userData])

useEffect(() => {
    try {
        // Intentar obtener de cookies primero (más seguro para autenticación)
        const cookieData = Cookies.get("usersSession");
        if (cookieData) {
            setUserData(JSON.parse(cookieData));
        } else {
            // Fallback a localStorage
            const localData = localStorage.getItem('userSession');
            if (localData) {
                setUserData(JSON.parse(localData));
            }
        }
    } catch (error) {
        console.error("Error recuperando sesión:", error);
        setUserData(null);
    }
}, [])

const handleLogout = () => {
    // Limpiar datos
    localStorage.removeItem('userSession');
    Cookies.remove("usersSession", { path: "/" });
    setUserData(null);
    
    // Notificar y redirigir
    alert("Sesión cerrada con éxito");
    router.push('/');
}

    return (
        <AuthContext.Provider value={{userData, setUserData, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext (AuthContext);