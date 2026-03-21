//Rediriga a Dashboard segun rol
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";

interface DecodedToken {
  id: string;
  email: string;
  role: "user" | "instructor" | "admin";
}

export default function DashboardRedirect() {
  const { userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userData?.token) return;

    const decoded = jwtDecode<DecodedToken>(userData.token);

    if (decoded.role === "instructor") {
      router.push("/instructor/dashboard");
    } else if (decoded.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  }, [userData, router]);

  return <p>Cargando...</p>;
}