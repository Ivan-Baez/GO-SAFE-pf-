import { IRegisterProps } from "@/types/type";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register (userData: IRegisterProps) {
    try{
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
    }); 
    alert("usuario registrado con exito");
} catch(error: any){
        alert("fallo al registrar el usuario");
        throw new Error (error);
    }
};