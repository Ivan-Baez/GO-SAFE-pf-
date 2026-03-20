"use client";

import { Star } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    userName: "Camila López",
    activity: "Escalada en roca",
    rating: 5,
    date: "12 Mar 2026",
    comment:
      "Excelente experiencia. Me sentí muy acompañada y segura durante toda la actividad.",
  },
  {
    id: 2,
    userName: "Martín Pérez",
    activity: "Trekking en Bariloche",
    rating: 4,
    date: "8 Mar 2026",
    comment:
      "Muy buena salida. La organización fue clara y la experiencia estuvo muy bien guiada.",
  },
  {
    id: 3,
    userName: "Sofía Ramos",
    activity: "Introducción al senderismo",
    rating: 5,
    date: "1 Mar 2026",
    comment:
      "Ideal para principiantes. Me gustó mucho la paciencia y la energía de la instructora.",
  },
];


export default function Reviews({ reviews }: { reviews: any[] }) {
  if (!reviews.length) {
    return <p className="text-gray-500">No hay reseñas todavía.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="bg-white rounded-2xl border border-[#ece7df] p-5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[#1a3d2b]">
              {review.userName || "Usuario"}
            </h3>

            <div className="flex gap-1">
              {[...Array(review.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-[#e7b52c] text-[#e7b52c]"
                />
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-2">
            {review.activity || "Actividad"}
          </p>

          <p className="text-gray-700">{review.comment}</p>
        </article>
      ))}
    </div>
  );
}