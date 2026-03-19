"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type CreateExperienceFormValues = {
  title: string;
  category: string;
  place: string;
  startDateTime: string;
  endDateTime: string;
  price: string;
  description: string;
};

const EMPTY_VALUES: CreateExperienceFormValues = {
  title: "",
  category: "",
  place: "",
  startDateTime: "",
  endDateTime: "",
  price: "",
  description: "",
};

export default function CreateExperienceForm() {
  const [values, setValues] = useState<CreateExperienceFormValues>(EMPTY_VALUES);
  const [images, setImages] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...values,
      price: Number(values.price),
      duration: computedDuration,
      images,
    };

    console.log("Nueva experiencia:", payload);

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear experiencia</h1>
      <p>
        Este formulario se limpia en cada envio para poder crear una experiencia nueva desde cero.
      </p>

      <div>
        <label htmlFor="title">Titulo de la experiencia</label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="category">Categoria</label>
        <input
          id="category"
          name="category"
          type="text"
          value={values.category}
          onChange={handleChange}
          placeholder="Ej: Climbing"
          required
        />
      </div>

      <div>
        <label htmlFor="place">Lugar</label>
        <input
          id="place"
          name="place"
          type="text"
          value={values.place}
          onChange={handleChange}
          placeholder="Ciudad, pais"
          required
        />
      </div>

      <div>
        <label htmlFor="images">Imagenes del lugar</label>
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
          required
        />
        <p>Imagenes seleccionadas: {images.length}</p>
      </div>

      <div>
        <label htmlFor="startDateTime">Inicio (dia y hora)</label>
        <input
          id="startDateTime"
          name="startDateTime"
          type="datetime-local"
          value={values.startDateTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="endDateTime">Fin (dia y hora)</label>
        <input
          id="endDateTime"
          name="endDateTime"
          type="datetime-local"
          value={values.endDateTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Duracion estimada</label>
        <output>{computedDuration || "Completa fecha/hora de inicio y fin"}</output>
      </div>

      <div>
        <label htmlFor="price">Precio</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={values.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripcion</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <button type="submit">Guardar experiencia</button>
      <button type="button" onClick={resetForm}>
        Limpiar formulario
      </button>
    </form>
  );
}
