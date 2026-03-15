"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateEducationStep } from "@/lib/validate";
import { IInstructorRegisterProps } from "@/types/types";

interface StepProps {
  next: () => void;
  prev: () => void;
  values: IInstructorRegisterProps;     
}

export default function EducationStep({ next, prev }: StepProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">
      
      <div className="w-full text-left mb-6">
        <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Educación</h2>
        <p className="text-gray-600 text-sm">Cuéntanos sobre tu formación académica o profesional.</p>
      </div>

      <Formik
        initialValues={{
          noEducation: false,
          titulo: "",
          institucion: "",
          nivel: "",
          añoInicio: "",
          añoFin: "",
          actualidad: false,
        }}
        validate={validateEducationStep}
        onSubmit={(values) => {
          console.log("Datos Educación:", values);
          next();
        }}
      >
        {({ values }) => (
          <Form className="w-full space-y-4 z-10">
            
            {/* Checkbox - Siempre visible */}
            <div className="flex items-center space-x-3 py-4">
            <Field 
              type="checkbox" 
              name="noEducation" 
              id="noEducation" 
              className="w-6 h-6 rounded border-gray-300 text-[#f0ba3c] focus:ring-[#f0ba3c] cursor-pointer"
            />
            <label htmlFor="noEducation" className="text-gray-700 italic text-sm">
              No cuento con estudios para sumar en este momento.
            </label>
            </div>

            {/* Sección condicional: Se oculta o se pone opaca si marca el checkbox */}
            {!values.noEducation && (
              <div className="space-y-4 transition-all duration-300">
            {/* Título o Carrera */}
            <div>
              <label className="block font-bold text-[#1e3c31] mb-2">Título / Carrera</label>
              <Field 
                name="titulo" 
                placeholder="Ej: Lic. en Deporte" 
                className="inputStyles w-full"
              />
              <ErrorMessage name="titulo" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            {/* Institución */}
            <div>
              <label className="block font-bold text-[#1e3c31] mb-2">Institución</label>
              <Field 
                name="institucion" 
                placeholder="Nombre de la universidad o escuela" 
                className="inputStyles w-full"
              />
              <ErrorMessage name="institucion" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            {/* Nivel de estudios */}
            <div>
              <label className="block font-bold text-[#1e3c31] mb-2">Nivel</label>
              <Field as="select" name="nivel" className="inputStyles w-full appearance-none italic text-gray-400">
                <option value="" disabled>Selecciona nivel</option>
                <option value="universitario">Universitario</option>
                <option value="terciario">Terciario</option>
                <option value="curso">Curso / Certificación</option>
                <option value="secundario">Secundario</option>
              </Field>
              <ErrorMessage name="nivel" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            {/* Años */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-bold text-[#1e3c31] mb-2 text-sm">Año Inicio</label>
                <Field name="añoInicio" type="number" placeholder="2020" className="inputStyles w-full" />
                <ErrorMessage name="añoInicio" component="p" className="text-xs text-red-500 mt-1" />
              </div>
              <div className="w-1/2">
                <label className="block font-bold text-[#1e3c31] mb-2 text-sm">Año Fin</label>
                <Field 
                  name="añoFin" 
                  type="number" 
                  placeholder="2024" 
                  className={`inputStyles w-full ${values.actualidad ? 'opacity-30 pointer-events-none' : ''}`}
                />
                <ErrorMessage name="añoFin" component="p" className="text-xs text-red-500 mt-1" />
              </div>
            </div>

            {/* Checkbox: Actualmente estudiando */}
            <div className="flex items-center space-x-3 pt-2">
              <Field 
                type="checkbox" 
                name="actualidad" 
                id="actualidad"
                className="w-5 h-5 border-gray-300 rounded text-[#f0ba3c] focus:ring-[#f0ba3c]" 
              />
              <label htmlFor="actualidad" className="text-gray-600 text-sm">Actualmente estudiando</label>
            </div>
            </div>
            )}

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