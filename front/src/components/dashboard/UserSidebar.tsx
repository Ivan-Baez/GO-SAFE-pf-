"use client";

import {
  LayoutDashboard,
  UserRound,
  NotebookPen,
  CalendarCheck,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function UserSidebar() {
  const { handleLogout } = useAuth();

  const menuItems = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Mi perfil", href: "/user/dashboard", icon: UserRound },
    { name: "Mis publicaciones", href: "/user/dashboard", icon: NotebookPen },
    { name: "Mis actividades", href: "/user/dashboard", icon: CalendarCheck },
    { name: "Configuración", href: "/user/dashboard/settings", icon: Settings, disabled: true },
  ];

  return (
    <DashboardSidebar
      title="GoSafe"
      subtitle="Panel de usuario"
      menuItems={menuItems}
      onLogout={handleLogout}
    />
  );
}