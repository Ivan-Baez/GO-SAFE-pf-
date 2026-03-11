"use client"
import Card from "./TarjetaInstructores";
import Link from "next/link";

export default function HeroHome() {
  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* FONDO VERDE FULL WIDTH */}
      <div
        className="
        absolute
        right-0
        top-0
        w-250[1000px]
        h-125[500px]
        bg-[url('/greenBlob.png')]
        bg-no-repeat
        bg-contain
        pointer-events-none
        "
      />

      {/* CONTENIDO CENTRADO */}
      <div className="max-w-6xl mx-auto px-8 py-20 flex justify-between gap-10">

        {/* TEXTO */}
        <Link href="/product">
          <div className="max-w-xl">
            <p className="font-poppins font-semibold text-amber-600 tracking-wide">
              ENCUENTRA LOS MEJORES INSTRUCTORES
            </p>
            <Card id={1} name="Instructor Name" place="Location" image="/image.png" sport="Sport Type" />

            <h1 className="font-manjari text-6xl text-gray-900 mt-4 leading-tight">
              Viaja, disfruta <br />
              y mantente seguro
            </h1>

            <p className="font-manjari text-lg text-gray-600 mt-6">
              Vuélvete parte de nuestra comunidad, <br />
              conéctate con instructores apasionados <br />
              y experiencias inolvidables.
            </p>

            <button className="mt-8 bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-lg shadow">
              Descubre más
            </button>
          </div>
        </Link>

        {/* IMAGEN */}
        <img
          src="/Person1.png"
          alt="Person"
          className="relative max-h-130[520px]"
        />

      </div>

    </section>
  );
}