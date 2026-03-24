import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface IBlogPost {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  author?: string;
  date?: string;
}

async function getBlogById(id: string): Promise<IBlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error cargando publicación:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;

  const post = await getBlogById(id);

  if (!post) return notFound();

  return (
    <article className="min-h-screen bg-[#f7f4ee]">
      <div className="relative h-[400px] w-full">
        <img
          src={post.imageUrl || "https://via.placeholder.com/1200x600"}
          alt={post.title || "Publicación"}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-1/2 w-full max-w-5xl -translate-x-1/2 px-6 text-white">
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            {post.title || "Sin título"}
          </h1>

          <p className="mt-3 text-sm text-white/90 md:text-base">
            By {post.author || "GoSafe"} • {post.date || "Reciente"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="whitespace-pre-line leading-relaxed text-gray-700">
          {post.text}
        </p>
      </div>
    </article>
  );
}