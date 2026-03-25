"use client";

import BlogCard from "@/components/BlogCard";

interface IBlog {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

interface BlogsViewProps {
  blogs: IBlog[];
}

export default function BlogsView({ blogs }: BlogsViewProps) {
  return (
    <section className="min-h-screen bg-[#f7f4ee] px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-[#37393f] md:text-6xl">
            Blog
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 md:text-base">
            Noticias, consejos y novedades sobre <br />
            actividades outdoor, aventura y experiencias para nuestra comunidad.
          </p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay publicaciones todavía
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}