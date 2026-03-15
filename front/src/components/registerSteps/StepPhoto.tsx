"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface StepProps {
  next: () => void;
  prev: () => void;
}

export default function StepPhoto({ next, prev }: StepProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[450px] mx-auto p-6 min-h-screen bg-white">
      
      <div className="w-full text-left mb-6">
        <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Foto de perfil</h2>
        <p className="text-gray-600 text-sm">Elije una foto que ayude a tus clientes a conocerte.</p>
      </div>

      <Formik
        initialValues={{ photoUrl: "" }}
        onSubmit={(values) => {
          console.log("URL de la foto:", values.photoUrl);
          next();
        }}
      >
        {({ values }) => (
          <Form className="w-full space-y-6">
            
            {/* Preview de la foto y datos rápidos */}
            <div className="flex items-center gap-4 p-4 border-t border-b border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                {values.photoUrl ? (
                  <img src={values.photoUrl} alt="Preview" className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-[#1e3c31]">Antonio Pérez</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  📇 Instructor de paracaidismo
                </p>
              </div>
            </div>

            {/* Input para la URL */}
            <div>
              <Field 
                name="photoUrl" 
                type="text" 
                placeholder="Pega la URL de tu foto aquí..." 
                className="inputStyles w-full text-sm"
              />
              <p className="text-[10px] text-gray-400 mt-1 italic">
                * Por ahora, usa una URL de imagen (ej: de Google o Facebook)
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 rounded-2xl shadow-md transition-all"
            >
              Subir foto
            </button>

            {/* Lista de consejos */}
            <div className="space-y-3 pt-4">
              <h4 className="font-bold text-[#1e3c31] text-sm">Qué necesita tu foto?</h4>
              <ul className="space-y-2">
                {[
                  "Debes estar mirando al frente",
                  "Tú debes ser la única persona en la foto",
                  "Tu rostro debe estar visible",
                  "Usa una foto con alta resolución",
                  "No uses filtros"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-600">✓</span> {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contenedor de botones */}
            <div className="flex items-center justify-between gap-4 pt-6">

              {/* Botón para volver */}
              <button 
              type="button" 
              onClick={prev}
              className=" text-gray-400 text-sm font-medium hover:underline mt-3"
              >
              Volver al paso anterior
              </button>

              {/* Botón Continuar */}
              <div className="pt-4 flex justify-center">
                <button 
                type="submit" 
                className="w-full min-w-[150px] max-w-[280px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                Continuar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}