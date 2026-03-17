"use client";

import { useAuth } from "@/context/AuthContext";
import UserDashboard from "@/components/dashboard/UserDashboard";
import InstructorDashboard from "@/components/dashboard/InstructorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
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