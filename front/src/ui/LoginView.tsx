"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateFormLogin } from "@/lib/validate";

export default function LoginView() {
    const router = useRouter();

    return (
        <div className="mt-6">
            <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">Iniciar Sesión</h1>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}

              // crear validate
              validate={validateFormLogin}

              onSubmit={(values) => {
                 console.log(values);

                 // después acá iría el login al backend
                router.push("/");
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

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>

        </Form>


            </Formik>
        </div>
    )
}