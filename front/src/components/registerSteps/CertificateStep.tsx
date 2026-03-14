"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidateCertificationStep } from "@/lib/validate";
import { IInstructorRegisterProps } from "@/types/types";

interface StepProps {
  next: () => void;
  prev: () => void;
  values: IInstructorRegisterProps;     
}

export default function CertificateStep({ next, prev }: StepProps){
  return(
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">
      <Formik
        initialValues={{ 
          noCertificado: false, 
          category: "",
          areaInstruccion: "", 
          nombreCertificado: "", 
          certificadoUrl: "" 
        }}
        validate={ValidateCertificationStep}
        onSubmit={(values) => {
          console.log("Datos de certificación:", values);
          next();
        }}
      >
        {({ values }) => (
        <Form className="w-full space-y-6 z-10">
          <div className="w-full text-left mb-6">
            <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Certificación</h2>
            <p className="text-gray-600 text-sm">Cuéntanos si tienes algún tipo de certificación.</p>
          </div>

          {/* Checkbox - Siempre visible */}
          <div className="flex items-center space-x-3 py-4">
            <Field 
              type="checkbox" 
              name="noCertificado" 
              id="noCertificado" 
              className="w-6 h-6 rounded border-gray-300 text-[#f0ba3c] focus:ring-[#f0ba3c] cursor-pointer"
            />
            <label htmlFor="noCertificado" className="text-gray-700 italic text-sm">
              No cuento con una certificación para subir en este momento.
            </label>
          </div>

          {/* Sección condicional: Se oculta o se pone opaca si marca el checkbox */}
          {!values.noCertificado && (
            <div className="space-y-4 transition-all duration-300">

              {/* Select de Categoría */}
              <div className="w-full">
                <label htmlFor="category" className="block font-bold text-[#1e3c31] mb-2">
                  Área de certificación
                </label>
                <div className="relative"> 
                  <Field 
                    as="select" 
                    name="category" 
                    className="inputStyles w-full appearance-none cursor-pointer italic text-gray-400"
                  >
                    <option value="" disabled>Categoría</option>
                    <option value="deportes">Deportes</option>
                    <option value="arte">Arte</option>
                    <option value="tecnologia">Tecnología</option>
                  </Field>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <ErrorMessage name="category" component="p" className="text-xs text-red-500 mt-1" />
              </div>

              {/* Título de Certificación */}
              <div>
                <label className="block font-bold text-[#1e3c31] mb-2">Certificación</label>
                <Field 
                  name="nombreCertificado" 
                  type="text" 
                  placeholder="Certificado" 
                  className="inputStyles w-full"
                />
                <p className="text-[11px] text-gray-500 italic mt-1">Escríbelo tal como aparece en tu certificado</p>
                <ErrorMessage name="nombreCertificado" component="p" className="text-xs text-red-500 mt-1" />
              </div>

              {/* Recuadro de Subida (URL) */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center space-y-4 mt-6">
                <span className="font-bold text-[#1e3c31]">Sube tu certificado</span>
                <Field 
                  name="certificadoUrl" 
                  type="text" 
                  placeholder="Pega la URL del certificado aquí" 
                  className="inputStyles w-full text-center text-sm"
                />
                  <div className="text-[11px] text-gray-600 space-y-2 px-2 text-center">
                    <p>Sólo se aceptarán documentos auténticos.</p>
                    <p className="font-semibold">Formatos: JPG, PNG.</p>
                  </div>
              </div>

            </div>
          )}

          {/* Contenedor de navegación - SIEMPRE VISIBLE al final del Form */}
          <div className="flex items-center justify-between gap-4 pt-10">
          <button 
          type="button" 
          onClick={prev}
          className="text-gray-400 text-sm font-medium hover:underline"
          >
          Volver al paso anterior
          </button>

          <button 
          type="submit" 
          className="w-full max-w-[200px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
          >
          Continuar
          </button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
    )
}