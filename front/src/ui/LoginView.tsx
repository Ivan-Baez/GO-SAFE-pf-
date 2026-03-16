"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateFormLogin } from "@/lib/validate";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toastError, toastSuccess } from "@/lib/toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginView() {
  const router = useRouter();
  const { setUserData } = useAuth();

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
              const body = {
                email: values.email,
                password: values.password,
              };

              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
                body
              );

              const data = response.data;

              const session = {
                token: data.access_token,
                user: {
                  id: data.id || 0,
                  name: data.name || values.email.split("@")[0],
                  email: values.email,
                  address: data.address || "",
                  phone: data.phone || "",
                  orders: data.orders || [],
                },
              };

              setUserData(session);
              toastSuccess("¡Bienvenido de nuevo!");
              router.push("/");
            } catch (error: any) {
              console.error(error);
              toastError("Credenciales incorrectas o error de servidor");
            }
          }}
        >
          {/* 2. Corregimos el cierre de llaves aquí para que el Form no flote */}
          <Form className="flex flex-col gap-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="tu@email.com"
                className="w-full border border-gray-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-300 transition-all"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1 ml-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <Field
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-300 transition-all"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1 ml-1"
              />
            </div>

            <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-amber-600 self-end transition-colors">
              ¿Has olvidado la contraseña?
            </Link>

            <button
              type="submit"
              className="bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-500 transition-all active:scale-95 shadow-md mt-2"
            >
              Iniciar sesión
            </button>
          </Form>
        </Formik>

        <div className="flex items-center my-8">
          <div className="grow border-t border-gray-200"></div>
          <span className="mx-3 text-sm text-gray-400 font-medium">o</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <button className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-xl py-3 px-4 bg-white hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />
          <span className="text-sm font-semibold text-gray-700">
            Ingresar con Google
          </span>
        </button>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-amber-600 font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}