import React from "react";
import Link from "next/link";

export function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-600 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link href="/admin/users" className="hover:text-gray-300">Usuarios</Link>
        <Link href="/admin/experiences" className="hover:text-gray-300">Experiencias</Link>
        <Link href="/admin/instructors" className="hover:text-gray-300">Instructores</Link>
        <Link href="/admin/reports" className="hover:text-gray-300">Publicaciones</Link>
      </nav>
    </aside>
  );
}