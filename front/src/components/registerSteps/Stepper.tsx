"use client";
import { Check } from "lucide-react"; // O cualquier librería de iconos que uses

const steps = [
  "Datos personales",
  "Foto",
  //"Certificación",
  "Educación",
  "Descripción",
];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full bg-[#f3f3f3] py-4 px-2 mb-8 overflow-x-auto">
      <div className="flex items-center justify-center min-w-max gap-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={label} className="flex items-center gap-2">
              {/* Cuadrado del número o check */}
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-300 font-bold text-sm
                ${isCompleted || isActive ? "bg-[#333333] text-white" : "bg-[#c4c4c4] text-white"}`}
              >
                {isCompleted ? <Check size={18} /> : stepNumber}
              </div>

              {/* Etiqueta del texto */}
              <span className={`text-xs ${isActive ? "text-black font-semibold" : "text-gray-500"}`}>
                {label}
              </span>

              {/* Flechita separadora (no se muestra en el último) */}
              {index < steps.length - 1 && (
                <span className="text-gray-400 mx-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}