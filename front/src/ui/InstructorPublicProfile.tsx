"use client";

import Image from "next/image";
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

export default function InstructorPublicProfile() {
  const instructor = {
    id: "1",
    firstName: "Eugenia",
    lastName: "R.",
    city: "Bariloche",
    country: "Argentina",
    profilePic: "/instructor-demo.jpg",
    role: "instructor",
    rating: 4.9,
    totalReviews: 28,
    verified: true,
    title: "Guía outdoor | Trekking, escalada y experiencias en naturaleza",
    status: "Disponible",
    instructorProfile: {
      about:
        "Soy instructora de actividades outdoor con varios años guiando experiencias en montaña y naturaleza. Me enfoco en que cada persona disfrute la actividad con seguridad, confianza y acompañamiento real.",
      certifications: "Primeros auxilios y seguridad en actividades outdoor.",
      experience: "Más de 5 años guiando salidas de trekking y escalada recreativa.",
      languages: "Español nativo · Inglés intermedio",
      modality: "Presencial",
      availability: "Lunes a viernes de 16:00 a 19:00",
      level: "Inicial a intermedio",
      duration: "2 a 4 horas",
      price: 20,
      specialties: [
        "Trekking para principiantes",
        "Escalada deportiva",
        "Seguridad en montaña",
      ],
      activities: [
        "Trekking en Bariloche",
        "Escalada en roca",
        "Introducción al senderismo",
      ],
      tags: ["Presencial", "Escalada", "Trekking"],
    },
    reviews: [
      {
        id: 1,
        name: "Camila",
        date: "12 Mar 2026",
        text: "Muy clara al explicar, transmite confianza y la experiencia estuvo súper bien organizada.",
        rating: 5,
      },
      {
        id: 2,
        name: "Martín",
        date: "4 Mar 2026",
        text: "La actividad fue excelente. Se notó la experiencia, el cuidado por la seguridad y la buena onda.",
        rating: 5,
      },
      {
        id: 3,
        name: "Sofía",
        date: "28 Feb 2026",
        text: "Me encantó. Ideal si estás empezando y querés sentirte acompañado durante toda la aventura.",
        rating: 5,
      },
    ],
  };

  return (
    <section className="w-full bg-[#f7f4ee]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <Image
                    src={instructor.profilePic}
                    alt={`${instructor.firstName} ${instructor.lastName}`}
                    width={180}
                    height={180}
                    className="rounded-[24px] object-cover w-[180px] h-[180px]"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                    {instructor.verified ? "Instructor verificado" : "Instructor"}
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold text-[#1a3d2b] leading-tight">
                    {instructor.firstName} {instructor.lastName}
                  </h1>

                  <p className="text-lg text-gray-700 mt-2">
                    {instructor.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>
                        {instructor.city}, {instructor.country}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star size={16} className="fill-[#e7b52c] text-[#e7b52c]" />
                      <span>
                        {instructor.rating} · {instructor.totalReviews} reseñas
                      </span>
                    </div>

                    {instructor.verified && (
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} />
                        <span>Perfil aprobado</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {instructor.instructorProfile.tags.map((tag, index) => {
                      const styles = [
                        "bg-[#e8f2ec] text-[#1a3d2b]",
                        "bg-[#fff4d6] text-[#8a6500]",
                        "bg-[#fbe4dd] text-[#c75f46]",
                      ];

                      return (
                        <span
                          key={tag}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${styles[index % styles.length]}`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#1a3d2b] mb-4">
                Sobre mí
              </h2>

              <div className="space-y-4 text-gray-700 leading-7">
                <p>{instructor.instructorProfile.about}</p>
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#1a3d2b] mb-5">
                Actividades que ofrece
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {instructor.instructorProfile.activities.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#ece7df] bg-[#fcfbf8] p-4"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#e8f2ec] flex items-center justify-center mb-3">
                      <Mountain size={18} className="text-[#1a3d2b]" />
                    </div>
                    <h3 className="font-semibold text-[#1a3d2b]">{item}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Experiencia guiada adaptada al nivel del grupo.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#1a3d2b] mb-4">
                  Modalidad y disponibilidad
                </h2>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Clock3 size={18} className="mt-1 text-[#1a3d2b]" />
                    <div>
                      <p className="font-medium">Disponibilidad</p>
                      <p className="text-sm text-gray-600">
                        {instructor.instructorProfile.availability}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-1 text-[#1a3d2b]" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-sm text-gray-600">
                        {instructor.city}, {instructor.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="mt-1 text-[#1a3d2b]" />
                    <div>
                      <p className="font-medium">Modalidad</p>
                      <p className="text-sm text-gray-600">
                        {instructor.instructorProfile.modality}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#1a3d2b] mb-4">
                  Certificaciones y experiencia
                </h2>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Award size={18} className="mt-1 text-[#c75f46]" />
                    <div>
                      <p className="font-medium">Certificación</p>
                      <p className="text-sm text-gray-600">
                        {instructor.instructorProfile.certifications}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-1 text-[#c75f46]" />
                    <div>
                      <p className="font-medium">Experiencia</p>
                      <p className="text-sm text-gray-600">
                        {instructor.instructorProfile.experience}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Languages size={18} className="mt-1 text-[#c75f46]" />
                    <div>
                      <p className="font-medium">Idiomas</p>
                      <p className="text-sm text-gray-600">
                        {instructor.instructorProfile.languages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1a3d2b]">
                    Reseñas de usuarios
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Valoración promedio de las experiencias realizadas.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fff4d6]">
                  <Star size={18} className="fill-[#e7b52c] text-[#e7b52c]" />
                  <span className="font-semibold text-[#1a3d2b]">
                    {instructor.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {instructor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-[#ece7df] p-4 bg-[#fcfbf8]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-[#1a3d2b]">
                        {review.name}
                      </h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-2 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-[#e7b52c] text-[#e7b52c]"
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 leading-6">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#1a3d2b] mb-5">
                Especialidades
              </h2>

              <div className="flex flex-wrap gap-3">
                {instructor.instructorProfile.specialties.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-[#e8f2ec] text-[#1a3d2b] text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:sticky xl:top-6">
            <div className="bg-white rounded-[28px] border border-[#ece7df] shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Desde</p>
                  <h2 className="text-3xl font-bold text-[#1a3d2b]">
                    ${instructor.instructorProfile.price} USD
                  </h2>
                  <p className="text-sm text-gray-600">por experiencia</p>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-[#fbe4dd] text-[#c75f46] text-sm font-medium">
                  {instructor.status}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-[#e7b52c] hover:bg-[#dca91f] text-[#1a1a1a] font-semibold py-3 rounded-2xl transition">
                  Reservar experiencia
                </button>

                <button className="w-full border border-[#1a3d2b] text-[#1a3d2b] hover:bg-[#1a3d2b] hover:text-white font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Enviar mensaje
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[#ece7df] space-y-4 text-sm text-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <span>Modalidad</span>
                  <span className="font-medium text-[#1a3d2b]">
                    {instructor.instructorProfile.modality}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Ubicación</span>
                  <span className="font-medium text-[#1a3d2b]">
                    {instructor.city}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Nivel</span>
                  <span className="font-medium text-[#1a3d2b]">
                    {instructor.instructorProfile.level}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Duración</span>
                  <span className="font-medium text-[#1a3d2b]">
                    {instructor.instructorProfile.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}