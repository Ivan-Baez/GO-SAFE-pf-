"use client";
import { CATEGORIES } from '@/lib/categoriesHome';
import { useRouter } from 'next/navigation';

export default function CategoriesHome() {
  const router = useRouter();

  // Recibe el slug (ej: 'Training', 'Kayak')
  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/experiences/${categorySlug}`);
  };

  return (
    <section className="py-12 bg-white text-center relative overflow-hidden">
      {/* Decoraciones */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-[#D6755B] rounded-br-3xl -translate-x-4 -translate-y-4" />
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#D6755B] rounded-bl-3xl translate-x-4 -translate-y-4" />

      <header className="mb-10">
        <span className="text-gray-400 uppercase tracking-widest text-sm font-semibold">Categories</span>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">Our Services</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="flex items-center justify-start gap-4 px-8 py-4 border border-gray-200 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 group active:scale-95"
            >
              <span className="group-hover:scale-110 transition-transform flex items-center justify-center">
                <IconComponent size={24} className="text-gray-700" />
              </span>
              <span className="text-lg font-medium text-gray-700">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Botón Ver más: lleva a todas las experiencias sin filtro */}
      <button 
        onClick={() => router.push('/experiences')}
        className="mt-12 px-10 py-3 bg-[#EAB308] text-black font-semibold rounded-lg hover:bg-[#CA8A04] transition-colors"
      >
        Ver más
      </button>

      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#D6755B] rounded-tr-3xl -translate-x-4 translate-y-4" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#D6755B] rounded-tl-3xl translate-x-4 translate-y-4" />
    </section>
  );
}