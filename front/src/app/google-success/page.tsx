"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Anybody } from "next/font/google";

export default function GoogleSuccess() {

  const params = useSearchParams();
  const router = useRouter();
  const { setUserData } = useAuth();

  useEffect(() => {

    const token = params.get("token");

    if(token){

      const session = {
        token,
        user: {
          id: 0,
          name: "Google User",
          email: "google-user",
          address: "",
          phone: "",
          orders:[]
        }
      };

      setUserData(session);

      router.push("/");
    }

  }, []);

  return <p>Iniciando sesión con Google...</p>;
}