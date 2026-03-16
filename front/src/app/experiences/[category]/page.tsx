"use client";
import { useParams } from 'next/navigation';
import ExperienceCard from '@/components/ExperienceCard';
import { EXPERIENCES } from "@/lib/experiencesHard"; // Importación nombrada

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string; 

  // Filtrado de los datos hardcodeados directamente en el render
  const filteredExperiences = EXPERIENCES.filter((exp) => 
    exp.category.toLowerCase() === categorySlug.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen bg-gray-50/50">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
          {categorySlug} Adventures
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          {filteredExperiences.length} experiences found for this category.
        </p>
      </header>
      
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[32px] shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">🏜️</div>
          <h3 className="text-xl font-semibold text-gray-700">Ups! No hay nada por aquí</h3>
          <p className="text-gray-500">Todavía no tenemos actividades en {categorySlug}.</p>
        </div>
      )}
    </div>
  );
}