import Image from 'next/image';

export default function PartnerLogos() {
  const logos = [
    { name: 'Axon', src: '/axon-airlines.svg' },
    { name: 'Jetski', src: 'expedia.svg' },
    { name: 'Expedia', src: 'jet-ski.svg' },
    { name: 'Kia', src: 'kia-motors-1.svg' },
    { name: 'Reebok', src: 'reebok-5.svg' },
  ];

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-4">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className={`
                group relative flex items-center justify-center p-6 transition-all duration-300 rounded-2xl
                /* El efecto de la tarjeta central (Expedia) o al hacer hover */
                ${index === 2 
                  ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] scale-110 z-10' 
                  : 'hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:scale-105'
                }
              `}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`
                  h-10 md:h-12 object-contain transition-all duration-300
                  /* Los logos nacen en gris, el central y el hover tienen color/brillo original */
                  ${index === 2 ? 'grayscale-0' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};