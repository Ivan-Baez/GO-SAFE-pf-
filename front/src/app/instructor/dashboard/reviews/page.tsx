"use client";

import { useEffect, useState } from "react";
import { getReviews } from "@/service/authService";
import Reviews from "@/components/dashboard/Reviews";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error("Error cargando reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <section className="min-h-screen bg-gray-50 w-full flex ">
      <InstructorSidebar/>

      <div className="w-full mx-auto px-10 py-10  flex-1">
        <h1 className="text-3xl font-bold text-[#1a3d2b] mb-6">
          Reseñas
        </h1>

        <Reviews reviews={reviews} />
      </div>
    </section>
  );
}