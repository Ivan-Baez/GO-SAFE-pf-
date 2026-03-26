"use client";

export default function AdminSidebar() {
  return (
    <aside className="h-full bg-[#1B3D2F] text-white p-6">
      
      <h2 className="text-xl font-bold mb-6">Administrador</h2>

      <nav className="flex flex-col gap-3 text-sm">
        <button className="text-left hover:bg-white/10 p-2 rounded">
          Instructores
        </button>
        <button className="text-left hover:bg-white/10 p-2 rounded">
          Usuarios
        </button>
        <button className="text-left hover:bg-white/10 p-2 rounded">
          Experiencias
        </button>
        <button className="text-left hover:bg-white/10 p-2 rounded">
          Blogs
        </button>
      </nav>
    </aside>
  );
}