"use client";
import { Field, useFormikContext } from "formik";

interface StepProps {
  prev: () => void;
}

const daysOfWeek = [
  { label: "L", value: "lunes" },
  { label: "M", value: "martes" },
  { label: "M", value: "miercoles" },
  { label: "J", value: "jueves" },
  { label: "V", value: "viernes" },
  { label: "S", value: "sabado" },
  { label: "D", value: "domingo" },
];

const hours = Array.from({ length: 24 }, (_, i) =>
  `${i.toString().padStart(2, "0")}:00`
);

export default function StepAvailability({ prev }: StepProps) {

  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">
      
      <div className="w-full text-left mb-6">
        <h2 className="text-2xl font-bold text-[#1e3c31]">Disponibilidad</h2>
        <p className="text-gray-600 text-sm">
          ¿En qué días y horarios ofreces tus servicios?
        </p>
      </div>

      <div className="w-full space-y-8">

        {/* Días */}
        <div className="space-y-3">
          <label className="block font-bold text-[#1e3c31] text-sm">
            Días de la semana
          </label>

          <div className="flex justify-between">
            {daysOfWeek.map((day, index) => {
              const isSelected = values.selectedDays?.includes(day.value);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const nextDays = isSelected
                      ? values.selectedDays.filter((d: string) => d !== day.value)
                      : [...values.selectedDays, day.value];

                    setFieldValue("selectedDays", nextDays);
                  }}
                  className={`w-10 h-10 rounded-full font-bold transition-all border-2 ${
                    isSelected
                      ? "bg-[#1e3c31] text-white border-[#1e3c31]"
                      : "bg-white text-gray-400 border-gray-200 hover:border-[#f0ba3c]"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-gray-400 italic">
            Toca para seleccionar/deseleccionar los días.
          </p>
        </div>

        {/* Horario */}
        <div className="space-y-4">
          <label className="block font-bold text-[#1e3c31] text-sm">
            Rango horario general
          </label>

          <div className="flex items-center gap-4">

            <div className="flex-1 relative">
              <Field
                as="select"
                name="startTime"
                className="inputStyles w-full appearance-none"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </Field>

              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            <span className="text-[#1e3c31] font-bold">a</span>

            <div className="flex-1 relative">
              <Field
                as="select"
                name="endTime"
                className="inputStyles w-full appearance-none"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </Field>

              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

          </div>
        </div>

        {/* Botones */}
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