import { ILoginProps, IRegisterProps, IReview, IInstructorRegisterProps } from "@/types/types";
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
      firstName: userData.primernombre,
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

export async function registerInstructor(userData: any) {
  try {
    const response = await fetch(`${APIURL}/auth/signup-instructor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const contentType = response.headers.get("content-type");
    let res;

    if (contentType && contentType.includes("application/json")) {
      res = await response.json();
    } else {
      res = await response.text();
    }

    console.log("STATUS:", response.status);
    console.log("RESPUESTA COMPLETA DEL BACK:", res);

    if (!response.ok) {
      throw new Error(
        typeof res === "string" ? res : JSON.stringify(res)
      );
    }

    return res;
  } catch (error: any) {
    console.error("Error capturado en el servicio:", error.message);
    throw error;
  }
}

/**
 * Sube un certificado al backend y devuelve la URL final.
 * El backend debería encargarse de subir a Cloudinary y devolver la URL.
 */
export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "TU_UPLOAD_PRESET");
  formData.append("cloud_name", "TU_CLOUD_NAME");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Error subiendo archivo");
  }

  return data.secure_url;
}

export async function getReviews(): Promise<IReview[]> {
  try {
    const response = await fetch(`${APIURL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudieron obtener las reseñas");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener las reseñas");
  }
}

export async function getReviewsByInstructor(id: string) {
  try {
    const response = await fetch(`${APIURL}/reviews?instructorId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudieron obtener las reseñas");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener las reseñas");
  }
}

export async function getInstructorById(id: string, token: string) {
  try {
    const response = await fetch(`${APIURL}/instructors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo obtener el instructor");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener el instructor");
  }
}