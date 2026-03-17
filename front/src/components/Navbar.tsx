"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { UserRound, ShoppingCart, LogOutIcon } from 'lucide-react';

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

      {/* CONTENIDO */}
      {userData?.token ? (
      <div className="flex items-center gap-6 w-full justify-end">
      
      {/* BUSCADOR */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Busca por aventura"
          className="w-full max-w-md px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 
          focus:bg-white focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308] 
          outline-none transition-all duration-300 text-sm shadow-sm"
        />
      </div>

      {/* ACCIONES */}
      <div className="flex items-center gap-4">
        
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] justify-center text-center"
        >
          <UserRound size={18} />
          <span>Dashboard</span>
        </Link>

        <Link 
          href="/cart" 
          className="flex items-center gap-2 px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] justify-center text-center"
        >
          <ShoppingCart size={18} />
          <span>Carrito</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] justify-center text-center"
        >
          <LogOutIcon size={18} />
          <span>Salir</span>
        </button>
      </div>
      </div>

      ) : (
      <div className="flex gap-4">
      <Link
        href="/login"
        className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 flex items-center justify-center gap-2 text-center"
      >
        Ingresar
      </Link>

      <Link
        href="/RegisterForBoth"
        className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 flex items-center justify-center gap-2 text-center"
      >
        Registrarme
      </Link>
      </div>
      )}
    </nav>
  )}