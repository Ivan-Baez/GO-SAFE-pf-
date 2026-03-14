"use client"
import Link from 'next/link'
import React from 'react'

function RegisterForBothtView() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6dfd5] px-4">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Regístrate</h1>
        <p className="text-lg text-gray-700">Selecciona la opción correcta de registro que se adecúe a tu perfil</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Opción Usuario */}
        <Link href="/register">
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#1b5e20]">
            <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#1b5e20]">Soy Usuario</h2>
            <p className="text-gray-600 mb-6">Regístrate como usuario para explorar aventuras y experiencias</p>
            <button className="px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#155019]">
                Registrarse como Usuario
            </button>
            </div>
        </div>
        </Link>

        {/* Opción Instructor */}
        <Link href="/process">
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#1b5e20]">
            <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#1b5e20]">Soy Instructor</h2>
            <p className="text-gray-600 mb-6">Regístrate como instructor para crear y compartir tus aventuras</p>
            <button className="px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#155019]">
                Registrarse como Instructor
            </button>
            </div>
        </div>
        </Link>
    </div>

      {/* Link para volver */}
        <div className="mt-12">
            <Link href="/" className="text-[#1b5e20] font-semibold hover:underline">
            ← Volver al inicio
            </Link>
        </div>
    </div>
  )
}

export default RegisterForBothtView