"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";
import {
  CalendarDays,
  Star,
  Wallet,
  MapPin,
  Plus,
  Users,
  Clock3,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface DecodedToken {
  id: string;
  email: string;
  role: "user" | "instructor" | "admin";
}

interface DashboardSummary {
  publishedExperiences: number;
  receivedBookings: number;
  averageRating: number;
  monthlyIncome: number;
}

interface InstructorExperience {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  date: string;
  capacity: number;
  status?: boolean;
}

interface InstructorBooking {
  id: string;
  userName: string;
  date: string;
  experienceTitle: string;
  location: string;
}

export default function InstructorDashboard() {
  const { userData } = useAuth();

  const [summary, setSummary] = useState<DashboardSummary>({
    publishedExperiences: 0,
    receivedBookings: 0,
    averageRating: 0,
    monthlyIncome: 0,
  });

  const [experiences, setExperiences] = useState<InstructorExperience[]>([]);
  const [bookings, setBookings] = useState<InstructorBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!userData?.token) {
          throw new Error("No hay sesión activa");
        }

        const decoded = jwtDecode<DecodedToken>(userData.token);
        const instructorId = decoded.id;

        const [summaryRes, experiencesRes, bookingsRes] = await Promise.allSettled([
          fetch(`${API_URL}/dashboard/instructor/summary`, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }),
          fetch(`${API_URL}/instructors/${instructorId}/experiences`, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }),
          fetch(`${API_URL}/bookings/instructor/${instructorId}`, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }),
        ]);

        // Summary
        if (summaryRes.status === "fulfilled") {
          const response = summaryRes.value;
          const data = await response.json();
          console.log("SUMMARY:", data);

          if (response.ok) {
            setSummary({
              publishedExperiences: data.publishedExperiences ?? 0,
              receivedBookings: data.receivedBookings ?? 0,
              averageRating: data.averageRating ?? 0,
              monthlyIncome: data.monthlyIncome ?? 0,
            });
          }
        }

        // Experiences
        if (experiencesRes.status === "fulfilled") {
          const response = experiencesRes.value;
          const data = await response.json();
          console.log("DASHBOARD EXPERIENCES:", data);

          if (response.ok && Array.isArray(data)) {
            setExperiences(
              data.map((exp: any) => ({
                id: exp.id,
                title: exp.title,
                location: exp.location,
                city: exp.city,
                country: exp.country,
                date: exp.date,
                capacity: exp.capacity,
                status: exp.status,
              }))
            );
          }
        }

        // Bookings
        if (bookingsRes.status === "fulfilled") {
          const response = bookingsRes.value;
          const data = await response.json();
          console.log("DASHBOARD BOOKINGS:", data);

          if (response.ok && Array.isArray(data)) {
            setBookings(
              data.map((booking: any) => ({
                id: booking.id,
                userName: booking.userName,
                date: booking.date,
                experienceTitle: booking.experienceTitle,
                location: booking.location,
              }))
            );
          }
        }
      } catch (err: any) {
        console.error("Error cargando dashboard:", err);
        setError(err.message || "No se pudo cargar el dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userData]);

  if (loading) {
    return (
      <DashboardLayout sidebar={<InstructorSidebar />}>
        <div className="mx-auto w-full flex-1 px-10 py-10">
          <div className="rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
            <p className="text-gray-500">Cargando dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout sidebar={<InstructorSidebar />}>
        <div className="mx-auto w-full flex-1 px-10 py-10">
          <div className="rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebar={<InstructorSidebar />}>
      <div className="mx-auto w-full flex-1 px-10 py-10">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
              Panel del instructor
            </p>
            <h1 className="text-3xl font-bold text-[#1a3d2b] md:text-4xl">
              Gestiona tus experiencias
            </h1>
            <p className="mt-2 text-gray-600">
              Revisa tus reservas, actividades publicadas y el estado de tu perfil.
            </p>
          </div>

          <Link
            href="/instructor/dashboard/experiences/create"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e7b52c] px-5 py-3 font-semibold text-[#1a1a1a] shadow-sm transition hover:bg-[#dca91f] md:w-auto"
          >
            <Plus size={18} />
            Crear experiencia
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#1a3d2b]">
              Perfil de instructor
            </h2>
            <p className="mt-1 text-gray-600">
              Tu perfil está{" "}
              <span className="font-semibold text-[#1a3d2b]">aprobado</span> y visible
              para los usuarios.
            </p>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            icon={MapPin}
            title="Experiencias publicadas"
            value={summary.publishedExperiences}
            iconWrapperClassName="bg-[#f2c24d]/20"
            iconClassName="text-[#c58a00]"
          />
          <DashboardStatCard
            icon={Users}
            title="Reservas recibidas"
            value={summary.receivedBookings}
            iconWrapperClassName="bg-[#df6d51]/15"
            iconClassName="text-[#df6d51]"
          />
          <DashboardStatCard
            icon={Star}
            title="Valoración promedio"
            value={summary.averageRating}
            iconWrapperClassName="bg-[#1a3d2b]/10"
            iconClassName="text-[#1a3d2b]"
          />
          <DashboardStatCard
            icon={Wallet}
            title="Ingresos del mes"
            value={`$${summary.monthlyIncome}`}
            iconWrapperClassName="bg-[#f2c24d]/20"
            iconClassName="text-[#c58a00]"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="mb-10 rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  Actividades
                </p>
                <h2 className="text-2xl font-bold text-[#1a3d2b]">
                  Mis experiencias
                </h2>
              </div>

              <Link
                href="/instructor/dashboard/experiences"
                className="text-sm font-medium text-[#1a3d2b] hover:underline"
              >
                Ver todas
              </Link>
            </div>

            <div className="space-y-4">
              {experiences.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f7efe5] p-8 text-center">
                  <p className="text-gray-600">Todavía no creaste experiencias.</p>
                </div>
              ) : (
                experiences.slice(0, 3).map((exp) => (
                  <div
                    key={exp.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#ece7df] p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-[#1a3d2b]">
                        {exp.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={15} />
                        <span>
                          {exp.location}, {exp.city}, {exp.country}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays size={15} />
                        <span>{exp.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          exp.status === false
                            ? "bg-red-100 text-red-700"
                            : "bg-[#e8f2ec] text-[#1a3d2b]"
                        }`}
                      >
                        {exp.status === false ? "Oculta" : "Activa"}
                      </span>
                      <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-sm text-gray-700">
                        {exp.capacity} cupos
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mb-10 rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
              Agenda
            </p>
            <h2 className="mb-5 text-2xl font-bold text-[#1a3d2b]">
              Próximas reservas
            </h2>

            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f7efe5] p-8 text-center">
                  <p className="text-gray-600">No tenés reservas próximas.</p>
                </div>
              ) : (
                bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-[#ece7df] p-4"
                  >
                    <h3 className="font-semibold text-[#1a3d2b]">
                      {booking.userName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {booking.experienceTitle}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 size={15} />
                      <span>{booking.date}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={15} />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}