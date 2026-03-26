"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import InstructorExperienceCard from "@/components/dashboard/InstructorExperienceCard";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface DecodedToken {
  id: string;
  email: string;
  role: "user" | "instructor" | "admin";
}

interface BackendExperience {
  id: string;
  date: string;
  country: string;
  city: string;
  title: string;
  location: string;
  description: string;
  price: number;
  capacity: number;
  ageRange: string;
  dificulty: string;
  category: string;
  duration: string;
  image?: string;
  imageUrl?: string;
  instructorId?: string;
}

export interface IInstructorExperience {
  id: string;
  date: string;
  country: string;
  city: string;
  title: string;
  location: string;
  description: string;
  price: number;
  capacity: number;
  ageRange: string;
  difficulty: string;
  category: string;
  duration: string;
  image: string;
  instructorID: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function InstructorExperiences() {
  const { userData } = useAuth();

  const [experiences, setExperiences] = useState<IInstructorExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        if (!userData?.token) {
          throw new Error("No se encontró la sesión del instructor.");
        }

        const decoded = jwtDecode<DecodedToken>(userData.token);
        const instructorId = decoded.id;

        const response = await fetch(
          `${API_URL}/instructors/${instructorId}/experiences`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        const data = await response.json();
        console.log("INSTRUCTOR EXPERIENCES:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "No se pudieron cargar tus experiencias."
          );
        }

        const normalizedData: IInstructorExperience[] = Array.isArray(data)
          ? data.map((exp: BackendExperience) => ({
              id: exp.id,
              date: exp.date,
              country: exp.country,
              city: exp.city,
              title: exp.title,
              location: exp.location,
              description: exp.description,
              price: Number(exp.price),
              capacity: Number(exp.capacity),
              ageRange: exp.ageRange,
              difficulty: exp.dificulty,
              category: exp.category,
              duration: exp.duration,
              image:
                exp.image ||
                exp.imageUrl ||
                "https://via.placeholder.com/400x250",
              instructorID: exp.instructorId || instructorId,
            }))
          : [];

        setExperiences(normalizedData);
      } catch (err: any) {
        console.error("Error cargando experiencias:", err);
        setError(
          err.message || "Ocurrió un error al cargar las experiencias."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [userData]);

  if (loading) {
    return (
      <DashboardLayout sidebar={<InstructorSidebar />}>
        <section className="w-full bg-[#f5f2eb] px-6 py-10">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
            <h1 className="mb-6 text-2xl font-bold text-[#1a3d2b]">
              Mis experiencias
            </h1>
            <p className="text-gray-500">Cargando experiencias...</p>
          </div>
        </section>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout sidebar={<InstructorSidebar />}>
        <section className="w-full bg-[#f5f2eb] px-6 py-10">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
            <h1 className="mb-6 text-2xl font-bold text-[#1a3d2b]">
              Mis experiencias
            </h1>
            <p className="text-red-500">{error}</p>
          </div>
        </section>
      </DashboardLayout>
    );
  }

  if (experiences.length === 0) {
    return (
      <DashboardLayout sidebar={<InstructorSidebar />}>
        <section className="min-h-screen w-full bg-gray-50 p-10">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
            <h1 className="mb-6 text-2xl font-bold text-[#1a3d2b]">
              Mis experiencias
            </h1>

            <div className="rounded-xl border border-dashed border-gray-300 bg-[#f7efe5] p-8 text-center">
              <h2 className="mb-2 text-lg font-semibold text-[#1a3d2b]">
                Todavía no creaste experiencias
              </h2>
              <p className="text-sm text-gray-600">
                Cuando publiques una experiencia, va a aparecer acá para que
                puedas verla y editarla.
              </p>
            </div>
          </div>
        </section>
      </DashboardLayout>
    );
  }

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <DashboardLayout sidebar={<InstructorSidebar />}>
      <div className="mx-auto max-w-6xl flex-1 px-10 py-10">
        <div className="mb-8 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#1a3d2b]">
            Mis experiencias
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.map((experience) => (
            <InstructorExperienceCard
              key={experience.id}
              id={experience.id}
              date={experience.date}
              country={experience.country}
              city={experience.city}
              title={experience.title}
              location={experience.location}
              description={experience.description}
              price={experience.price}
              capacity={experience.capacity}
              ageRange={experience.ageRange}
              difficulty={experience.difficulty}
              category={experience.category}
              duration={Number(experience.duration)}
              image={experience.image}
              instructorID={experience.instructorID}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}