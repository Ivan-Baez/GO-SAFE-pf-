"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toastError, toastSuccess } from "@/lib/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function CreatePublicationView() {
  const router = useRouter();
  const { userData } = useAuth();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ymu1yrch");

    try {
      setIsUploading(true);

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
      setImageUrl(data.secure_url);
      toastSuccess("Imagen subida correctamente");
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      toastError("No se pudo subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!userData?.token) {
        toastError("Debes iniciar sesión para publicar");
        return;
      }

      if (!title.trim() || !text.trim()) {
        toastError("Completa título y contenido");
        return;
      }

      setIsSubmitting(true);

      const payload = {
        title: title.trim(),
        text: text.trim(),
        imageUrl: imageUrl || "",
      };

      console.log("PAYLOAD BLOG:", payload);

      const response = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("STATUS BLOG:", response.status);
      console.log("RESPONSE BLOG:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Error al crear publicación");
      }

      toastSuccess("Publicación creada correctamente");
      router.push("/blogs");
    } catch (error: any) {
      console.error("Error creando publicación:", error);
      toastError(error.message || "No se pudo crear la publicación");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f7f4ee] px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ece7df] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Blog
          </p>
          <h1 className="text-3xl font-bold text-[#1a3d2b]">
            Crear publicación
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Comparte noticias, experiencias o consejos con la comunidad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1a3d2b]">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe un título para tu publicación"
              className="w-full rounded-xl border border-[#d9d4cc] px-4 py-3 outline-none focus:border-[#1a3d2b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1a3d2b]">
              Imagen de portada
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="blogImageUpload"
            />

            <label
              htmlFor="blogImageUpload"
              className="inline-block cursor-pointer rounded-xl bg-[#e7b52c] px-6 py-3 font-semibold text-[#1f1f1f] transition hover:bg-[#d7a61e]"
            >
              {isUploading ? "Subiendo..." : "Seleccionar imagen"}
            </label>

            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-52 w-full rounded-2xl object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#1a3d2b]">
              Contenido
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe el contenido de la publicación..."
              rows={8}
              className="w-full rounded-xl border border-[#d9d4cc] px-4 py-3 outline-none focus:border-[#1a3d2b]"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="rounded-xl bg-[#1a3d2b] px-6 py-3 font-semibold text-white transition hover:bg-[#163324] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/blogs")}
              className="rounded-xl border border-[#d9d4cc] px-6 py-3 font-semibold text-[#1a3d2b] transition hover:bg-[#f5f1ea]"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}