"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AdminChat from "@/components/admin/AdminChat";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Mountain,
  Calendar,
} from "lucide-react";

interface User {
  id: string;
  role: string;
  status: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [userSession, setUserSession] = useState<any>(null);

  const getToken = () => {
    const session = localStorage.getItem("userSession");
    if (!session) return null;

    try {
      return JSON.parse(session)?.token;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      const parsed = JSON.parse(session);
      setUserSession(parsed.user);
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalUsers = users.length;
  const totalInstructors = users.filter((u) => u.role === "instructor").length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const bannedUsers = users.filter((u) => u.status === false).length;

  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar
          title="Administrador"
          subtitle="Panel de control"
          onLogout={() => console.log("logout")}
          menuItems={[
            {
              name: "Dashboard",
              href: "/admin/dashboard",
              icon: LayoutDashboard,
            },
            {
              name: "Usuarios",
              href: "/admin/users",
              icon: Users,
            },
            {
              name: "Instructores",
              href: "/admin/instructors",
              icon: Users,
            },
            {
              name: "Experiencias",
              href: "/admin/experiences",
              icon: Mountain,
            },
            {
              name: "Blogs",
              href: "/admin/blogs",
              icon: BookOpen,
            },
          ]}
        />
      }
    >
      <div className="p-6 space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bienvenido, {userSession?.name || "Admin"}
          </h1>
          <p className="text-gray-500">
            Gestiona toda la plataforma desde aquí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <DashboardStatCard
            title="Usuarios"
            value={totalUsers}
            icon={Users}
            iconClassName="text-blue-600"
            iconWrapperClassName="bg-blue-100"
          />

          <DashboardStatCard
            title="Instructores"
            value={totalInstructors}
            icon={Users}
            iconClassName="text-green-600"
            iconWrapperClassName="bg-green-100"
          />

          <DashboardStatCard
            title="Admins"
            value={totalAdmins}
            icon={Users}
            iconClassName="text-purple-600"
            iconWrapperClassName="bg-purple-100"
          />

          <DashboardStatCard
            title="Baneados"
            value={bannedUsers}
            icon={Users}
            iconClassName="text-red-600"
            iconWrapperClassName="bg-red-100"
          />

          <DashboardStatCard
            title="Experiencias"
            value="--"
            icon={Mountain}
            iconClassName="text-yellow-600"
            iconWrapperClassName="bg-yellow-100"
          />

          <DashboardStatCard
            title="Reservas"
            value="--"
            icon={Calendar}
            iconClassName="text-orange-600"
            iconWrapperClassName="bg-orange-100"
          />

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 border">
          <h2 className="font-semibold text-gray-700 mb-2">
            Actividad reciente
          </h2>
          <p className="text-gray-500 text-sm">
            Logs del sistema o eventos.
          </p>
        </div>

      </div>

      <AdminChat />
    </DashboardLayout>
  );
}