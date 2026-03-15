"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { ValidateFormRegister } from "@/lib/validate";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const GREEN = "#1a3d2b";
const CREAM = "#f5f2eb";
const YELLOW = "#f5c518";
const LIGHT_GREEN = "#c8d8c8";

const inputBase = {
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

const inputGreenBase = {
  ...inputBase,
  backgroundColor: LIGHT_GREEN,
  border: "1.5px solid transparent",
  color: "#1a1a1a",
};

function RegisterView() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [googleData, setGoogleData] = useState<any>(null);

  useEffect(() => {

    if (token && token !== "null") {

      try {

        const decoded: any = jwtDecode(token);

        setGoogleData(decoded);

        localStorage.setItem(
          "googleRegisterData",
          JSON.stringify(decoded)
        );

      } catch (error) {
        console.error("Token inválido:", error);
      }

      return;
    }

    const stored = localStorage.getItem("googleRegisterData");

    if (stored) {
      setGoogleData(JSON.parse(stored));
    }

  }, [token]);

  const ciudadPorPais: Record<string, string[]> = {
    Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
    México: ["Ciudad de México", "Guadalajara", "Monterrey"],
    Chile: ["Santiago", "Valparaíso", "Concepción"],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: CREAM,
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <main
        style={{
          padding: "8px 40px 60px",
          position: "relative",
          zIndex: 10,
          maxWidth: "820px",
        }}
      >

        <Formik
          enableReinitialize
          initialValues={{
            primernombre: googleData?.firstName || "",
            segundonombre: googleData?.lastName || "",
            username: "",
            documentType: "",
            document: "",
            birthdate: "",
            address: "",
            phone: "",
            country: "",
            city: "",
            mail: googleData?.email || "",
            password: "",
            confirmPassword: "",
            genre: "",
          }}
          validate={ValidateFormRegister}
          onSubmit={async (values, { setSubmitting }) => {

            try {

              const body = {
                firstName: values.primernombre,
                lastName: values.segundonombre,
                userName: values.username,
                documentType: values.documentType,
                document: Number(values.document),
                genre: values.genre,
                birthdate: values.birthdate,
                address: values.address,
                phone: Number(values.phone),
                country: values.country,
                city: values.city,
                email: values.mail,
                password: values.password,
                confirmPassword: values.confirmPassword,
                role: "user",
                profilePic: googleData?.picture || ""
              };

              await axios.post(
                "http://localhost:3000/auth/signup-user",
                body
              );

              router.push("/login");

            } catch (error) {

              console.error("Error:", error);
              alert("Error al registrar usuario");

            } finally {
              setSubmitting(false);
            }

          }}
        >

          {({ errors, isSubmitting, values }) => (

            <Form style={{ width: "100%", maxWidth: "640px" }}>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >

                <Field
                  name="primernombre"
                  type="text"
                  placeholder="Primer Nombre"
                  style={inputBase}
                />

                <Field
                  name="segundonombre"
                  type="text"
                  placeholder="Segundo Nombre"
                  style={inputBase}
                />

                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  style={inputBase}
                />

                <Field
                  name="birthdate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  style={{
                    ...inputGreenBase,
                    color: values.birthdate ? "#1a1a1a" : "#888",
                  }}
                />

                <Field
                  name="mail"
                  type="email"
                  placeholder="Correo electrónico"
                  style={inputBase}
                />

                <Field
                  name="address"
                  type="text"
                  placeholder="Dirección"
                  style={inputGreenBase}
                />

                <Field
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  style={inputBase}
                />

                <Field
                  as="select"
                  name="country"
                  style={{
                    ...inputGreenBase,
                    color: values.country ? "#1a1a1a" : "#666",
                  }}
                >
                  <option value="">País</option>
                  {Object.keys(ciudadPorPais).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Field>

                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Repetir contraseña"
                  style={inputBase}
                />

                <Field
                  as="select"
                  name="city"
                  style={{
                    ...inputGreenBase,
                    color: values.city ? "#1a1a1a" : "#666",
                  }}
                >
                  <option value="">Ciudad</option>
                  {(ciudadPorPais[values.country] || []).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Field>

              </div>

              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
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
                }}
              >
                {isSubmitting ? "Registrando..." : "Regístrate"}
              </button>

            </Form>

          )}

        </Formik>

      </main>
    </div>
  );
}

export default RegisterView;