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
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Busca por aventura"
            className="w-125 px-4 py-2 rounded-md bg-gray-100 outline-none"
          />
        </div>
      </div>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              👤 Dashboard
            </Link>

            <Link 
              href="/cart" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              🛒 Carrito
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              🚪 Cerrar sesión
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
