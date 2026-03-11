"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidateFormRegister } from "@/lib/validate";
import { register } from "@/service/authService";
import Link from "next/link";

function RegisterView() {
    const router = useRouter ();
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f2eb",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Green blob background */}
      <div style={{
        position: "absolute",
        right: "-80px",
        top: "40px",
        width: "420px",
        height: "520px",
        backgroundColor: "#1a3d2b",
        borderRadius: "60% 40% 40% 60% / 50% 50% 60% 40%",
        zIndex: 0,
      }} />

      {/* Main content */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "10px 40px 40px",
        position: "relative",
        zIndex: 1,
        maxWidth: "780px",
      }}>
        {/* Title */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#1a1a1a",
            margin: "0 0 6px",
          }}>
            ¡Únete a nuestra comunidad!
          </h1>
          <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>
            Regístrate para empezar a conectar con los mejores instructores
          </p>
        </div>

        {/* Google Sign Up */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button type="button" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "white",
            border: "1.5px solid #d0ccc4",
            borderRadius: "50px",
            padding: "10px 32px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            color: "#333",
            width: "320px",
            justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
        </div>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          maxWidth: "600px",
          margin: "0 auto 20px",
          width: "100%",
        }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
          <span style={{ color: "#888", fontSize: "13px" }}>O</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
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
        <Form style ={{width :"100%", maxWidth :"600px"}}>
          <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Nombre completo"
                                      />
                  <ErrorMessage name="name">{(msg) => <span style={{ color: "#e53e3e", fontSize: "11px", marginTop: "3px", display: "block" }}>{msg}</span>}</ErrorMessage>
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
                {isSubmitting ? 'Registrando...' : 'crear cuenta'}
                </button>
              <div>
                  <p style={{ textAlign: "center", fontSize: "13px", color: "#444", margin: "0 0 10px" }}>
                ¿Ya tienes una cuenta?{" "}
                <Link href="/" style={{ color: "#f5c518", fontWeight: "700", textDecoration: "none" }}>
                  Inicia sesión
                </Link>
              </p>
              </div>
          </Form>
      )}
    </Formik>
      </main>
    </div>
  )
}

export default RegisterView;