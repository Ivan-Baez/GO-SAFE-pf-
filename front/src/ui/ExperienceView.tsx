"use client";

import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ExperienceView: React.FC<IProduct> = ({ name, id, image, description, price }) => {
    const router = useRouter();
    const { userData } = useAuth();

    const handleAddToCart = () => {
        if (!userData?.token) {
            alert("Inicia sesion para agregar la aventura al carrito");
            router.push("/login");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]") as IProduct[];
        const productExist = cart.find((item: IProduct) => item.id === id);

        if (productExist) {
            alert("La aventura ya se encuentra en el carrito");
            return;
        }

        cart.push({
            id,
            name,
            image,
            description,
            price,
            categoryId: 0,
            stock: 1,
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Aventura agregada al carrito");
    };

    return (
        <section className="w-full bg-[#f5f2eb] px-6 py-10 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
                <div className="relative h-85 overflow-hidden rounded-2xl md:h-115">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="flex flex-col justify-between gap-6">
                    <div>
                        <p className="mb-2 inline-block rounded-full bg-[#dce9dc] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#1a3d2b]">
                            Go Safe Experience
                        </p>
                        <h1 className="text-3xl font-extrabold leading-tight text-[#1a1a1a] md:text-4xl">{name}</h1>
                        <p className="mt-4 text-sm leading-7 text-[#3f3f3f] md:text-base">{description}</p>
                    </div>

                    <div className="rounded-2xl border border-[#e7e1d7] bg-[#fcfaf7] p-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#5b5b5b]">Precio</p>
                        <div className="mt-2 flex items-end gap-2">
                            <span className="text-4xl font-black text-[#1a3d2b]">${price}</span>
                            <span className="pb-1 text-sm font-semibold text-[#5d5d5d]">USD</span>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={handleAddToCart}
                                className="rounded-xl bg-[#1a3d2b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#225239]"
                            >
                                Agregar al carrito
                            </button>
                            <button
                                onClick={() => router.push("/cart")}
                                className="rounded-xl border border-[#1a3d2b] px-5 py-3 text-sm font-bold text-[#1a3d2b] transition hover:bg-[#eef4ee]"
                            >
                                Ver carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceView;