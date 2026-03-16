"use client";

import { useRouter } from "next/navigation";

export default function ExperienceCard({ experience }: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${experience.id}`)}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:scale-105 transition"
    >
      <h2 className="text-xl font-semibold mb-2">
        {experience.title}
      </h2>

      <p className="text-gray-600">
        📍 {experience.location}
      </p>

      <p className="text-gray-600">
        dificultad: {experience.difficulty}
      </p>

      <p className="text-green-700 font-bold mt-3">
        ${experience.price}
      </p>
    </div>
  );
}