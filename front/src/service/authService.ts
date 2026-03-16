import { ILoginProps, IRegisterProps } from "@/types/types";
import { toastSuccess, toastError } from "@/lib/toast";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function parseResponseSafely(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { message: text || "Respuesta no valida del servidor" };
}

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
        const parsedResponse = await parseResponseSafely(response)
      toastSuccess("Se inició sesión correctamente");
      return parsedResponse;
    } else {
    // Si el status no es 200, intentamos leer el error que manda el back
        const errorData = await parseResponseSafely(response);
      throw new Error(errorData.message || "Fallo el servidor al loguearse");
  }} catch (error: any) {
    toastError("Fallo al iniciar sesión");
    throw new Error(error)
  }
}

export async function register (userData: IRegisterProps) {
    try{
    const payload = {
      fistName: userData.primernombre,
      lastName: userData.segundonombre,
      userName: userData.username,
      documentType: userData.documentType,
      document: Number(userData.document),
      genre: userData.genre,
      birthdate: userData.birthdate,
      address: userData.address,
      phone: Number(userData.phone),
      country: userData.country,
      city: userData.city,
      email: userData.mail,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      role: "user",
      profilePic: "",
    };

        const response = await fetch(`${APIURL}/auth/signup-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
      body: JSON.stringify(payload),
    }); 
    
    if(response.ok) {
      const parsedResponse = await parseResponseSafely(response);
      toastSuccess("Usuario registrado con éxito");
      return parsedResponse;
    } else {
      const errorData = await parseResponseSafely(response);
      throw new Error(errorData.message || "Error en la registración");
    }
} catch(error: any){
        toastError("Fallo al registrar el usuario");
  throw new Error(error?.message || "No fue posible registrar el usuario");
    }
}