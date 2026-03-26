"use client";

import { useEffect, useState } from "react";
import { Clock3, MapPin } from "lucide-react";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface DecodedToken {
  id: string;
}

export interface IBooking {
  id: string;
  userName: string;
  date: string;
  experienceTitle: string;
  location: string;
}

export default function Bookings() {
  const { userData } = useAuth();

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        if (!userData?.token) {
          throw new Error("No hay sesión activa");
        }

        const decoded = jwtDecode<DecodedToken>(userData.token);
        const instructorId = decoded.id;

        const res = await fetch(
          `${API_URL}/bookings/instructor/${instructorId}`, // ajustar si el endpoint final cambia
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        const data = await res.json();
        console.log("BOOKINGS:", data);

        if (!res.ok) {
          throw new Error(data.message || "Error al cargar reservas");
        }

        const normalizedBookings: IBooking[] = Array.isArray(data)
          ? data.map((booking: any) => ({
              id: booking.id,
              userName: booking.userName,
              date: booking.date,
              experienceTitle: booking.experienceTitle,
              location: booking.location,
            }))
          : [];

        setBookings(normalizedBookings);
      } catch (err: any) {
        console.error("Error cargando reservas:", err);
        setError(err.message || "No se pudieron cargar las reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userData]);

  if (loading) {
    return (
      <section className="w-full bg-[#f5f2eb] px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Cargando reservas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#f5f2eb] px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (bookings.length === 0) {
    return (
      <section className="min-h-screen w-full bg-gray-50 flex">
        <InstructorSidebar />
        <div className="w-full flex-1 px-10 py-10">
          <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
            <h1 className="mb-4 text-2xl font-bold text-[#1a3d2b]">
              Próximas reservas
            </h1>
            <div className="rounded-xl border border-dashed border-gray-300 bg-[#f7efe5] p-8 text-center">
              <p className="text-gray-600">No tenés reservas próximas.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-gray-50 flex">
      <InstructorSidebar />
      <div className="w-full flex-1 px-10 py-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
          <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
            Agenda
          </p>

          <h1 className="mb-6 text-2xl font-bold text-[#1a3d2b]">
            Próximas reservas
          </h1>

          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-gray-200 p-4 shadow-sm"
              >
                <h2 className="mb-1 text-xl font-semibold text-[#1a3d2b]">
                  {booking.userName}
                </h2>

                <p className="mb-2 text-gray-700">{booking.experienceTitle}</p>

                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <Clock3 size={16} />
                  <span>{booking.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  <span>{booking.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}