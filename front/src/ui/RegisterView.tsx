"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ValidateFormRegister } from "@/lib/validate";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { register } from "@/service/authService";

// ── Design tokens ─────────────────────────────────────────────────────────────
const GREEN       = "#1a3d2b";
const CREAM       = "#f5f2eb";
const YELLOW      = "#f5c518";
const LIGHT_GREEN = "#c8d8c8";

// ── Shared input styles ───────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "10px",
  border: "1.5px solid #d6d0c8",
  backgroundColor: "white",
  fontSize: "14px",
  color: "#333",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Nunito', sans-serif",
  transition: "border-color 0.2s",
};

const inputGreenBase: React.CSSProperties = {
  ...inputBase,
  backgroundColor: LIGHT_GREEN,
  border: "1.5px solid transparent",
  color: "#1a1a1a",
};

const errorStyle: React.CSSProperties = {
  color: "#c0392b",
  fontSize: "11px",
  marginTop: "3px",
  display: "block",
  fontFamily: "'Nunito', sans-serif",
};

// ── Field wrapper ─────────────────────────────────────────────────────────────
const FieldWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
    {children}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
function RegisterView() {
  const router      = useRouter();
  const searchParams = useSearchParams();
  const token       = searchParams.get("token");

  const [googleData, setGoogleData] = useState<any>(null);

  useEffect(() => {
    if (token && token !== "null") {
      try {
        const decoded: any = jwtDecode(token);
        setGoogleData(decoded);
        localStorage.setItem("googleRegisterData", JSON.stringify(decoded));
      } catch (error) {
        console.error("Token inválido:", error);
      }
      return;
    }
    const stored = localStorage.getItem("googleRegisterData");
    if (stored) setGoogleData(JSON.parse(stored));
  }, [token]);

  const ciudadPorPais: Record<string, string[]> = {
    Colombia:  ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
    México:    ["Ciudad de México", "Guadalajara", "Monterrey"],
    Chile:     ["Santiago", "Valparaíso", "Concepción"],
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .reg-input:focus  { border-color: ${GREEN} !important; }
        .reg-input-g:focus { border-color: ${GREEN} !important; box-shadow: 0 0 0 2px rgba(26,61,43,0.15); }

        .btn-google { transition: background 0.2s, box-shadow 0.2s; }
        .btn-google:hover { background: #f0ede6 !important; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

        .btn-submit { transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .btn-submit:hover:not(:disabled) {
          background: #e0b010 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,197,24,0.4);
        }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        backgroundColor: CREAM,
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        
        

  

        {/* ── Main ── */}
        <main style={{
          padding: "6px 40px 60px",
          position: "relative",
          zIndex: 10,
          maxWidth: "820px",
        }}>

          {/* Title */}
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{
              fontSize: "30px",
              fontWeight: "900",
              color: "#1a1a1a",
              marginBottom: "6px",
              letterSpacing: "-0.5px",
              margin: "0 0 6px",
            }}>
              ¡Únete a nuestra comunidad!
            </h1>
            <p style={{ color: "#666", fontSize: "14px", fontWeight: "600", margin: 0 }}>
              Regístrate para empezar a conectar con los mejores instructores
            </p>
          </div>

          {/* Google button */}
          <div style={{ marginBottom: "18px" }}>
            <button
              type="button"
              className="btn-google"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "white",
                border: "1.5px solid #d0ccc4",
                borderRadius: "50px",
                padding: "11px 32px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                color: "#333",
                width: "340px",
                justifyContent: "center",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Regístrate con Google
            </button>
          </div>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "600px",
            marginBottom: "20px",
          }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
            <span style={{ color: "#888", fontSize: "13px", fontWeight: "600" }}>O</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
          </div>

          {/* ── Formik ── */}
          <Formik
            enableReinitialize
            initialValues={{
              primernombre:   googleData?.firstName || "",
              segundonombre:  googleData?.lastName  || "",
              username:       "",
              documentType:   "",
              document:       "",
              birthdate:      "",
              address:        "",
              phone:          "",
              country:        "",
              city:           "",
              mail:           googleData?.email || "",
              password:       "",
              confirmPassword:"",
              genre:          "",
            }}
            validate={ValidateFormRegister}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await register(values);
                localStorage.removeItem("googleRegisterData");
                router.push("/login");
              } catch (error: any) {
                console.error("Error:", error);
                alert(error?.message || "Error al registrar usuario");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, values }) => (
              <Form style={{ width: "100%", maxWidth: "640px" }}>

                {/* ── Grid 2 columnas (campos blancos izq / verdes der) ── */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}>

                  {/* Primer nombre — blanco */}
                  <FieldWrap>
                    <Field name="primernombre" type="text" placeholder="Primer Nombre"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="primernombre">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Fecha nacimiento — verde */}
                  <FieldWrap>
                    <Field name="birthdate" type="date"
                      max={new Date().toISOString().split("T")[0]}
                      className="reg-input-g"
                      style={{ ...inputGreenBase, color: values.birthdate ? "#1a1a1a" : "#888" }}
                    />
                    <ErrorMessage name="birthdate">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Segundo nombre — blanco */}
                  <FieldWrap>
                    <Field name="segundonombre" type="text" placeholder="Segundo Nombre"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="segundonombre">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Dirección — verde */}
                  <FieldWrap>
                    <Field name="address" type="text" placeholder="Dirección"
                      className="reg-input-g" style={inputGreenBase} />
                    <ErrorMessage name="address">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Correo — blanco */}
                  <FieldWrap>
                    <Field name="mail" type="email" placeholder="Correo electrónico"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="mail">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* País — verde */}
                  <FieldWrap>
                    <Field as="select" name="country" className="reg-input-g"
                      style={{ ...inputGreenBase, color: values.country ? "#1a1a1a" : "#666" }}>
                      <option value="">País</option>
                      {Object.keys(ciudadPorPais).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Contraseña — blanco */}
                  <FieldWrap>
                    <Field name="password" type="password" placeholder="Contraseña"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="password">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Ciudad — verde */}
                  <FieldWrap>
                    <Field as="select" name="city" className="reg-input-g"
                      style={{ ...inputGreenBase, color: values.city ? "#1a1a1a" : "#666" }}>
                      <option value="">Ciudad</option>
                      {(ciudadPorPais[values.country] || []).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="city">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Repetir contraseña — blanco */}
                  <FieldWrap>
                    <Field name="confirmPassword" type="password" placeholder="Repetir contraseña"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="confirmPassword">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  {/* Username — verde (esquina inferior derecha del grid visible) */}
                  <FieldWrap>
                    <Field name="username" type="text" placeholder="Username"
                      className="reg-input-g" style={inputGreenBase} />
                    <ErrorMessage name="username">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                </div>

                {/* ── Fila extra: Tipo doc | Documento | Teléfono | Género ── */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "12px",
                  marginBottom: "28px",
                }}>
                  <FieldWrap>
                    <Field as="select" name="documentType" className="reg-input"
                      style={{ ...inputBase, color: values.documentType ? "#333" : "#888" }}>
                      <option value="">Tipo doc.</option>
                      <option value="CC">CC</option>
                      <option value="CE">CE</option>
                    </Field>
                    <ErrorMessage name="documentType">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  <FieldWrap>
                    <Field name="document" type="text" placeholder="N° Documento"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="document">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  <FieldWrap>
                    <Field name="phone" type="text" placeholder="Teléfono"
                      className="reg-input" style={inputBase} />
                    <ErrorMessage name="phone">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>

                  <FieldWrap>
                    <Field as="select" name="genre" className="reg-input"
                      style={{ ...inputBase, color: values.genre ? "#333" : "#888" }}>
                      <option value="">Género</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Otro">Otro</option>
                    </Field>
                    <ErrorMessage name="genre">{msg => <span style={errorStyle}>{msg}</span>}</ErrorMessage>
                  </FieldWrap>
                </div>

                {/* ── Submit + links ── */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="btn-submit"
                    style={{
                      backgroundColor: YELLOW,
                      color: "#1a1a1a",
                      border: "none",
                      borderRadius: "50px",
                      padding: "14px 0",
                      width: "300px",
                      fontSize: "16px",
                      fontWeight: "800",
                      cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {isSubmitting ? "Registrando..." : "Regístrate"}
                  </button>

                  <p style={{ fontSize: "13px", color: "#444", fontWeight: "600", margin: 0 }}>
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" style={{ color: YELLOW, fontWeight: "800", textDecoration: "none" }}>
                      Inicia sesión
                    </Link>
                  </p>

                  <p style={{ fontSize: "12px", color: "#666", textAlign: "center", fontWeight: "600", margin: 0 }}>
                    Al registrarte, aceptas todos nuestros{" "}
                    <Link href="/terms" style={{ color: YELLOW, fontWeight: "800", textDecoration: "none" }}>
                      Términos de servicio y política de privacidad
                    </Link>
                  </p>
                </div>

              </Form>
            )}
          </Formik>
        </main>
      </div>
    </>
  );
}

export default RegisterView;