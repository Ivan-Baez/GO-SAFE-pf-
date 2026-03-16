"use client";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface StepProps {
  next: () => void;
  prev: () => void;
}

export default function StepPricing({ prev }: StepProps) {
  // Ya no necesitamos router ni handleFinish aquí, 
  // porque el envío lo maneja el padre (RegisterInstructorView)
  const { isSubmitting } = useFormikContext<any>();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">

      <div className="w-full text-left mb-8">
        <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Precios</h2>
        <p className="text-gray-600 text-sm">
          Define cuánto quieres cobrar por tus servicios. Recuerda que puedes modificar esto más adelante.
        </p>
      </div>

      <div className="w-full space-y-8">

        {/* Precio */}
        <div className="space-y-4">
          <label className="block font-bold text-[#1e3c31] text-sm">
            Valor de tu hora de clase
          </label>

          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400 font-bold">
              $
            </div>

            <Field
              name="pricePerHour"
              type="number"
              placeholder="0.00"
              className="inputStyles w-full pl-10 text-xl font-semibold"
            />

            <div className="absolute right-4">
              <Field
                as="select"
                name="currency"
                className="bg-transparent text-[#1e3c31] font-bold text-sm focus:outline-none cursor-pointer"
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
                <option value="MXN">MXN</option>
              </Field>
            </div>
          </div>

          <ErrorMessage
            name="pricePerHour"
            component="p"
            className="text-xs text-red-500"
          />

          <p className="text-[11px] text-gray-400 italic">
            * El precio promedio para tu categoría es de $25 - $40 USD.
          </p>
        </div>

        {/* Comisión */}
        <div className="bg-[#1e3c31]/5 p-5 rounded-2xl border border-[#1e3c31]/10">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Tú recibes:</span>
            <span className="font-bold text-[#1e3c31]">90%</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Comisión GoSafe:</span>
            <span className="font-bold text-[#f0ba3c]">10%</span>
          </div>

          <hr className="my-3 border-gray-200" />

          <p className="text-[10px] text-gray-500 leading-tight">
            GoSafe utiliza esa comisión para el mantenimiento de la plataforma y seguros para tus alumnos.
          </p>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-between gap-4 pt-10">
          <button
            type="button"
            onClick={prev}
            className="text-gray-400 text-sm font-medium hover:underline"
            disabled={isSubmitting}
          >
            Volver
          </button>

          <button
            type="submit" 
            className="w-full max-w-[200px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-[#1e3c31] font-extrabold py-3 px-6 rounded-2xl shadow-lg transition-all uppercase tracking-wider"
          >
            Finalizar
          </button>
        </div>

      </div>
    </div>
  );
}