"use client";
import Link from "next/link";

export default function CartView() {
  // Placeholder for cart items - will be populated with actual data
  const cartItems: any[] = [];

  return (
    <div className="mt-12 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Tu Carrito</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-gray-600 mb-6">Tu carrito está vacío</p>
          <Link href="/">
            <button className="px-6 py-3 bg-[#2d5016] text-white rounded hover:bg-[#1f3a10]">
              Continuar Comprando
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-300 rounded"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="text-lg font-semibold">x{item.quantity}</div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <span className="text-2xl font-bold">Total: $0</span>
          </div>

          <p className="w-full py-3 text-center text-sm text-gray-500">
            El pago se gestiona por API externa en una siguiente fase.
          </p>
        </div>
      )}
    </div>
  );
}
