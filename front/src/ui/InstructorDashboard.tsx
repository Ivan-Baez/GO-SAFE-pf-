"use client";

import InstructorSidebar from "../components/dashboard/InstructorSidebar";
import { CalendarDays, Star, Wallet, MapPin, Plus, Users, Clock3 } from "lucide-react";
import Link from "next/link";

export default function InstructorDashboard() {
  const experiences = [
    {
      id: 1,
      title: "Escalada en roca",
      place: "Bariloche, Argentina",
      date: "20 Mar - 22 Mar",
      students: 8,
      status: "Activa",
    },
    {
      id: 2,
      title: "Trekking de montaña",
      place: "Mendoza, Argentina",
      date: "28 Mar - 30 Mar",
      students: 12,
      status: "Activa",
    },
  ];

  const bookings = [
    {
      id: 1,
      user: "Camila López",
      experience: "Escalada en roca",
      date: "20 Mar - 10:00",
    },
    {
      id: 2,
      user: "Martín Pérez",
      experience: "Trekking de montaña",
      date: "28 Mar - 09:30",
    },
    {
      id: 3,
      user: "Sofía Ramos",
      experience: "Escalada en roca",
      date: "22 Mar - 15:00",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 w-full flex ">
        <InstructorSidebar />

      <div className="w-full mx-auto px-10 py-10  flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
              Panel del instructor
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a3d2b]">
              Gestiona tus experiencias
            </h1>
            <p className="text-gray-600 mt-2">
              Revisa tus reservas, actividades publicadas y el estado de tu perfil.
            </p>
          </div>

          <Link
            href="/dashboard/experiences/create"
            className="flex items-center justify-center gap-2 bg-[#e7b52c] hover:bg-[#dca91f] text-[#1a1a1a] font-semibold px-5 py-3 rounded-xl shadow-sm transition w-full md:w-auto"
          >
            <Plus size={18} />
            Crear experiencia
          </Link>
        </div>

        {/* Estado perfil */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#ece7df] p-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[#1a3d2b]">
              Perfil de instructor
            </h2>
            <p className="text-gray-600 mt-1">
              Tu perfil está <span className="font-semibold text-[#1a3d2b]">aprobado</span> y visible para los usuarios.
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl border border-[#1a3d2b] text-[#1a3d2b] hover:bg-[#1a3d2b] hover:text-white transition font-medium w-full md:w-auto">
            Editar perfil
          </button>
        </div>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ece7df]">
            <div className="w-11 h-11 rounded-2xl bg-[#f2c24d]/20 flex items-center justify-center mb-4">
              <MapPin size={20} className="text-[#c58a00]" />
            </div>
            <p className="text-sm text-gray-500">Experiencias publicadas</p>
            <h3 className="text-3xl font-bold text-[#1a3d2b] mt-1">6</h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ece7df]">
            <div className="w-11 h-11 rounded-2xl bg-[#df6d51]/15 flex items-center justify-center mb-4">
              <Users size={20} className="text-[#df6d51]" />
            </div>
            <p className="text-sm text-gray-500">Reservas recibidas</p>
            <h3 className="text-3xl font-bold text-[#1a3d2b] mt-1">24</h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ece7df]">
            <div className="w-11 h-11 rounded-2xl bg-[#1a3d2b]/10 flex items-center justify-center mb-4">
              <Star size={20} className="text-[#1a3d2b]" />
            </div>
            <p className="text-sm text-gray-500">Valoración promedio</p>
            <h3 className="text-3xl font-bold text-[#1a3d2b] mt-1">4.8</h3>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#ece7df]">
            <div className="w-11 h-11 rounded-2xl bg-[#f2c24d]/20 flex items-center justify-center mb-4">
              <Wallet size={20} className="text-[#c58a00]" />
            </div>
            <p className="text-sm text-gray-500">Ingresos del mes</p>
            <h3 className="text-3xl font-bold text-[#1a3d2b] mt-1">$480</h3>
          </div>
        </div>

        {/* Secciones */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
          {/* Mis experiencias */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-[#ece7df] mb-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  Actividades
                </p>
                <h2 className="text-2xl font-bold text-[#1a3d2b]">
                  Mis experiencias
                </h2>
              </div>

              <button className="text-sm font-medium text-[#1a3d2b] hover:underline">
                Ver todas
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border border-[#ece7df] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a3d2b]">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MapPin size={15} />
                      <span>{exp.place}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <CalendarDays size={15} />
                      <span>{exp.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#e8f2ec] text-[#1a3d2b] text-sm font-medium">
                      {exp.status}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#f7f4ee] text-gray-700 text-sm">
                      {exp.students} alumnos
                    </span>
                    <button className="px-4 py-2 rounded-xl border border-[#1a3d2b] text-[#1a3d2b] hover:bg-[#1a3d2b] hover:text-white transition text-sm">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximas reservas */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ece7df] mb-10">
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
              Agenda
            </p>
            <h2 className="text-2xl font-bold text-[#1a3d2b] mb-5">
              Próximas reservas
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-[#ece7df] p-4"
                >
                  <h3 className="font-semibold text-[#1a3d2b]">
                    {booking.user}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.experience}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Clock3 size={15} />
                    <span>{booking.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}