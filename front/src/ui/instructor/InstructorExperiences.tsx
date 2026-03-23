"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import ExperienceCard from "@/components/dashboard/InstructorExperienceCard";
import { mockExperiences } from "@/lib/moks/experiences";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";

interface DecodedToken {
  id: string;
  email: string;
  role: "user" | "instructor" | "admin";
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
  duration: number;
  image: string;
  instructorID: string;
}

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const USE_MOCK = true;

export default function InstructorExperiences() {
  //const { userData } = useAuth();

  const [experiences, setExperiences] = useState<IInstructorExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //useEffect para mock
  useEffect(() => {
  const fetchExperiences = async () => {
    try {
      setLoading(true);

      if (USE_MOCK) {
  setTimeout(() => {
    setError(""); // 👈 importante
    setExperiences(mockExperiences);
    setLoading(false);
  }, 500);
  return;
}

      // fetch real (cuando exista)
    } catch (err) {
      setError("Error");
    }
  };

  fetchExperiences();
}, []);

//useEffect real
//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         if (!userData?.token) {
//           throw new Error("No se encontró la sesión del instructor.");
//         }

//         const decoded = jwtDecode<DecodedToken>(userData.token);
//         const instructorId = decoded.id;

//         const response = await fetch(
//           `${API_URL}/experiences/instructor/${instructorId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${userData.token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("No se pudieron cargar tus experiencias.");
//         }

//         const data = await response.json();

//         // Por si el back devuelve null o algo raro
//         setExperiences(Array.isArray(data) ? data : []);
//       } catch (err: any) {
//         setError(err.message || "Ocurrió un error al cargar las experiencias.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, [userData]);

  if (loading) {
    return (
      <section className="w-full bg-[#f5f2eb] py-10 px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-[#1a3d2b] mb-6">
            Mis experiencias
          </h1>
          <p className="text-gray-500">Cargando experiencias...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#f5f2eb] py-10 px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-[#1a3d2b] mb-6">
            Mis experiencias
          </h1>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 w-full flex">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-[#1a3d2b] mb-6">
            Mis experiencias
          </h1>

          <div className="rounded-xl border border-dashed border-gray-300 bg-[#f7efe5] p-8 text-center">
            <h2 className="text-lg font-semibold text-[#1a3d2b] mb-2">
              Todavía no creaste experiencias
            </h2>
            <p className="text-sm text-gray-600">
              Cuando publiques una experiencia, va a aparecer acá para que puedas
              verla y editarla.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const handleDelete = (id: string) => {
  setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-50 w-full flex">
       <InstructorSidebar />
      
      <div className="max-w-6xl mx-auto flex-1 px-10 py-10">
        <div className="mb-8 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#1a3d2b]">
            Mis experiencias
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.map((experience) => (
            <ExperienceCard
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
              duration={experience.duration}
              image={experience.image}
              instructorID={experience.instructorID}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}