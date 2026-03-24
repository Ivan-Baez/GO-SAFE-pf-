"use client";

import { useRouter } from "next/navigation";

interface BlogCardProps {
  id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
}

export default function BlogCard({
  id,
  title,
  image,
  author,
  date,
  tags,
}: BlogCardProps) {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/blogs/${id}`)}
      className="group relative h-120[480px] overflow-hidden rounded-2xl cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-lienar-to-t from-black/75 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/80">
          {tags.join(", ")}
        </p>

        <h2 className="mb-3 text-xl font-bold uppercase leading-tight md:text-2xl">
          {title}
        </h2>

        <p className="text-sm text-white/85">
          By {author} • {date}
        </p>
      </div>
    </article>
  );
}