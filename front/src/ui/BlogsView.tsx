"use client";

import BlogCard from "@/components/BlogCard";
import mockBlogs from "@/lib/mocks/blogs";

export default function BlogsView() {
  return (
    <section className="min-h-screen bg-[#f7f4ee] px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-[#37393f] md:text-6xl">
            Blog
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 md:text-base">
            Noticias, consejos y novedades sobre <br/> actividades outdoor,
            aventura y experiencias para nuestra comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockBlogs.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}