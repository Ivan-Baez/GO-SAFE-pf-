import ExperienceCard from "@/components/ExperienceCard";
import { getExperiencesCatalog } from "@/service/productService";

export default async function ExperiencesPage() {
  const fallbackExperiences: Array<{
    id: string | number;
    title: string;
    difficulty: string;
    price: number;
    location: string;
  }> = [
    {
      id: "demo-1",
      title: "Climbing en Suesca",
      difficulty: "Intermedio",
      price: 80,
      location: "Suesca, Colombia",
    },
    {
      id: "demo-2",
      title: "Escalada en El Peñol",
      difficulty: "Avanzado",
      price: 120,
      location: "Guatape, Colombia",
    },
    {
      id: "demo-3",
      title: "Climbing en La Mojarra",
      difficulty: "Principiante",
      price: 60,
      location: "Santander, Colombia",
    },
  ];

  let usingFallback = false;
  let experiences: Array<{
    id: string | number;
    title: string;
    difficulty: string;
    price: number;
    location: string;
  }> = [];

  try {
    const catalog = await getExperiencesCatalog();
    experiences = catalog.length > 0 ? catalog : fallbackExperiences;
    usingFallback = catalog.length === 0;
  } catch {
    experiences = fallbackExperiences;
    usingFallback = true;
  }

  return (
    <div className="min-h-screen bg-green-900 p-10">
      <h1 className="text-3xl font-bold text-white mb-8">
        Experiencias de todas las categorias
      </h1>

      {usingFallback && (
        <p className="mb-6 rounded-lg bg-white/10 p-4 text-sm text-white">
          Mostrando experiencias de ejemplo mientras se cargan las reales.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}