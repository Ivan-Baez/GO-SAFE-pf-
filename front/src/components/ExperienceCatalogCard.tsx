"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ExperienceCatalogCardProps {
  id: string | number;
  title: string;
  image: string;
  difficulty: string;
  price: number;
  location: string;
  category?: string;
}

export default function ExperienceCatalogCard({
  id,
  title,
  image,
  difficulty,
  price,
  location,
  category,
}: ExperienceCatalogCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${id}`)}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:scale-105 transition"
    >
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <p className="text-gray-600 mb-1">📍 {location}</p>
      <p className="text-gray-600 mb-1">Dificultad: {difficulty}</p>

      {category && (
        <p className="text-gray-600 mb-3">Categoría: {category}</p>
      )}

      <p className="text-green-700 font-bold">${price}</p>
    </div>
  );
}