"use client";
import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulamos una llamada al backend
    setTimeout(() => {
      console.log("Email enviado a GoSafe:", email);
      setStatus('success');
      setEmail('');
      
      // Resetear mensaje de éxito después de 3 segundos
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto bg-gray-100 rounded-[2rem] p-10 md:p-20 relative overflow-hidden">
        
        {/* --- CONTENIDO --- */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-600 max-w-2xl leading-relaxed mb-10">
            Suscríbete para recibir información, últimas noticias y otras 
            ofertas interesantes de GoSafe
          </h2>

          <form 
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl"
          >
            {/* Input con Icono */}
            <div className="relative w-full flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-white py-4 pl-12 pr-4 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D6755B] transition-all"
                disabled={status === 'loading'}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-10 py-4 rounded-xl text-white font-medium transition-all w-full md:w-auto
                ${status === 'loading' ? 'bg-gray-400' : 'bg-[#D6755B] hover:bg-[#c4644b] active:scale-95'}
              `}
            >
              {status === 'loading' ? 'Enviando...' : 'Subscribe'}
            </button>
          </form>

          {/* Mensajes de Feedback */}
          {status === 'success' && (
            <p className="mt-4 text-green-600 font-medium animate-bounce">
              ¡Gracias por suscribirte!
            </p>
          )}
        </div>

        {/* --- DECORACIÓN (Opcional, imitando el estilo de tu imagen anterior) --- */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-200/50 rounded-tl-full -z-0" />
      </div>
    </section>
  );
};