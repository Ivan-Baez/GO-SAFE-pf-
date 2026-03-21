"use client";

import { MapPin, CalendarDays, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExperienceCardProps {
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
  onDelete?: (id: string) => void;
}

export default function InstructorExperienceCard({
  id,
  date,
  country,
  city,
  title,
  location,
  price,
  capacity,
  difficulty,
  image,
  onDelete
}: ExperienceCardProps) {
  const router = useRouter();

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition">
      <div className="flex gap-4 items-center">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-28 h-20 object-cover rounded-xl"
          />
        )}

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-[#1a3d2b]">{title}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} />
            <span>{location}</span>
          </div>

          <div className="text-sm text-gray-500">
            {city}, {country}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={16} />
            <span>{date}</span>
          </div>

          <p className="text-sm font-semibold text-[#1a3d2b] mt-1">
            ${price}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {difficulty}
        </span>

        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
          <Users size={14} />
          {capacity} alumnos
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(id); // ejecuta delete
          }}
          className="border border-red-300 text-red-600 px-4 py-1 rounded-full text-sm hover:bg-red-50 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}