"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminBlogsView() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getToken = () => {
    const s = localStorage.getItem("userSession");
    return s ? JSON.parse(s)?.token : null;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch(`${API_URL}/blogs`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await res.json();
    setBlogs(Array.isArray(data) ? data : data.blogs || []);
    setLoading(false);
  };

  // 🔴 ELIMINAR
  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar blog?")) return;

    setDeletingId(id);

    await fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setDeletingId(null);
  };

  // ✏️ EDITAR
  const handleUpdate = async () => {
    await fetch(`${API_URL}/blogs/${selected.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(selected),
    });

    setSelected(null);
    setEditMode(false);
    fetchBlogs();
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <section className="p-6 bg-[#f7f4ee] min-h-screen">

      <h1 className="text-2xl font-bold text-[#1a3d2b] mb-6">
        Blogs
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {blogs.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow border overflow-hidden">

            <img
              src={post.imageUrl || "https://via.placeholder.com/400"}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-lg text-[#1a3d2b]">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {post.user?.firstName || "Usuario"}
              </p>

              <p className="text-sm mt-2 line-clamp-3">
                {post.text}
              </p>

              <div className="flex gap-2 mt-4 flex-wrap">

                <button
                  onClick={() => setSelected(post)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  Ver
                </button>

                <button
                  onClick={() => {
                    setSelected(post);
                    setEditMode(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  {deletingId === post.id ? "..." : "Eliminar"}
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-[500px] space-y-3">

            <h2 className="font-bold text-lg">
              {editMode ? "Editar blog" : "Detalle"}
            </h2>

            <input
              disabled={!editMode}
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
              className="border p-2 w-full rounded"
            />

            <textarea
              disabled={!editMode}
              value={selected.text}
              onChange={(e) =>
                setSelected({ ...selected, text: e.target.value })
              }
              className="border p-2 w-full rounded h-32"
            />

            <input
              disabled={!editMode}
              value={selected.imageUrl || ""}
              onChange={(e) =>
                setSelected({ ...selected, imageUrl: e.target.value })
              }
              className="border p-2 w-full rounded"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setSelected(null)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Cerrar
              </button>

              {editMode && (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Guardar
                </button>
              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
}