"use client";

import { useAuth } from "@/context/AuthContext";
import CommentsSection, { CommentItem } from "@/components/CommentsSection";
import ExperienceContentSection from "@/components/ExperienceContentSection";
import { IProduct } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ExperienceView: React.FC<IProduct> = ({ name, id,place, image, description, price }) => {
  const router = useRouter();
  const { userData } = useAuth();

  const experienceItems = [
    `Introduccion y briefing de seguridad para ${name}`,
    `Practica guiada en ${place}`,
    "Acompanamiento personalizado por instructor segun tu nivel",
  ];

  const comments: CommentItem[] = [
    {
      id: 1,
      author: "Maria Fernandez",
      message: `Increible experiencia en ${place}. Super recomendado para quienes quieren aprender con seguridad.`,
      rating: 5,
      date: "Hace 2 dias",
    },
    {
      id: 2,
      author: "Lucas Gomez",
      message: "Buen ritmo de clase y excelente trato del instructor.",
      rating: 4,
      date: "Hace 5 dias",
    },
  ];

  const handleReserve = () => {
    if (!userData?.token) {
      alert("Inicia sesion para reservar esta aventura");
      router.push("/login");
      return;
    }

    router.push("/cart");
  };

  return (
    <section className="w-full bg-[#f5f2eb] py-10 px-6">
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-[#1a3d2b]"></h1>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* IZQUIERDA */}
          <div className="md:col-span-2 space-y-6">

            {/* TITULO */}
            <div>
              <h2 className="text-xl font-bold text-[#1a3d2b]">
                {name}
              </h2>
              <p className="text-sm text-gray-500">📍 {place}</p>
            </div>

            {/* IMAGEN */}
            <div className="relative h-64 w-full overflow-hidden rounded-xl">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="rounded-xl bg-[#f7efe5] p-4">
              <p className="text-sm text-gray-700">{description}</p>
            </div>

            <ExperienceContentSection items={experienceItems} />

          </div>

          {/* DERECHA - CARD DE PAGO */}
          <div className="rounded-xl border p-5 shadow-sm h-fit">
            <h3 className="font-bold text-gray-700 mb-4">
              Métodos de pago
            </h3>

            <p className="text-sm text-gray-500 mb-2">1 persona</p>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold">${price} USD</span>
            </div>

            <button
              onClick={handleReserve}
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Reservar Instructor
            </button>

            <button
              onClick={() => router.push("/cart")}
              className="w-full mt-3 border border-gray-300 py-2 rounded-lg"
            >
              Ver carrito
            </button>
          </div>

        </div>
      </div>

      <CommentsSection initialComments={comments} />

    </section>
  );
};

export default ExperienceView;