"use client";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface StepProps {
  prev: () => void;
}

export default function StepDescription({ prev }: StepProps) {
  const { values } = useFormikContext<any>();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">
      
      <div className="w-full text-left mb-6">
        <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Tu descripción</h2>
        <p className="text-gray-600 text-sm">
          Cuéntale a tus alumnos quién eres, tu experiencia y qué pueden esperar de tus clases.
        </p>
      </div>

      <div className="w-full space-y-6">

        <div className="relative">
          <label className="block font-bold text-[#1e3c31] mb-2 text-base">
            Biografía profesional
          </label>

          <Field
            as="textarea"
            name="bio"
            placeholder="Ej: Soy instructor de paracaidismo con más de 10 años de experiencia..."
            className="w-full h-48 py-4 px-4 resize-none align-top bg-[#f8f8f8] border border-gray-300 rounded-md text-gray-600 italic transition-all mb-1"
          />

          {/* contador */}
          <div className="text-right text-[11px] text-gray-400 mt-1 italic">
            {values.bio?.length || 0} caracteres
          </div>

          <ErrorMessage
            name="bio"
            component="p"
            className="text-xs text-red-500 mt-1"
          />
        </div>

        <div>
          <h4 className="text-[#1e3c31] font-bold text-sm mb-2 uppercase tracking-wider">
            💡 Tips para una buena descripción:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Menciona tus años de experiencia.</li>
            <li>• Qué metodología de enseñanza utilizas.</li>
            <li>• Por qué te apasiona lo que haces.</li>
          </ul>
        </div>

        {/* botones */}
        <div className="flex items-center justify-between gap-4 pt-6">

          <button
            type="button"
            onClick={prev}
            className="text-gray-400 text-sm font-medium hover:underline mt-3"
          >
            Volver al paso anterior
          </button>

          <button
            type="submit"
            className="w-full min-w-[150px] max-w-[280px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
          >
            Continuar
          </button>

        </div>
      </div>
    </div>
  );
}