"use client";

import { useAuth } from "@/context/AuthContext";
import UserDashboard from "@/ui/UserDashboard";
import InstructorDashboard from "@/ui/InstructorDashboard";
import AdminDashboard from "@/ui/AdminDashboard";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  role: "user" | "instructor" | "admin";
}

export default function Dashboard() {
  const { userData } = useAuth();

  if (!userData) return <p>Cargando...</p>;

  const decoded = jwtDecode<DecodedToken>(userData.token);

  return (
    <div className="min-h-fit bg-[#f7f4ee] w-full ">
      {decoded.role === "instructor" && <InstructorDashboard />}
      {decoded.role === "admin" && <AdminDashboard />}
      {decoded.role === "user" && <UserDashboard />}
    </div>
  )
}