"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface IMyBlogPost {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export default function MyBlogsView() {
  const router = useRouter();
  const { userData } = useAuth();

  const [blogs, setBlogs] = useState<IMyBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        if (!userData?.token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/blogs/my`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });

        const data = await res.json();

        console.log("MIS BLOGS:", data);

        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.blogs)) {
  setBlogs(data.blogs);
} else if (Array.isArray(data.data)) {
  setBlogs(data.data);
} else {
  setBlogs([]);
}
      } catch (error) {
        console.error("Error cargando mis blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [userData]);

  return (
    <section className="min-h-screen bg-[#f7f4ee] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Blog
            </p>
            <h1 className="text-3xl font-bold text-[#1a3d2b]">
              Mis publicaciones
            </h1>
          </div>

          <button
            onClick={() => router.push("/blogs/create")}
            className="rounded-xl bg-[#e7b52c] px-5 py-3 font-semibold text-[#1f1f1f] transition hover:bg-[#d7a61e]"
          >
            Crear publicación
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#1a3d2b]">
              Todavía no publicaste nada
            </h2>
            <p className="mt-2 text-gray-500">
              Cuando crees una publicación, va a aparecer acá.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#ece7df]"
              >
                <img
                  src={post.imageUrl || "https://via.placeholder.com/400"}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-bold text-[#1a3d2b]">
                    {post.title || "Sin título"}
                  </h2>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {post.text}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/blogs/${post.id}`)}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Ver
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