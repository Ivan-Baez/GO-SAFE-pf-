"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle } from "lucide-react";

function FailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("external_reference");

  return (
    <section className="min-h-screen bg-[#f7f4ee] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#1a3d2b] mb-2">
          Pago no completado
        </h1>
        <p className="text-gray-500 mb-6">
          Hubo un problema al procesar tu pago. Puedes intentarlo de nuevo.
        </p>

        {orderId && (
          <p className="text-xs text-gray-400 mb-6">
            Orden: <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-[#1a3d2b] text-white font-semibold hover:bg-[#14301f] transition"
          >
            Volver al inicio
          </Link>
          <Link
            href="/experiences"
            className="w-full py-3 rounded-xl border border-[#1a3d2b] text-[#1a3d2b] font-semibold hover:bg-[#f0ede6] transition"
          >
            Ver experiencias
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense>
      <FailureContent />
    </Suspense>
  );
}
