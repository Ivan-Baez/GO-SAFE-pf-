"use client";
import { Field, ErrorMessage, useFormikContext } from "formik";
import PasswordField from "./PasswordField";
import dynamic from "next/dynamic";

const CountrySelect = dynamic(
  () => import("@/lib/countrySelect"),
  { ssr: false }
);

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default function PersonalData() {

const { isValid, isSubmitting } = useFormikContext<any>();

  return (
    <div className="flex w-full min-h-screen relative overflow-hidden z-10 bg-white">
      <div className="flex flex-col w-full max-w-[500px] mx-auto p-6 min-h-screen relative overflow-hidden bg-white mb-50">

        <h2 className="text-2xl md:text-3xl font-bold text-[#1e3c31] text-center mb-8 leading-tight">
          ¡Únete a nuestra comunidad <br /> como instructor!
        </h2>

        <div className="w-full space-y-3 z-10">

          {/* Inputs Reutilizables */}
            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Nombre</label>
              <Field name="firstName" type="text" placeholder="Nombre" className="inputStyles w-full"/>
              <ErrorMessage name="firstName" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Apellido</label>
              <Field name="lastName" type="text" placeholder="Apellido" className="inputStyles w-full"/>
              <ErrorMessage name="lastName" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-1/3">
                <label className="block font-bold text-[#323235] mb-2 text-sm">
                Tipo de documento
                </label>

                <Field
                as="select"
                name="documentType"
                className="inputStyles w-full"
                >
                <option value="">Seleccionar</option>
                <option value="dni">DNI</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="cuil">CUIL</option>
                <option value="cuit">CUIT</option>
                </Field>

                <ErrorMessage name="documentType" component="p" className="text-xs text-red-500 mt-1"/>
              </div>

              <div className="w-2/3">
                <label className="block font-bold text-[#323235] mb-2 text-sm">
                  Documento
                </label>

                <Field
                name="document"
                type="text"
                placeholder="Documento"
                className="inputStyles w-full"
                />

                <ErrorMessage name="document" component="p" className="text-xs text-red-500 mt-1"/>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">
              Género
              </label>

              <Field as="select" name="genre" className="inputStyles w-full">
              <option value="">Seleccionar</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
              </Field>

              <ErrorMessage name="genre" component="p" className="text-xs text-red-500 mt-1"/>
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">
              Nombre de usuario
              </label>

              <Field
              name="userName"
              type="text"
              placeholder="Usuario"
              className="inputStyles w-full"
              />

              <ErrorMessage name="userName" component="p" className="text-xs text-red-500 mt-1"/>
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Email</label>
              <Field name="email" type="email" placeholder="Email" className="inputStyles w-full" />
              <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Contraseña</label>
              <PasswordField name="password" placeholder="Tu contraseña" />
            </div>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm">Confirmar Contraseña</label>
              <PasswordField name="confirmPassword" placeholder="Repite tu contraseña" />
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
            
            <CountrySelect/>

            <div>
              <label className="block font-bold text-[#323235] mb-2 text-sm"> Teléfono </label>
              <Field name="phone" type="tel" placeholder="Teléfono" className="inputStyles w-full" />
              <ErrorMessage name="phone" component="p" className="text-xs text-red-500 mt-1" />
            </div>

          <div className="flex items-center space-x-3 py-4">
            <Field type="checkbox" name="isMajor" className="w-6 h-6"/>
            <label className="text-gray-700 italic text-sm">
              Confirmo que soy mayor de 18 años
            </label>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full max-w-[280px] bg-[#f0ba3c] text-white font-bold py-3 px-6 rounded-2xl transition
              hover:bg-[#dca91f]
              disabled:bg-[#f0ba3c]/40
              disabled:text-white/60
                disabled:cursor-not-allowed
              disabled:hover:bg-[#f0ba3c]/40"
               >
              Continuar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}