import { IRegisterProps } from "@/types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}