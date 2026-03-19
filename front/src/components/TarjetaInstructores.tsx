"use client";
import { IService } from "@/types/types";
import Link from "next/link";

const Card = ({ id, name, place, image, sport, modality }: IService) => {
    const imageSrc = image || "/Decore2.png";

    return (
        <Link
            href={`/instructors/${id}`}
            className="group overflow-hidden rounded-2xl border border-[#dfd6c9] bg-white shadow-[0_10px_26px_rgba(26,61,43,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(26,61,43,0.18)]"
        >
            <div className="relative h-52 overflow-hidden bg-[#dce7dc]">
                <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={imageSrc}
                    alt={name}
                />
                <div className="absolute left-4 top-4 rounded-full bg-[#1a3d2b] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    Instructor {id}
                </div>
            </div>

            <div className="space-y-3 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7c71]">
                    {sport || "Aventura guiada"}
                </p>
                <h3 className="text-xl font-extrabold leading-tight text-[#163225]">{name}</h3>
                <p className="text-sm text-[#5a5a5a]">{modality ? `${modality} en ${place}` : place}</p>

                <div className="flex items-center gap-2 rounded-xl bg-[#f4efe6] px-3 py-2 text-sm font-semibold text-[#2f4a39]">
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.5 0C3.46 0 1 2.46 1 5.5c0 4.125 5.5 10.5 5.5 10.5S12 9.625 12 5.5C12 2.46 9.54 0 6.5 0zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                            fill="#e8633a"
                        />
                    </svg>
                    <span>{place}</span>
                </div>
            </div>
        </Link>
    );
};

export default Card