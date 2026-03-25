"use client";

import { useEffect, useState } from "react";
import { MapPin, DollarSign, UserRound, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toastError, toastSuccess } from "@/lib/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface IAdminExperience {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  category: string;
  dificulty: string;
  price: number;
  capacity: number;
  date: string;
  duration: string;
  image?: string;
  status?: boolean;
  instructor?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export default function AdminExperiencesView() {
  const { userData } = useAuth();
  const [experiences, setExperiences] = useState<IAdminExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch(`${API_URL}/experiences`, {
          headers: userData?.token
            ? {
                Authorization: `Bearer ${userData.token}`,
              }
            : undefined,
        });

        const data = await res.json();
        console.log("ADMIN EXPERIENCES:", data);

        if (!res.ok) {
          throw new Error(data.message || "Error al cargar experiencias");
        }

        setExperiences(Array.isArray(data) ? data : []);
      } catch (error: any) {
        console.error("Error cargando experiencias:", error);
        toastError(error.message || "No se pudieron cargar las experiencias");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [userData]);

  const handleToggleStatus = async (experience: IAdminExperience) => {
    try {
      if (!userData?.token) {
        toastError("No hay sesión activa");
        return;
      }

      setUpdatingId(experience.id);

      const payload = {
        ...experience,
        status: !experience.status,
      };

      const res = await fetch(`${API_URL}/experiences/${experience.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("UPDATE EXPERIENCE:", data);

      if (!res.ok) {
        throw new Error(data.message || "No se pudo actualizar la experiencia");
      }

      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === experience.id
            ? { ...exp, status: !experience.status }
            : exp
        )
      );

      toastSuccess(
        !experience.status
          ? "Experiencia activada"
          : "Experiencia ocultada"
      );
    } catch (error: any) {
      console.error("Error actualizando experiencia:", error);
      toastError(error.message || "No se pudo actualizar la experiencia");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#f7f4ee] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-[#1a3d2b]">
            Gestión de experiencias
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Revisa, oculta o controla las experiencias publicadas por los instructores.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando experiencias...</p>
        ) : experiences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#1a3d2b]">
              No hay experiencias cargadas
            </h2>
            <p className="mt-2 text-gray-500">
              Cuando existan experiencias, van a aparecer acá.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="overflow-hidden rounded-2xl border border-[#ece7df] bg-white shadow-sm"
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={exp.image || "https://via.placeholder.com/400x300"}
                    alt={exp.title}
                    className="h-60 w-full object-cover md:h-auto md:w-64"
                  />

                  <div className="flex-1 p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-[#1a3d2b]">
                          {exp.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {exp.category} · {exp.dificulty}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          exp.status === false
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {exp.status === false ? "Oculta" : "Activa"}
                      </span>
                    </div>

                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                      {exp.description}
                    </p>

                    <div className="mb-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>
                          {exp.location}, {exp.city}, {exp.country}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        <span>${exp.price}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <UserRound size={16} />
                        <span>
                          {exp.instructor?.firstName || "Instructor"}{" "}
                          {exp.instructor?.lastName || ""}
                          {exp.instructor?.email
                            ? ` · ${exp.instructor.email}`
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleToggleStatus(exp)}
                        disabled={updatingId === exp.id}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d9d4cc] px-4 py-2 text-sm font-medium text-[#1a3d2b] transition hover:bg-[#f5f1ea] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <EyeOff size={16} />
                        {updatingId === exp.id
                          ? "Actualizando..."
                          : exp.status === false
                          ? "Mostrar"
                          : "Ocultar"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}