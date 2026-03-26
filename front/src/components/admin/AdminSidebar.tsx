"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${pathname === path
      ? "bg-white text-green-900 font-semibold"
      : "text-white hover:bg-green-800"
    }`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">Administrador</h2>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          Dashboard
        </Link>

        <Link href="/admin/users" className={linkClass("/admin/users")}>
          Usuarios
        </Link>

        <Link href="/admin/instructors" className={linkClass("/admin/instructors")}>
          Instructores
        </Link>

        <Link href="/admin/experiences" className={linkClass("/admin/experiences")}>
          Experiencias
        </Link>

        <Link href="/admin/blogs" className={linkClass("/admin/blogs")}>
          Blogs
        </Link>
      </nav>
    </div>
  );
}