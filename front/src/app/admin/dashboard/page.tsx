"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCard from "@/components/admin/StatsCard";
import AdminChat from "@/components/admin/AdminChat";

export default function AdminDashboard() {
  return (
    <div className="flex bg-gray-100 min-h-[calc(100vh-80px)]">

      <div className="w-64">
        <AdminSidebar />
      </div>

      <div className="flex-1 p-6">
        
        <h2 className="text-2xl font-semibold mb-6">
          Management Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard title="Usuarios" value="1.200" />
          <StatsCard title="Instructores" value="400" />
          <StatsCard title="Pendientes" value="30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatsCard title="Actividades" value="1.200" />
          <StatsCard title="Publicaciones" value="400" />
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="font-semibold mb-4">Chat</h3>
          <AdminChat />
        </div>

      </div>
    </div>
  );
}