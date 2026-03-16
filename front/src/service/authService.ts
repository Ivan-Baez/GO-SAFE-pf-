import { ILoginProps, IRegisterProps } from "@/types/types";
import { toastSuccess, toastError } from "@/lib/toast";
import { IInstructorRegisterProps } from "@/types/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

//funcion de login
export async function loginService(userData: ILoginProps) {
  try {
   const response = await fetch(`${APIURL}/users/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
   })
    if(response.ok){
      const parsedResponse = await response.json()
      toastSuccess("Se inició sesión correctamente");
      return parsedResponse;
    } else {
    // Si el status no es 200, intentamos leer el error que manda el back
      const errorData = await response.json();
      throw new Error(errorData.message || "Fallo el servidor al loguearse");
  }} catch (error: any) {
    toastError("Fallo al iniciar sesión");
    throw new Error(error)
  }
}

export async function register (userData: IRegisterProps) {
    try{
        const response = await fetch(`${APIURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
    }); 
    
    if(response.ok) {
      const parsedResponse = await response.json();
      toastSuccess("Usuario registrado con éxito");
      return parsedResponse;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la registración");
    }
} catch(error: any){
        toastError("Fallo al registrar el usuario");
        throw new Error (error);
    }
}

export async function registerInstructor(userData: IInstructorRegisterProps) {
    try {
        const response = await fetch(`${APIURL}/register/instructors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData), // Aquí mandas TUS datos tal cual
        });

        const res = await response.json();

        if (response.ok) {
            return res; // Debería traer { token, user }
        } else {
            throw new Error(res.message || "Error al registrar instructor");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}