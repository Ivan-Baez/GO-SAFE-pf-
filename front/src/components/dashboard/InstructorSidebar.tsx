"use client";

import {
  LayoutDashboard,
  Mountain,
  StickyNote,
  CalendarCheck,
  Star,
  UserRound,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function InstructorSidebar() {
  const { handleLogout } = useAuth();

 const menuItems = [
  { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { name: "Mi blog ", href: "/instructor/dashboard/blog", icon: StickyNote },
  { name: "Mis experiencias", href: "/instructor/dashboard/experiences", icon: Mountain },
  { name: "Reservas", href: "/instructor/dashboard/bookings", icon: CalendarCheck },
  { name: "Reseñas", href: "/instructor/dashboard/reviews", icon: Star },
  { name: "Mi perfil", href: "/instructor/dashboard/profile", icon: UserRound },
  { name: "Configuración", href: "/instructor/dashboard/settings", icon: Settings, disabled: true },
];

  return (
    <DashboardSidebar
      title="GoSafe"
      subtitle="Panel de instructor"
      menuItems={menuItems}
      onLogout={handleLogout}
    />
  );
}