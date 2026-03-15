"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PasswordField from "./PasswordField";
// Aquí importarías tu función de validación si ya la tienes
import { validateRegisterStep1 } from "@/lib/validate";

interface PersonalDataProps {
  next: () => void;
}

// Generamos los arreglos para los selects
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
// Generamos años desde el actual hacia atrás (ej: 100 años atrás)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default function PersonalData({ next }: PersonalDataProps) {
  return(
    <div className="flex w-full min-h-screen relative overflow-hidden z-10 bg-white">
      <div className="flex flex-col w-full max-w-[500px] mx-auto p-6 min-h-screen relative overflow-hidden bg-white mb-50">
      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#1e3c31] text-center mb-8 leading-tight">
        ¡únete a nuestra comunidad <br /> como instructor!
      </h2>

      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          birthDay: "",
          birthMonth: "",
          birthYear: "",
          address: "",
          city: "",
          country: "",
          phone: "",
          category: "",
          isMajor: false,
        }}
        // validate={validateRegisterStep1} // Cuando tenga el helper de validación, lo pones aca
        onSubmit={(values) => {
          console.log("Datos capturados:", values);
          // Si el back te pide una sola fecha, los unes aquí:
          const fullDate = `${values.birthYear}-${values.birthMonth}-${values.birthDay}`;
          console.log("Fecha unida:", fullDate);
          // Aquí guardaríamos los datos antes de pasar al siguiente
          next();
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full space-y-3 z-10">
        
            {/* Inputs Reutilizables */}
            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Nombre</label>
              <Field name="name" type="text" placeholder="Nombre" className="inputStyles w-full"/>
              <ErrorMessage name="name" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Apellido</label>
              <Field name="surname" type="text" placeholder="Apellido" className="inputStyles w-full"/>
              <ErrorMessage name="surname" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Email</label>
              <Field name="email" type="email" placeholder="Email" className="inputStyles w-full" />
              <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Contraseña</label>
              <PasswordField name="password" placeholder="Tu contraseña" />
              <ErrorMessage name="password" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Confirmar Contraseña</label>
              <PasswordField name="confirmPassword" placeholder="Repite tu contraseña" />
              <ErrorMessage name="confirmPassword" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">
                Fecha de nacimiento
              </label>
      
              <div className="flex gap-2">
                {/* Día */}
                <div className="w-1/4">
                  <Field
                    as="select"
                    name="birthDay"
                    className="inputStyles w-full appearance-none cursor-pointer italic text-gray-400"
                  >
                  <option value="" disabled>Día</option>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </Field>
                </div>

                {/* Mes */}
                <div className="w-2/4">
                <Field
                  as="select"
                  name="birthMonth"
                  className="inputStyles w-full appearance-none cursor-pointer italic text-gray-400"
                >
                <option value="" disabled>Mes</option>
                  {months.map((m, index) => (
                <option key={m} value={index + 1}>{m}</option>
                  ))}
                </Field>
                </div>

                {/* Año */}
                <div className="w-1/4">
                  <Field
                    as="select"
                    name="birthYear"
                    className="inputStyles w-full appearance-none cursor-pointer italic text-gray-400"
                  >
                    <option value="" disabled>Año</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </Field>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-1 text-sm"> Dirección </label>
              <Field name="address" type="text" placeholder="Dirección" className="inputStyles w-full" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm"> Ciudad </label>
              <Field name="city" type="text" placeholder="Ciudad" className="inputStyles w-half w-full" />
            </div>
            
            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm"> País </label>
              <Field name="country" type="text" placeholder="País" className="inputStyles w-half w-full"  />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm"> Teléfono </label>
              <Field name="phone" type="tel" placeholder="Teléfono" className="inputStyles w-full" />
              <ErrorMessage name="phone" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3 py-4">
              <Field 
                type="checkbox" 
                name="isMajor" 
                id="major" 
                className="w-6 h-6 rounded border-gray-300 text-[#f0ba3c] focus:ring-[#f0ba3c] cursor-pointer"
              />
              <label htmlFor="major" className="text-gray-700 italic text-sm">
                Confirmo que soy mayor de 18 años
              </label>
            </div>

            {/* Botón Continuar */}
            <div className="pt-4 flex justify-center">
              <button 
                type="submit" 
                className="w-full max-w-[280px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50"
                disabled={Object.keys(errors).length > 0}
              >
                Continuar
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>

      {/* --- EL FONDO ONDULADO (SVG descargado) --- */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-20 pointer-events-none">
        <img 
           src="/Decore2.png" 
           alt="Wave background" 
           className="w-full h-full object-fill"
        />
      </div>
    </div>
    )
}