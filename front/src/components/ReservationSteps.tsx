import { Compass, Users, Calendar, MapPin, Heart, Leaf } from 'lucide-react'; // Usando lucide-react para los iconos

const ReservationSteps = () => {
  return (
    <section className="relative bg-white p-12 md:p-20 flex flex-col md:flex-row items-center gap-4 overflow-hidden ">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-4">
      {/* --- DECORACIONES DE LAS ESQUINAS (Las que hicimos antes) --- */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-[#D6755B] rounded-br-3xl -translate-x-4 -translate-y-4" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#D6755B] rounded-tl-3xl translate-x-4 translate-y-4" />

      {/* --- PARTE IZQUIERDA: TEXTO Y PASOS --- */}
      <div className="flex-1 space-y-8">
        <div>
          <p className="text-gray-500 font-medium mb-2">Fácil y Rápido</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Reserva Tu Próxima <br /> Aventura En 3 Simples Pasos
          </h2>
        </div>

        <div className="space-y-6">
          {/* Paso 1 */}
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 p-3 rounded-xl text-white">
              <Compass size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-700">Elije tu aventura</h4>
              <p className="text-gray-500 text-sm max-w-xs">Explora nuestra selección de deportes extremos, desde escalada en roca hasta kayak en aguas cristalinas.</p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 p-3 rounded-xl text-white">
              <Users size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-700">Encuentra tu instructor</h4>
              <p className="text-gray-500 text-sm max-w-xs">Conecta con guías certificados y expertos locales que garantizan tu seguridad y aprendizaje en cada paso.</p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="flex items-start gap-4">
            <div className="bg-teal-800 p-3 rounded-xl text-white">
              <Calendar size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-700">Selecciona una fecha</h4>
              <p className="text-gray-500 text-sm max-w-xs">Reserva el día que mejor te quede y prepárate para vivir una experiencia inolvidable en la naturaleza.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PARTE DERECHA: CARD DE VISTA PREVIA --- */}
      <div className="flex-1 flex justify-center relative">
        {/* Glow de fondo (el circulo azulado suave) */}
        <div className="absolute inset-0 bg-blue-100 blur-[100px] rounded-full opacity-50" />
        
        <div className="relative bg-white rounded-[2rem] shadow-2xl p-5 max-w-sm w-full z-10 border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=600" 
            alt="Escalada"
            className="rounded-3xl w-full h-48 object-cover mb-4"
          />
          
          <h3 className="text-xl font-bold text-gray-800 mb-1">Escalada con Rita</h3>
          <p className="text-gray-500 text-sm mb-4">14-29 Junio | por Robbin Joseph</p>
          
          <div className="flex gap-3 mb-6">
            <div className="bg-gray-100 p-2 rounded-full text-gray-600"><Leaf size={18} /></div>
            <div className="bg-gray-100 p-2 rounded-full text-gray-600"><MapPin size={18} /></div>
            <div className="bg-gray-100 p-2 rounded-full text-gray-600"><Compass size={18} /></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-500">
              <Users size={20} />
              <span className="text-sm font-medium">24 personas asistirán</span>
            </div>
            <Heart className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ReservationSteps;