"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateFormLogin } from "@/lib/validate";
import Link from "next/link";
import Image from "next/image";
import { toastError, toastSuccess } from "@/lib/toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginView() {
  const router = useRouter();
  const { setUserData } = useAuth();

  return (
    <div className="mt-12">
      <div className="mt-12">
        <h1 className="mt-6 mb-10 text-2xl font-semibold text-center text-gray-800">Iniciar Sesión</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}

          // crear validate
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
                  email: values.email,
                  role: data.role
                }
              };
              
              console.log("SESSION:", session);

              setUserData(session);

              toastSuccess("Login exitoso");

              router.push("/");

            } catch (error) {
              toastError("Credenciales incorrectas");
            }
          }}
        >

          <Form className="flex flex-col gap-4 w-80">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                className="w-full border p-2 rounded"
              />

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-black">
              ¿Has olvidado la contraseña?
            </Link>

            <button
              type="submit"
              className="bg-amber-400 text-white py-2 rounded hover:bg-amber-600 mt-4"
            >
              Iniciar sesión
            </button>
          </Form>
        </Formik>
      </div>
      <div className="flex items-center my-4">
        <div className="grow border-t border-gray-300"></div>
        <span className="mx-3 text-sm text-gray-500">o</span>
        <div className="grow border-t border-gray-300"></div>
      </div>
      <div className="mt-12">
        <button onClick={() =>
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
        } className="flex items-center justify-center gap-2 w-full border p-2 rounded hover:bg-gray-100">
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Ingresar con Google
          </span>
        </button>
      </div>
    </div>
  )
}