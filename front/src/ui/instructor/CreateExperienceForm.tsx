"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";
import { toastSuccess, toastError } from "@/lib/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type CreateExperienceFormValues = {
  title: string;
  category: string;
  country: string;
  city: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  price: string;
  capacity: string;
  description: string;
  difficulty: string;
  minAge: string;
  maxAge: string;
};

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

const EMPTY_VALUES: CreateExperienceFormValues = {
  title: "",
  category: "",
  country: "",
  city: "",
  location: "",
  startDateTime: "",
  endDateTime: "",
  price: "",
  capacity: "",
  description: "",
  difficulty: "",
  minAge: "",
  maxAge: "",
};

export default function CreateExperienceForm() {
  const { userData } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<CreateExperienceFormValues>(EMPTY_VALUES);
  const [images, setImages] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const computedDuration = useMemo(() => {
    if (!values.startDateTime || !values.endDateTime) {
      return "";
    }

    const start = new Date(values.startDateTime);
    const end = new Date(values.endDateTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return "Rango de fechas invalido";
    }

    const diffMs = end.getTime() - start.getTime();
    const totalMinutes = Math.floor(diffMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];

    if (days > 0) {
      parts.push(`${days} dia${days > 1 ? "s" : ""}`);
    }

    if (hours > 0) {
      parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);
    }

    if (minutes > 0) {
      parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);
    }

    return parts.length > 0 ? parts.join(" ") : "Menos de 1 minuto";
  }, [values.startDateTime, values.endDateTime]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setValues(EMPTY_VALUES);
    setImages([]);
    setFileInputKey((previous) => previous + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData?.token) {
      toastError("Debes iniciar sesion como instructor");
      router.push("/login");
      return;
    }

    if (computedDuration === "" || computedDuration === "Rango de fechas invalido") {
      toastError("Revisa las fechas de inicio y fin");
      return;
    }

    const decoded = jwtDecode<DecodedToken>(userData.token);

    const startDate = values.startDateTime.split("T")[0];
    const ageRange = `${values.minAge}-${values.maxAge}`;

    const payload = {
      title: values.title,
      category: values.category,
      country: values.country,
      city: values.city,
      location: values.location,
      date: startDate,
      description: values.description,
      price: Number(values.price),
      capacity: Number(values.capacity),
      ageRange,
      dificulty: values.difficulty,
      duration: computedDuration,
      instructorId: decoded.id,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_URL}/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      toastSuccess("Experiencia creada con exito");
      resetForm();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "No se pudo crear la experiencia";
      toastError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-[#d8d4cb] bg-white px-4 py-3 text-[#1a3d2b] outline-none transition focus:border-[#1a3d2b] focus:ring-2 focus:ring-[#1a3d2b]/20";
  const labelClassName = "text-sm font-semibold text-[#1a3d2b]";

  return (
    <section className="w-full bg-[#f7f4ee] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 rounded-3xl border border-[#e8e1d4] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c8a84]">
            Panel de instructor
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a3d2b] sm:text-4xl">Crear experiencia</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5e625d] sm:text-base">
            Completa los datos de tu experiencia para publicarla por categoria y que sea visible en el home.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#e8e1d4] bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8">
            <section className="rounded-2xl border border-[#ece7df] bg-[#fcfaf6] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-[#1a3d2b]">Informacion principal</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClassName} htmlFor="title">
                    Titulo de la experiencia
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="category">
                    Categoria
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={values.category}
                    onChange={handleChange}
                    placeholder="Ej: Climbing"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="difficulty">
                    Dificultad
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={values.difficulty}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  >
                    <option value="">Selecciona una dificultad</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Experto">Experto</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="capacity">
                    Capacidad maxima
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    max="100"
                    value={values.capacity}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="price">
                    Precio
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={values.price}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#ece7df] bg-[#fcfaf6] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-[#1a3d2b]">Ubicacion</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClassName} htmlFor="country">
                    Pais
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={values.country}
                    onChange={handleChange}
                    placeholder="Ej: Colombia"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="city">
                    Ciudad
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="Ej: Bogota"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="location">
                    Lugar especifico
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={values.location}
                    onChange={handleChange}
                    placeholder="Ej: Parque Suesca"
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#ece7df] bg-[#fcfaf6] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-[#1a3d2b]">Fechas y edad</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="startDateTime">
                    Inicio (dia y hora)
                  </label>
                  <input
                    id="startDateTime"
                    name="startDateTime"
                    type="datetime-local"
                    value={values.startDateTime}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="endDateTime">
                    Fin (dia y hora)
                  </label>
                  <input
                    id="endDateTime"
                    name="endDateTime"
                    type="datetime-local"
                    value={values.endDateTime}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>

                <div className="md:col-span-2 rounded-xl border border-dashed border-[#c8bfaf] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c8a84]">
                    Duracion estimada
                  </p>
                  <output className="mt-1 block text-base font-semibold text-[#1a3d2b]">
                    {computedDuration || "Completa fecha/hora de inicio y fin"}
                  </output>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="minAge">
                    Edad minima
                  </label>
                  <input
                    id="minAge"
                    name="minAge"
                    type="number"
                    min="0"
                    max="120"
                    value={values.minAge}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="maxAge">
                    Edad maxima
                  </label>
                  <input
                    id="maxAge"
                    name="maxAge"
                    type="number"
                    min="0"
                    max="120"
                    value={values.maxAge}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#ece7df] bg-[#fcfaf6] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-[#1a3d2b]">Contenido y fotos</h2>

              <div className="mt-4">
                <label className={labelClassName} htmlFor="description">
                  Descripcion
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  rows={5}
                  className={fieldClassName}
                  required
                />
              </div>

              <div className="mt-4">
                <label className={labelClassName} htmlFor="images">
                  Imagenes del lugar
                </label>
                <input
                  key={fileInputKey}
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => {
                    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
                    setImages(selectedFiles);
                  }}
                  className="mt-2 block w-full text-sm text-[#4f534f] file:mr-4 file:rounded-lg file:border-0 file:bg-[#e9dbc3] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#1a3d2b] hover:file:bg-[#dccaa9]"
                  required
                />
                <p className="mt-2 text-sm text-[#6d706c]">Imagenes seleccionadas: {images.length}</p>
              </div>
            </section>
          </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
            className="rounded-xl border border-[#1a3d2b] px-6 py-3 font-semibold text-[#1a3d2b] transition hover:bg-[#1a3d2b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
            Limpiar formulario
            </button>

            <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#e7b52c] px-6 py-3 font-semibold text-[#1f1f1f] transition hover:bg-[#d7a61e] disabled:cursor-not-allowed disabled:opacity-50"
            >
            {isSubmitting ? "Guardando..." : "Guardar experiencia"}
            </button>
        </div>
        </form>
    </div>
    </section>
);
}
