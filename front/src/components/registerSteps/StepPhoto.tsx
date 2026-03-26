"use client";
import { Field, useFormikContext } from "formik";

interface StepProps {
  prev: () => void;
  setFieldValue: (field: string, value: any) => void;
}

export default function StepPhoto({ prev, setFieldValue }: StepProps) {
  const { values, handleSubmit, errors } = useFormikContext<any>();

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

    const data = await res.json();
    setFieldValue("profilePic", data.secure_url);
    } catch (error) {
    console.error("Error subiendo imagen:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
  <div className="mx-auto flex w-full max-w-[450px] flex-col p-6">
    <div className="mb-6 w-full text-left">
      <h2 className="mb-2 text-2xl font-bold text-[#1e3c31]">Foto de perfil</h2>
      <p className="text-sm text-gray-600">
        Elige una foto que ayude a tus clientes a conocerte.
      </p>
    </div>

    <div className="w-full space-y-6">
      {/* Preview de la foto */}
      <div className="flex items-center gap-4 border-y border-gray-100 p-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
          {values.profilePic ? (
            <img
              src={values.profilePic}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-[#1e3c31]">
            {values.firstName || "Instructor"}
          </h3>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            📇 Instructor
          </p>
        </div>
      </div>

      {/* Upload imagen */}
      <div>
  <label
    htmlFor="fileUpload"
    className="inline-block cursor-pointer rounded-xl bg-[#f0ba3c] px-6 py-3 font-semibold text-[#1f1f1f] transition hover:bg-[#d7a61e]"
  >
    Seleccionar archivo
  </label>

  <input
    id="fileUpload"
    type="file"
    accept="image/*"
    onChange={handleUpload}
    className="hidden"
  />

  <p className="mt-1 text-[10px] italic text-gray-400">
    * Selecciona una imagen desde tu dispositivo
  </p>
</div>

      {/* Consejos */}
      <div className="space-y-3 pt-4">
        <h4 className="text-sm font-bold text-[#1e3c31]">¿Qué necesita tu foto?</h4>
        <ul className="space-y-2">
          {[
            "Debes estar mirando al frente",
            "Tú debes ser la única persona en la foto",
            "Tu rostro debe estar visible",
            "Usa una foto con alta resolución",
            "No uses filtros",
          ].map((text, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-gray-600">✓</span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Botones */}
      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={prev}
          className="text-sm font-medium text-gray-400 hover:underline"
        >
          Volver al paso anterior
        </button>

        <button
          type="submit"
          className="min-w-[150px] rounded-2xl bg-[#f0ba3c] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#e0ab2c]"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</div>
  );
}