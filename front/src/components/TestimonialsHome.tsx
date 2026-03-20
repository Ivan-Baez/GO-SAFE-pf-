"use client";
import { useState } from 'react';

export default function TestimonialsHome() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Mialgros",
      location: "Colonia del Sacramento, Uruguay",
      avatar: "https://i.pravatar.cc/150?u=1",
      comment: "La travesía en kayak superó mis expectativas. Grupos reducidos y una atención súper personalizada. Es el escape perfecto para desconectar de la ciudad."
    },
    {
      id: 2,
      name: "Lucio Pérez",
      location: "Buenos Aires, Argentina",
      avatar: "https://i.pravatar.cc/150?u=2",
      comment: "La experiencia con el equipo fue increíble. Superaron todas mis expectativas y la atención personalizada marcó la diferencia en mi viaje."
    },
    {
      id: 3,
      name: "Carla Ruiz",
      location: "Santiago, Chile",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=150&h=150",
      comment: "Excelente servicio y mucha profesionalidad. Me sentí seguro en cada paso de la aventura. Sin duda volveré a repetir con ellos pronto."
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20 overflow-hidden">
      <div className="max-w-300[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
        
        {/* --- LADO IZQUIERDO: TÍTULO Y DOTS --- */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mb-4">
              Testimonios
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Comparte Tus <br /> Opiniones.
            </h2>
          </div>

          {/* Dots de navegación */}
          <div className="flex gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-[#2c3e50] scale-110' : 'bg-gray-300'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* --- LADO DERECHO: TARJETA ANIMADA --- */}
        <div className="flex-1 relative w-full max-w-lg">
          {/* Contenedor con altura fija para evitar saltos de layout */}
          <div className="relative h-62.5[250px] w-full">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out bg-white rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50
                  ${activeIndex === index 
                    ? 'opacity-100 translate-y-0 z-10' 
                    : 'opacity-0 translate-y-8 z-0 pointer-events-none'}
                `}
              >
                {/* Avatar flotante */}
                <div className="absolute -top-8 left-10">
                  <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <p className="text-gray-500 leading-relaxed italic text-lg">
                    "{t.comment}"
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{t.name}</h4>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};