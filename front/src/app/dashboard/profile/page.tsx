"use client";

import { IInstructor } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getInstructorById } from "@/service/authService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";

import {
  MapPin,
  Star,
  CalendarDays,
  ShieldCheck,
  Clock3,
  Award,
  Languages,
  Mountain,
  MessageCircle,
} from "lucide-react";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export default function InstructorProfile() {
   const { userData } = useAuth();
  const [instructor, setInstructor] = useState<IInstructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        if (!userData?.token) {
          setLoading(false);
          return;
        }

        const decoded = jwtDecode<DecodedToken>(userData.token);
        const data = await getInstructorById(decoded.id, userData.token);

        console.log("RESPUESTA INSTRUCTOR:", data);
        setInstructor(data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [userData]);

  if (loading) return <p className="p-6">Cargando perfil...</p>;

  if (!instructor) return <p className="p-6">No hay datos del instructor</p>;

  return (
    <section className="w-full bg-[#f7f4ee]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Image
                  src={instructor.profilePic || "/default.jpg"}
                  alt="Instructor"
                  width={180}
                  height={180}
                  className="rounded-[24px] object-cover w-[180px] h-[180px]"
                />

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-[#1a3d2b]">
                    {instructor.firstName} {instructor.lastName}
                  </h1>

                  <p className="text-gray-600 mt-2">
                    {instructor.city}, {instructor.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-6">
              <h2 className="text-xl font-bold mb-3">Sobre mí</h2>
              <p>{instructor.instructorProfile?.about}</p>
            </div>

            <div className="bg-white rounded-[28px] p-6">
              <h2 className="text-xl font-bold mb-3">Actividades</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {instructor.instructorProfile?.activities?.map((act) => (
                  <div key={act} className="p-4 border rounded-xl">
                    <Mountain size={18} />
                    <p>{act}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[28px] p-6">
              <h2 className="text-xl font-bold mb-3">Reseñas</h2>

              {instructor.reviews?.length === 0 ? (
                <p>No hay reseñas aún</p>
              ) : (
                instructor.reviews?.map((r) => (
                  <div key={r.id} className="border p-3 rounded mb-2">
                    <p>{r.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-[28px] p-6">
              <h2 className="text-xl font-bold">
                ${instructor.instructorProfile?.price}
              </h2>

              <button className="w-full mt-4 bg-[#e7b52c] py-3 rounded-xl">
                Editar perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}