"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExperiencesPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category'); // Esto captura "Climbing" de la URL
  
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Aquí harías el fetch a tu backend
    const fetchExperiences = async () => {
      const response = await fetch('http://localhost:3000/experiences');
      const data = await response.json();
      
      // Si hay un filtro, filtramos el array que viene del back
      if (categoryFilter) {
        setExperiences(data.filter((exp: any) => exp.category === categoryFilter));
      } else {
        setExperiences(data);
      }
    };

    fetchExperiences();
  }, [categoryFilter]); // Se vuelve a ejecutar si cambias de categoría

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {categoryFilter ? `Experiences: ${categoryFilter}` : 'All Experiences'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiences.map((exp: any) => (
          <div key={exp.id}>
            {/* Aquí usas el componente <Card /> de tu compañero */}
            <p>{exp.title}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}