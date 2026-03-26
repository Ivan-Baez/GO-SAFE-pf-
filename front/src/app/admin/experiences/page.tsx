"use client";

import AdminExperiences from "@/ui/admin/AdminExperiences";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import {
  LayoutDashboard,
  Users,
  Mountain,
  BookOpen,
  Settings,
} from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar
          title="Administrador"
          subtitle="Panel de control"
          onLogout={() => console.log("logout")}
          menuItems={[
            { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
            { name: "Usuarios", href: "/admin/users", icon: Users },
            { name: "Instructores", href: "/admin/instructors", icon: Users },
            { name: "Experiencias", href: "/admin/experiences", icon: Mountain },
            { name: "Blogs", href: "/admin/blogs", icon: BookOpen },
            { name: "Configuración", href: "/admin/settings", icon: Settings },
          ]}
        />
      }
    >
      <AdminExperiences />
    </DashboardLayout>
  );
}