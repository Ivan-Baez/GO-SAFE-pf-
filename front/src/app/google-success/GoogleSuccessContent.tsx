"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { setUserData } = useAuth();
  useEffect(() => {
    const token = params.get("token");

    if (!token) return;

    setUserData({
      token,
      user: {
        id: 0,
        name: "Google User",
        email: "google-user",
        address: "",
        phone: "",
        orders: [],
      },
    });

    router.replace("/");
  }, [params, router, setUserData]);

  return <p>Iniciando sesión con Google...</p>;
}
