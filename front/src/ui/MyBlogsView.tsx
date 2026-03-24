"use client";

import { useRouter } from "next/navigation";

interface IMyBlogPost {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

const mockMyBlogs: IMyBlogPost[] = [
  {
    id: "1",
    title: "Mi primera experiencia en surf",
    text: "Una jornada increíble aprendiendo las bases del surf en Mar del Plata...",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: "2",
    title: "Consejos para elegir tu equipo outdoor",
    text: "Antes de salir a una aventura, hay algunas cosas clave que conviene tener en cuenta...",
    imageUrl: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
];

export default function MyBlogsView() {
  const router = useRouter();

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

        {mockMyBlogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#1a3d2b]">
              Todavía no publicaste nada
            </h2>
            <p className="mt-2 text-gray-500">
              Cuando crees una publicación para el blog, va a aparecer acá.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockMyBlogs.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#ece7df]"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-bold text-[#1a3d2b]">
                    {post.title}
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