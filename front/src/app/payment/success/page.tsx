"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  const orderId = searchParams.get("external_reference");
  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id");
  const status = searchParams.get("collection_status") || searchParams.get("status");

  useEffect(() => {
    if (!orderId || !paymentId || confirmed) return;

    // Notify backend to sync order status with MP
    fetch(`${API_URL}/orders/${orderId}/confirm/${paymentId}`, {
      method: "POST",
    })
      .then(() => setConfirmed(true))
      .catch(() => setConfirmed(true)); // show success UI regardless
  }, [orderId, paymentId, confirmed]);

  return (
    <section className="min-h-screen bg-[#f7f4ee] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={64} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#1a3d2b] mb-2">
          ¡Pago exitoso!
        </h1>
        <p className="text-gray-500 mb-6">
          Tu reserva fue confirmada. Pronto recibirás los detalles por email.
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
            href="/dashboard"
            className="w-full py-3 rounded-xl border border-[#1a3d2b] text-[#1a3d2b] font-semibold hover:bg-[#f0ede6] transition"
          >
            Ver mis reservas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
