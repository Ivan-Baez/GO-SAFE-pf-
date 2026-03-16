"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {

  const {userData,handleLogout} = useAuth ();

  return (
    <nav className="flex items-center justify-between bg-[#e6dfd5] px-10 py-3 w-full">
      <Link href= "/"
        className="cursor-pointer"
      >
        <Image
          src="/logo.png"
          alt="GoSafe logo"
          width={80}
          height={80}
        />
      </Link>
      <div>
        {userData?.token ? (
          <>
        <div>
          {/* 1. Barra de búsqueda  */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Busca por aventura"
            className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 
                     focus:bg-white focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308] 
                     outline-none transition-all duration-300 text-sm shadow-sm"
          />
        </div>
        {/* 2. Acciones del Usuario */}
      </div>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 
                   bg-white px-4 py-2 rounded-xl border border-gray-100 hover:shadow-sm transition-all active:scale-95"
            >
            <span className="text-base">👤</span> Dashboard
            </Link>

            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 
                   relative bg-white px-4 py-2 rounded-xl border border-gray-100 hover:shadow-sm transition-all active:scale-95"
            >
              <span className="text-base">🛒</span> Carrito
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 
                   hover:bg-red-50 px-4 py-2 rounded-xl transition-all active:scale-95"
            >
             <span>🚪</span> Salir
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5"
            >
              Ingresar
            </Link>

            <Link
              href="/RegisterForBoth"
              className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5"
            >
              Registrarme
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}