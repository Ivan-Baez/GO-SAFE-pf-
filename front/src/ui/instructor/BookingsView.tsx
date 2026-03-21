"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { mockBookings } from "@/lib/moks/bookings";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";

export interface IBooking {
  id: string;
  studentName: string;
  experienceTitle: string;
  date: string;
  time: string;
}

const USE_MOCK = true;

export default function Bookings() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        if (USE_MOCK) {
          setTimeout(() => {
            setBookings(mockBookings);
            setLoading(false);
          }, 500);
          return;
        }

        // fetch real cuando el back esté listo
      } catch (err) {
        setError("No se pudieron cargar las reservas.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#f5f2eb] py-10 px-6">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Cargando reservas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#f5f2eb] py-10 px-6">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (bookings.length === 0) {
    return (
      <section className="w-full bg-[#f5f2eb] py-10 px-6">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-[#1a3d2b] mb-4">
            Próximas reservas
          </h1>
          <div className="rounded-xl border border-dashed border-gray-300 bg-[#f7efe5] p-8 text-center">
            <p className="text-gray-600">No tenés reservas próximas.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 w-full flex ">
      <InstructorSidebar/>
      <div className="w-full mx-auto px-10 py-10  flex-1">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Agenda
        </p>

        <h1 className="text-2xl font-bold text-[#1a3d2b] mb-6">
          Próximas reservas
        </h1>

        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-gray-200 p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-[#1a3d2b] mb-1">
                {booking.studentName}
              </h2>

              <p className="text-gray-700 mb-3">{booking.experienceTitle}</p>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock3 size={16} />
                <span>
                  {booking.date} - {booking.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}