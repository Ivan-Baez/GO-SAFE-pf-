"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { UserRound, LogOutIcon, Text, LogInIcon, UserPen } from "lucide-react";

import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
}

export default function Navbar() {
  const { userData, handleLogout } = useAuth();

  let userRole = "";

  if (userData?.token) {
    try {
      const decoded = jwtDecode<DecodedToken>(userData.token);
      userRole = (decoded.role || "").toLowerCase();
    } catch {
      userRole = "";
    }
  }

  const avatarSrc = userData?.user?.profilePic?.trim();
  const displayName = userData?.user?.name?.trim() || "Usuario";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="flex items-center justify-between bg-[#e6dfd5] px-10 py-3 w-full gap-6">
      <Link href="/" className="cursor-pointer shrink-0">
        <Image
          src="/logo.png"
          alt="GoSafe logo"
          width={80}
          height={80}
        />
      </Link>

      {userData?.token ? (
        <div className="flex items-center gap-6 w-full justify-end">
          {/* Buscador */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Busca por aventura"
              className="w-full max-w-md px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 
              focus:bg-white focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308] 
              outline-none transition-all duration-300 text-sm shadow-sm"
            />
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/dashboard"
              className="group"
              title="Ir al dashboard"
              aria-label="Ir al dashboard"
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={`Foto de perfil de ${displayName}`}
                  className="h-11 w-11 rounded-full border-2 border-[#1a3d2b] object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1a3d2b] bg-[#dce6de] text-sm font-bold text-[#1a3d2b] transition group-hover:scale-105">
                  {avatarInitial}
                </div>
              )}
            </Link>
            <Link
            href="/blogs"
            className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 flex items-center justify-center gap-2 text-center"
            >
            <Text size={18} />
            <span>Blog</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 text-center"
            >
              <UserRound size={18} />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 text-center"
            >
              <LogOutIcon size={18} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 ml-auto">
    
          <Link
            href="/login"
            className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 flex items-center justify-center gap-2 text-center"
          >
            <LogInIcon size={18} />
            <span>Ingresar</span>
          </Link>

          <Link
            href="/RegisterForBoth"
            className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 flex items-center justify-center gap-2 text-center"
          >
            <UserPen size={18} />
          <span>Registrarme</span>
          </Link>
        </div>
      )}
    </nav>
  );
}