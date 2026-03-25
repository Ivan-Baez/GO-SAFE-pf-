"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateFormLogin } from "@/lib/validate";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toastError, toastSuccess } from "@/lib/toast";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginView() {

  const router = useRouter();
  const { setUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {

    window.location.href =
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;

  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">

      <div className="w-full max-w-sm">

        <h1 className="mt-6 mb-10 text-3xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validateFormLogin}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
                values
              );

              const data = response.data;

              console.log("LOGIN RESPONSE:", data);

              const session = {
                token: data.access_token,
                user: data.user, 
              };

              setUserData(session);

              toastSuccess("¡Bienvenido!");

              router.push("/");

            } catch (error) {
              toastError("Credenciales incorrectas");
            }

          }}
        >

          <Form className="flex flex-col gap-4 w-full">

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2.5 rounded-xl"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  className="w-full border border-gray-300 p-2.5 pr-10 rounded-xl"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="bg-amber-400 py-3 rounded-xl font-bold"
            >
              Iniciar sesión
            </button>

          </Form>

        </Formik>

        <div className="flex items-center my-8">

          <div className="grow border-t"></div>

          <span className="mx-3 text-sm text-gray-400">o</span>

          <div className="grow border-t"></div>

        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full border rounded-xl py-3 hover:bg-gray-50"
        >

          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />

          <span className="text-sm font-semibold">
            Ingresar con Google
          </span>

        </button>

        <p className="mt-8 text-center text-sm text-gray-600">

          ¿No tienes cuenta?{" "}

          <Link
            href="/register"
            className="text-amber-600 font-bold"
          >
            Regístrate aquí
          </Link>

        </p>

      </div>

    </div>

  );

}