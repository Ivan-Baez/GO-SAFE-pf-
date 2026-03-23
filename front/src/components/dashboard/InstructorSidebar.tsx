"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Mountain,
  PlusCircle,
  CalendarCheck,
  Star,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function InstructorSidebar() {
  const { handleLogout } = useAuth();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Mis experiencias", href: "/dashboard/experiences", icon: Mountain },
    { name: "Reservas", href: "/dashboard/bookings", icon: CalendarCheck },
    { name: "Reseñas", href: "/dashboard/reviews", icon: Star },
    { name: "Mi perfil", href: `/instructors/1`, icon: UserRound },
    { name: "Configuración", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-65[260px] flex flex-col min-h-screen bg-[#1a3d2b] text-white p-6 justify-between">
      <div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold">GoSafe</h2>
          <p className="text-sm text-white/70 mt-1">Panel de instructor</p>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 transition"
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#df6d51] transition text-left"
      >
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}