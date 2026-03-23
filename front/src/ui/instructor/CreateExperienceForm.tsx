"use client";

import { ChangeEvent, useMemo, useState } from "react";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";
import { toastSuccess, toastError } from "@/lib/toast";
import { getInstructorById } from "@/service/authService";

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
  const [imageUrl, setImageUrl] = useState("");

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

  try {
    if (!userData?.token) {
      toastError("No hay sesión activa");
      return;
    }

    const decoded = jwtDecode<DecodedToken>(userData.token);

    // obtener instructor real
    const instructorResponse = await getInstructorById(decoded.id, userData.token);
    const instructorData = Array.isArray(instructorResponse)
      ? instructorResponse[0]
      : instructorResponse;

    const realInstructorId = instructorData?.instructor?.id;

    if (!realInstructorId) {
      toastError("No se pudo obtener el id del instructor");
      return;
    }

    const startDate = values.startDateTime.split("T")[0];
    const ageRange = `${values.minAge}-${values.maxAge}`;

    const start = new Date(values.startDateTime);
    const end = new Date(values.endDateTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const duration = diffHours > 0 ? `${diffHours} hours` : "1 hour";

    const payload = {
      date: startDate,
      country: values.country,
      city: values.city,
      title: values.title,
      location: values.location,
      description: values.description,
      price: Math.round(Number(values.price)),
      capacity: Number(values.capacity),
      ageRange,
      dificulty: values.difficulty,
      category: values.category,
      duration,
      instructorId: realInstructorId,
     // image: imageUrl,
    };

    console.log("HANDLE SUBMIT SE EJECUTA");
    console.log("VALUES:", values);
    console.log("TOKEN:", userData?.token);
    console.log("PAYLOAD EXPERIENCE:", payload);

    setIsSubmitting(true);
    console.log("ANTES DEL FETCH");

    const response = await fetch(`${API_URL}/experiences`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  },
  body: JSON.stringify(payload),
});

const responseData = await response.json();
console.log("STATUS EXPERIENCE:", response.status);
console.log("RESPONSE EXPERIENCE:", responseData);

if (!response.ok) {
  throw new Error(responseData.message || "Error al crear experiencia");
}

console.log("DESPUES DEL FETCH");
console.log("EXPERIENCIA CREADA:", responseData);

    toastSuccess("Experiencia creada correctamente");
    resetForm();
    router.push("/instructor/dashboard/experiences");
  } catch (error: any) {
    console.error("Error creando experiencia:", error);
    toastError(error.message || "No se pudo crear la experiencia");
  } finally {
    setIsSubmitting(false);
  }
};

const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ymu1yrch");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgikbcdmg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Error subiendo imagen");
    }

    const data = await res.json();
    console.log("Imagen subida:", data.secure_url);

    setImageUrl(data.secure_url);
  } catch (error) {
    console.error("Error subiendo imagen:", error);
  }
};

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-[#d8d4cb] bg-white px-4 py-3 text-[#1a3d2b] outline-none transition focus:border-[#1a3d2b] focus:ring-2 focus:ring-[#1a3d2b]/20";
  const labelClassName = "text-sm font-semibold text-[#1a3d2b]";

  return (
      <section className="min-h-screen bg-gray-50 w-full flex ">
          <InstructorSidebar/>
      <div className="w-full mx-auto px-10 py-10  flex-1">
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
                    step="1"
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
                <label className="mb-1 rounded-xl bg-[#e7b52c] px-6 py-3 font-semibold text-[#1f1f1f] transition hover:bg-[#d7a61e] disabled:cursor-not-allowed disabled:opacity-50" htmlFor="fileUpload">
                  Seleccionar imágen
                </label>
                <input
  type="file"
  accept="image/*"
  onChange={handleUpload}
  className="hidden"
  id="fileUpload"
/>
                <p className="mt-2 text-sm text-[#6d706c]">Imagenes seleccionadas: {images.length}</p>
                {imageUrl && (
  <img
    src={imageUrl}
    alt="preview"
    className="w-40 h-28 object-cover rounded mt-2"
  />
)}
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
