import Link from 'next/link';
import ExperienceCard from '@/components/dashboard/InstructorExperienceCard';
import { getExperiencesByCategory, ExperienceCatalogItem } from '@/service/productService';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categorySlug = decodeURIComponent(category);

  let filteredExperiences: ExperienceCatalogItem[] = [];

  try {
    filteredExperiences = await getExperiencesByCategory(categorySlug);
  } catch {
    filteredExperiences = [];
  }

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen bg-gray-50/50">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
          {categorySlug} Adventures
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          {filteredExperiences.length} experiencias encontradas para esta categoria.
        </p>
        <Link
          href="/experiences"
          className="mt-5 inline-block rounded-lg bg-[#EAB308] px-5 py-2 font-semibold text-black transition hover:bg-[#CA8A04]"
        >
          Ver todas las experiencias
        </Link>
      </header>
      
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-4xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">🏜️</div>
          <h3 className="text-xl font-semibold text-gray-700">Ups! No hay nada por aquí</h3>
          <p className="text-gray-500">Todavia no tenemos actividades en {categorySlug}.</p>
        </div>
      )}
    </div>
  );
}