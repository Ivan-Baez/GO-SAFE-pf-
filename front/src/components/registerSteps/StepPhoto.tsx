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
    <div className="flex flex-col items-center w-full max-w-[450px] mx-auto p-6 min-h-screen bg-white">

      <div className="w-full text-left mb-6">
        <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Foto de perfil</h2>
        <p className="text-gray-600 text-sm">
          Elije una foto que ayude a tus clientes a conocerte.
        </p>
      </div>

      <div className="w-full space-y-6">
        {/* Preview de la foto */}
        <div className="flex items-center gap-4 p-4 border-t border-b border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
            {values.profilePic ? (
              <img
                src={values.profilePic}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            )} 
          </div>

          <div>
            <h3 className="font-bold text-[#1e3c31]">
              {values.firstName || "Instructor"}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              📇 Instructor
            </p>
          </div>
        </div>
        
        {/* Upload imagen */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="inputStyles w-full text-sm"
          />

          <p className="text-[10px] text-gray-400 mt-1 italic">
            * Selecciona una imagen desde tu dispositivo
          </p>
        </div> 
        {/* Consejos */}
        <div className="space-y-3 pt-4">
          <h4 className="font-bold text-[#1e3c31] text-sm">Qué necesita tu foto?</h4>
          <ul className="space-y-2">
            {[
              "Debes estar mirando al frente",
              "Tú debes ser la única persona en la foto",
              "Tu rostro debe estar visible",
              "Usa una foto con alta resolución",
              "No uses filtros"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-gray-600">✓</span> {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-between gap-4 pt-6">

          <button
            type="button"
            onClick={prev}
            className="text-gray-400 text-sm font-medium hover:underline"
          >
            Volver al paso anterior
          </button>

          <button
            type="submit"
            className="min-w-[150px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
          >
            Continuar
          </button>

        </div>
      </div>
    </div>
  );
}