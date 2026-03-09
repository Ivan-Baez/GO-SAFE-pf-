import React from "react";
import Link from "next/link";

export function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link href="/admin/users" className="hover:text-gray-300">Users</Link>
        <Link href="/admin/experiences" className="hover:text-gray-300">Experiences</Link>
        <Link href="/admin/instructors" className="hover:text-gray-300">Instructors</Link>
        <Link href="/admin/reports" className="hover:text-gray-300">Reports</Link>
      </nav>
    </aside>
  );
}