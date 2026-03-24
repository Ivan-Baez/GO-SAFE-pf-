import { notFound } from "next/navigation";
import mockBlogs from "@/lib/mocks/blogs";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;

  const post = mockBlogs.find((p) => p.id === id);

  if (!post) return notFound();

  return (
    <article className="min-h-screen bg-[#f7f4ee]">
      <div className="relative h-[400px] w-full">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-1/2 w-full max-w-5xl -translate-x-1/2 px-6 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>

          <p className="mt-3 text-sm md:text-base text-white/90">
            By {post.author} • {post.date}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </article>
  );
}