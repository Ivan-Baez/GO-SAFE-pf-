"use client";
import { useState } from "react";
import { Field, useFormikContext } from "formik";
import { uploadCertificate } from "@/service/authService";

interface StepProps {
  prev: () => void;
}

export default function CertificateStep({ prev }: StepProps) {
  const { setFieldValue, values } = useFormikContext<any>();
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

   const handleCertificateChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setFileName(file.name);
    // por ahora guardamos el archivo en Formik
    setFieldValue("certificadoFile", file);

    try {
      setUploading(true);
      // 1. subír el archivo Cloudinary o backend:
      const uploadedUrl = await uploadCertificate(file);
      // 2. recibír la URL
      setFieldValue("certificadoUrl", uploadedUrl);
    } catch (error: any) {
      console.error("Error subiendo certificado:", error);
      setUploadError(error.message || "No se pudo subir el certificado");
      // 3. guardár esa URL en certificadoUrl
      setFieldValue("certificadoUrl", "");
    } finally {
      setUploading(false);
    }
  };

  return(
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">

      <div className="w-full space-y-6 z-10">

        <div className="w-full text-left mb-6">
          <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Certificación</h2>
          <p className="text-gray-600 text-sm">Cuéntanos si tienes algún tipo de certificación.</p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-3 py-4">
          <Field 
            type="checkbox" 
            name="noCertificado" 
            id="cert" 
            className="w-6 h-6 rounded border-gray-300 text-[#f0ba3c] focus:ring-[#f0ba3c] cursor-pointer"
          />
          <label htmlFor="cert" className="text-gray-700 italic text-sm">
            No cuento con una certificación
          </label>
        </div>

        <div className={`space-y-4 transition-opacity ${values.noCertificado ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>

          {/* Nombre certificado */}
          <div>
            <label className="block font-bold text-[#1e3c31] mb-2">Certificación</label>
            <Field 
              name="nombreCertificado" 
              type="text" 
              placeholder="Certificado" 
              className="inputStyles w-full"
            />
            <p className="text-[11px] text-gray-500 italic mt-1">
              Escríbelo tal como aparece en tu certificado
            </p>
          </div>

          {/* URL certificado */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center space-y-4 mt-10">
            <span className="font-bold text-[#1e3c31]">Sube tu certificado</span>

            <label className="cursor-pointer bg-[#f0ba3c] text-white font-semibold px-5 py-3 rounded-2xl hover:bg-[#dca91f] transition">
              Seleccionar archivo
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleCertificateChange}
              />
            </label>

            {fileName && (
              <p className="text-sm text-gray-700 text-center">
                Archivo seleccionado: {fileName}
              </p>
            )}

            {uploading && (
              <p className="text-sm text-[#1e3c31]">Subiendo certificado...</p>
            )}

            {!!values.certificadoUrl && !uploading && (
              <p className="text-sm text-green-600 text-center">
                Certificado subido correctamente
              </p>
            )}

            {uploadError && (
              <p className="text-sm text-red-500 text-center">{uploadError}</p>
            )}

            <p className="text-[11px] text-gray-600 text-center">
              Sólo se aceptarán documentos auténticos. Formatos: PDF, JPG, PNG.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-between gap-4 pt-6">

          <button 
            type="button" 
            onClick={prev}
            className="text-gray-400 text-sm font-medium hover:underline mt-3"
          >
            Volver al paso anterior
          </button>

          <button 
            type="submit"
            disabled={uploading}
            className="w-full min-w-[150px] max-w-[280px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
          >
            Continuar
          </button>

        </div>

      </div>
    </div>
  )
}