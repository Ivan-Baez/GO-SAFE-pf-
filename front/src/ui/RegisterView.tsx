"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidateFormRegister } from "@/lib/validate";
import { register } from "@/service/authService";
import Link from "next/link";

function RegisterView() {
    const router = useRouter ();
  return (
    <>
    <div>
      <h1>
        Crear una cuenta
      </h1>
      <p>
        completa el formulario
      </p>
    </div>
    <Formik
      initialValues={{
        name: '',
        documentType: '',
        document: '',
        age: 0,
        address: '',
        phone: '',
        country: '',
        city: '',
        mail: '',
        password: '',
        genre: '',
      }}
      validate={ValidateFormRegister}
      onSubmit={async(values) => {
        try {
          await register(values);
          alert ("Registro exitoso! Redirigiendo al login ")
          router.push("/")
        }catch (error) {
          alert("Error al registrarse, Intente nuevamente")
        }
      }}
    >
      {({errors,isSubmitting}) => (
        <Form>
          <div>
            <label>Nombre</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="span" />
          </div>
          <div>
            <label>Tipo de Documento</label>
            <Field name="documentType" type="text" />
            <ErrorMessage name="documentType" component="span" />
          </div>
          <div>
            <label>Documento</label>
            <Field name="document" type="text" />
            <ErrorMessage name="document" component="span" />
          </div>
          <div>
            <label>Edad</label>
            <Field name="age" type="number" />
            <ErrorMessage name="age" component="span" />
          </div>
          <div>
            <label>Dirección</label>
            <Field name="address" type="text" />
            <ErrorMessage name="address" component="span" />
          </div>
          <div>
            <label>Teléfono</label>
            <Field name="phone" type="text" />
            <ErrorMessage name="phone" component="span" />
          </div>
          <div>
            <label>País</label>
            <Field name="country" type="text" />
            <ErrorMessage name="country" component="span" />
          </div>
          <div>
            <label>Ciudad</label>
            <Field name="city" type="text" />
            <ErrorMessage name="city" component="span" />
          </div>
          <div>
            <label>Mail</label>
            <Field name="mail" type="email" />
            <ErrorMessage name="mail" component="span" />
          </div>
          <div>
            <label>Contraseña</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="span" />
          </div>
          <div>
            <label>Género</label>
            <Field name="genre" type="text" />
            <ErrorMessage name="genre" component="span" />
          </div>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              Boolean(errors.address || errors.age || errors.city || errors.country || errors.document || errors.documentType || errors.genre || errors.mail ||errors.name || errors.password || errors.phone)
            }
            >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              Registrarse</button>
              <div>
                <p>ya tienes cuenta? {" "}</p>
                <Link
                href={"/"}
                >
                  Incia sesión aquí
                </Link>
              </div>
          </Form>
      )}
    </Formik>
    </>

  )
}

export default RegisterView;