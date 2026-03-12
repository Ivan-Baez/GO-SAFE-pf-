import Image from 'next/image'; 

export default function InstructorSteps() {
  return (
    <section className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden">
      
      {/* --- COLUMNA IZQUIERDA: CONTENIDO --- */}
      <div className="relative z-10 p-10 md:p-20 flex flex-col justify-center">
        
        {/* Título con el detalle del subrayado */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Trabaja con nosotros y <br />
            <span className="relative inline-block">
              muestra al mundo tu pasión
              {/* El trazo rojo manual */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-1 bg-red-500 rounded-full opacity-80"></span>
            </span>
          </h1>
        </div>

        {/* Pasos (1, 2, 3) */}
        <div className="grid grid-cols-3 gap-4 mb-12 relative">
          {/* Línea gris que conecta los pasos por detrás */}
          <div className="absolute top-12 left-0 w-full h-[2px] bg-gray-200 z-0"></div>

          {/* Paso 1 (Amarillo Fijo) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-24 bg-[#F2C94C] rounded-t-2xl rounded-br-2xl flex items-center justify-center mb-4 shadow-sm">
              <span className="text-4xl font-light text-gray-800">1</span>
            </div>
            <p className="text-center font-bold text-gray-800 text-sm">Registrate</p>
            <p className="text-center text-xs text-gray-500 max-w-[120px]">para crear tu perfil de instructor</p>
          </div>

          {/* Paso 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-24 bg-[#E5E7EB] rounded-t-2xl rounded-br-2xl flex items-center justify-center mb-4">
              <span className="text-4xl font-light text-gray-800">2</span>
            </div>
            <p className="text-center font-bold text-gray-800 text-sm">Revisaremos</p>
            <p className="text-center text-xs text-gray-500 max-w-[120px]">tus certificaciones en un plazo de 5 días</p>
          </div>

          {/* Paso 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-24 bg-[#E5E7EB] rounded-t-2xl rounded-br-2xl flex items-center justify-center mb-4">
              <span className="text-4xl font-light text-gray-800">3</span>
            </div>
            <p className="text-center font-bold text-gray-800 text-sm">Comienza a trabajar</p>
            <p className="text-center text-xs text-gray-500 max-w-[120px]">con nosotros y conecta con personas de todo el mundo</p>
          </div>
        </div>

        {/* Botón */}
        <button className="bg-[#F2C94C] hover:bg-[#e5bc3a] text-gray-800 font-bold py-4 px-8 rounded-xl w-fit transition-all shadow-lg text-sm">
          Registrarme como instructor
        </button>
      </div>

      {/* --- COLUMNA DERECHA: IMAGEN --- */}
      <div className="relative min-h-[100px] lg:min-h-full max-h-[200px]">
        <Image 
          src="/Persona2.png"
          alt="Instructor en el puente"
          fill
          className="object-contain"
        />
      </div>

      {/* --- EL FONDO ONDULADO (SVG descargado) --- */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-20 pointer-events-none">
        <img 
           src="/Decore2.png" 
           alt="Wave background" 
           className="w-full h-full object-fill"
        />
      </div>

    </section>
  );
}