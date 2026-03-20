"use client";
import { useState } from "react";
import { Field, useFormikContext } from "formik";
import { uploadCertificate } from "@/service/authService";

interface StepProps {
  prev: () => void;
}

export default function CertificateStep({ prev }: StepProps) {
  const { setFieldValue, values } = useFormikContext<any>();

  const [showSecondCertificate, setShowSecondCertificate] = useState(false);

  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");

  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);

  const [uploadError1, setUploadError1] = useState("");
  const [uploadError2, setUploadError2] = useState("");

  const handleCertificateChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    certificateNumber: 1 | 2
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (certificateNumber === 1) {
      setUploadError1("");
      setFileName1(file.name);

      try {
        setUploading1(true);
        const uploadedUrl = await uploadCertificate(file);
        setFieldValue("url", uploadedUrl);
      } catch (error: any) {
        console.error("Error subiendo certificado 1:", error);
        setUploadError1(error.message || "No se pudo subir el certificado");
        setFieldValue("url", "");
      } finally {
        setUploading1(false);
      }
    }

    if (certificateNumber === 2) {
      setUploadError2("");
      setFileName2(file.name);

      try {
        setUploading2(true);
        const uploadedUrl = await uploadCertificate(file);
        setFieldValue("url2", uploadedUrl);
      } catch (error: any) {
        console.error("Error subiendo certificado 2:", error);
        setUploadError2(error.message || "No se pudo subir el certificado");
        setFieldValue("url2", "");
      } finally {
        setUploading2(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 min-h-screen bg-white">
      <div className="w-full space-y-6 z-10">
        <div className="w-full text-left mb-6">
          <h2 className="text-2xl font-bold text-[#1e3c31] mb-2">Certificación</h2>
          <p className="text-gray-600 text-sm">
            Cuéntanos si tienes algún tipo de certificación.
          </p>
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

        <div
          className={`space-y-6 transition-opacity ${
            values.noCertificado ? "opacity-30 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Certificado 1 */}
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-[#1e3c31] mb-2">
                Certificación
              </label>
              <Field
                name="title"
                type="text"
                placeholder="Certificado"
                className="inputStyles w-full"
              />
              <p className="text-[11px] text-gray-500 italic mt-1">
                Escríbelo tal como aparece en tu certificado
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center space-y-4 mt-6">
              <span className="font-bold text-[#1e3c31]">Sube tu certificado</span>

              <label className="cursor-pointer bg-[#f0ba3c] text-white font-semibold px-5 py-3 rounded-2xl hover:bg-[#dca91f] transition">
                Seleccionar archivo
                <input
                  name="url"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleCertificateChange(e, 1)}
                />
              </label>

              {fileName1 && (
                <p className="text-sm text-gray-700 text-center">
                  Archivo seleccionado: {fileName1}
                </p>
              )}

              {uploading1 && (
                <p className="text-sm text-[#1e3c31]">Subiendo certificado...</p>
              )}

              {!!values.url && !uploading1 && (
                <p className="text-sm text-green-600 text-center">
                  Certificado subido correctamente
                </p>
              )}

              {uploadError1 && (
                <p className="text-sm text-red-500 text-center">{uploadError1}</p>
              )}

              <p className="text-[11px] text-gray-600 text-center">
                Sólo se aceptarán documentos auténticos. Formatos: PDF, JPG, PNG.
              </p>
            </div>
          </div>

          {/* Botón agregar segundo certificado */}
          {!showSecondCertificate && (
            <button
              type="button"
              onClick={() => setShowSecondCertificate(true)}
              className="text-sm font-semibold text-[#1e3c31] underline hover:text-[#163127]"
            >
              + Agregar otro certificado
            </button>
          )}

          {/* Certificado 2 */}
          {showSecondCertificate && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#1e3c31]">Segundo certificado</h3>

                <button
                  type="button"
                  onClick={() => {
                    setShowSecondCertificate(false);
                    setFieldValue("title2", "");
                    setFieldValue("url2", "");
                    setFieldValue("certificadoFile2", null);
                    setFileName2("");
                    setUploadError2("");
                  }}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Quitar
                </button>
              </div>

              <div>
                <label className="block font-bold text-[#1e3c31] mb-2">
                  Certificación
                </label>
                <Field
                  name="title2"
                  type="text"
                  placeholder="Segundo certificado"
                  className="inputStyles w-full"
                />
                <p className="text-[11px] text-gray-500 italic mt-1">
                  Este segundo certificado es opcional
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center space-y-4 mt-6">
                <span className="font-bold text-[#1e3c31]">
                  Sube tu segundo certificado
                </span>

                <label className="cursor-pointer bg-[#f0ba3c] text-white font-semibold px-5 py-3 rounded-2xl hover:bg-[#dca91f] transition">
                  Seleccionar archivo
                  <input
                    name="url2"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleCertificateChange(e, 2)}
                  />
                </label>

                {fileName2 && (
                  <p className="text-sm text-gray-700 text-center">
                    Archivo seleccionado: {fileName2}
                  </p>
                )}

                {uploading2 && (
                  <p className="text-sm text-[#1e3c31]">
                    Subiendo segundo certificado...
                  </p>
                )}

                {!!values.url2 && !uploading2 && (
                  <p className="text-sm text-green-600 text-center">
                    Segundo certificado subido correctamente
                  </p>
                )}

                {uploadError2 && (
                  <p className="text-sm text-red-500 text-center">{uploadError2}</p>
                )}

                <p className="text-[11px] text-gray-600 text-center">
                  Sólo se aceptarán documentos auténticos. Formatos: PDF, JPG, PNG.
                </p>
              </div>
            </div>
          )}
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
            disabled={uploading1 || uploading2}
            className="w-full min-w-[150px] max-w-[280px] bg-[#f0ba3c] hover:bg-[#e0ab2c] text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}