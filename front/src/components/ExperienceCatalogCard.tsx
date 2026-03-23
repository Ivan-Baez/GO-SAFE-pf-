"use client";

import { useRouter } from "next/navigation";

interface ExperienceCatalogCardProps {
  id: string | number;
  title: string;
  difficulty: string;
  price: number;
  location: string;
  category?: string;
}

export default function ExperienceCatalogCard({
  id,
  title,
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