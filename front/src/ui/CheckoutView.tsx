"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/types";

type CardForm = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
};

type CardFormErrors = {
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const validate = (form: CardForm): CardFormErrors => {
  const errors: CardFormErrors = {};
  const rawCard = form.cardNumber.replace(/\s/g, "");

  if (rawCard.length !== 16) errors.cardNumber = "Ingresa un numero de tarjeta de 16 digitos";
  if (!form.cardName.trim()) errors.cardName = "Ingresa el nombre tal como aparece en tu tarjeta";

  const [mm, yy] = form.expiry.split("/");
  const month = Number(mm);
  const year = Number("20" + yy);
  const now = new Date();
  if (
    !mm || !yy || form.expiry.length !== 5 ||
    month < 1 || month > 12 ||
    year < now.getFullYear() ||
    (year === now.getFullYear() && month < now.getMonth() + 1)
  ) {
    errors.expiry = "Fecha de vencimiento invalida";
  }

  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = "CVV debe tener 3 o 4 digitos";

  return errors;
};

export default function CheckoutView() {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [form, setForm] = useState<CardForm>({ cardNumber: "", cardName: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<CardFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("checkoutProduct");
      if (raw) setProduct(JSON.parse(raw));
    } catch {
      // producto no disponible
    }
  }, []);

  const handleChange = (field: keyof CardForm, value: string) => {
    let formatted = value;
    if (field === "cardNumber") formatted = formatCardNumber(value);
    if (field === "expiry") formatted = formatExpiry(value);
    if (field === "cvv") formatted = value.replace(/\D/g, "").slice(0, 4);

    setForm((prev) => ({ ...prev, [field]: formatted }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Aquí irá la llamada real al endpoint de pago cuando el back lo exponga
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setPaid(true);
    localStorage.removeItem("checkoutProduct");
  };

  if (paid) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#f5f2eb] px-6 py-14">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center shadow">
          <div className="mb-4 text-5xl">✅</div>
          <h2 className="mb-2 text-2xl font-bold text-[#1a3d2b]">¡Pago realizado!</h2>
          <p className="mb-6 text-sm text-gray-600">
            Tu reserva para <span className="font-semibold">{product?.name}</span> fue confirmada.
          </p>
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-[#1a3d2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#245a3f]"
          >
            Volver al inicio
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[#f5f2eb] px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* TÍTULO */}
        <h1 className="mb-8 text-2xl font-bold text-[#1a3d2b]">Confirmar reserva</h1>

        <div className="grid gap-8 md:grid-cols-5">

          {/* FORMULARIO — ocupa 3 columnas */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 rounded-2xl bg-white p-6 shadow space-y-5"
          >
            <h2 className="text-lg font-bold text-[#1a3d2b]">Datos de pago</h2>

            {/* Número de tarjeta */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Número de tarjeta
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1a3d2b] ${
                    errors.cardNumber ? "border-red-400" : "border-gray-300"
                  }`}
                />
                <span className="absolute right-4 top-3 text-gray-400 text-lg">💳</span>
              </div>
              {errors.cardNumber && (
                <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
              )}
            </div>

            {/* Nombre en tarjeta */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Nombre en la tarjeta
              </label>
              <input
                type="text"
                value={form.cardName}
                onChange={(e) => handleChange("cardName", e.target.value)}
                placeholder="JUAN PEREZ"
                className={`w-full rounded-xl border px-4 py-3 text-sm uppercase outline-none transition focus:ring-2 focus:ring-[#1a3d2b] ${
                  errors.cardName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.cardName && (
                <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>
              )}
            </div>

            {/* Vencimiento + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Vencimiento
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.expiry}
                  onChange={(e) => handleChange("expiry", e.target.value)}
                  placeholder="MM/AA"
                  maxLength={5}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1a3d2b] ${
                    errors.expiry ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.expiry && (
                  <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">CVV</label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={form.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value)}
                  placeholder="•••"
                  maxLength={4}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1a3d2b] ${
                    errors.cvv ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Botón pagar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-500 disabled:opacity-60"
            >
              {isSubmitting ? "Procesando pago..." : `Pagar $${product?.price ?? 0} USD`}
            </button>

            <p className="text-center text-xs text-gray-400">
              🔒 Tus datos de pago están protegidos con cifrado SSL
            </p>
          </form>

          {/* RESUMEN DEL PRODUCTO — ocupa 2 columnas */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow">
              <h2 className="mb-4 text-lg font-bold text-[#1a3d2b]">Resumen</h2>

              {product ? (
                <>
                  {/* Imagen */}
                  <div className="relative h-40 w-full overflow-hidden rounded-xl mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">📍 {product.place}</p>

                  <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>

                  <div className="mt-4 border-t pt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total a pagar</span>
                    <span className="text-lg font-bold text-[#1a3d2b]">${product.price} USD</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">Cargando detalles de la experiencia...</p>
              )}
            </div>

            {/* Beneficios */}
            <div className="rounded-2xl bg-[#f7efe5] p-5">
              <h3 className="mb-3 text-sm font-bold text-[#1a3d2b]">Incluye</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✔ Instructor certificado</li>
                <li>✔ Equipo de seguridad incluido</li>
                <li>✔ Cancelación gratuita hasta 48h antes</li>
                <li>✔ Soporte GoSafe durante la experiencia</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
