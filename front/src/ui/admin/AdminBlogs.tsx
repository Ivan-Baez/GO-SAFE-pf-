"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toastError, toastSuccess } from "@/lib/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface IAdminBlogPost {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export default function AdminBlogsView() {
  const { userData } = useAuth();
  const [blogs, setBlogs] = useState<IAdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`, {
          headers: userData?.token
            ? {
                Authorization: `Bearer ${userData.token}`,
              }
            : undefined,
        });

        const data = await res.json();
        console.log("ADMIN BLOGS:", data);

        if (!res.ok) {
          throw new Error(data.message || "Error al cargar publicaciones");
        }

        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else if (Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      } catch (error: any) {
        console.error("Error cargando blogs:", error);
        toastError(error.message || "No se pudieron cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userData]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta publicación?");
    if (!confirmDelete) return;

    try {
      if (!userData?.token) {
        toastError("No hay sesión activa");
        return;
      }

      setDeletingId(id);

      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      console.log("DELETE BLOG:", data);

      if (!res.ok) {
        throw new Error(data.message || "No se pudo eliminar la publicación");
      }

      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      toastSuccess("Publicación eliminada correctamente");
    } catch (error: any) {
      console.error("Error eliminando publicación:", error);
      toastError(error.message || "No se pudo eliminar la publicación");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#f7f4ee] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-[#1a3d2b]">
            Gestión de publicaciones
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Revisa y elimina publicaciones del blog de la plataforma.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando publicaciones...</p>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#1a3d2b]">
              No hay publicaciones cargadas
            </h2>
            <p className="mt-2 text-gray-500">
              Cuando existan publicaciones, van a aparecer acá.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl border border-[#ece7df] bg-white shadow-sm"
              >
                <img
                  src={post.imageUrl || "https://via.placeholder.com/400x250"}
                  alt={post.title || "Publicación"}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-bold text-[#1a3d2b]">
                    {post.title || "Sin título"}
                  </h2>

                  <p className="mb-4 line-clamp-4 text-sm text-gray-600">
                    {post.text}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      {deletingId === post.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}