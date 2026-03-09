"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between bg-[#e6dfd5] px-10 py-3 w-full">

      {/* Logo */}
      <div
        className="cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/logo.png"
          alt="GoSafe logo"
          width={80}
          height={80}
        />
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Busca por aventura"
          className="w-125 px-4 py-2 rounded-md bg-gray-100 outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5"
        >
          Ingresar
        </button>

        <button
          onClick={() => router.push("/register")}
          className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5"
        >
          Registrarme
        </button>
      </div>

    </nav>
  );
}
