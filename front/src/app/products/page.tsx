import Link from "next/link";
import { getProductsDB } from "@/service/productService";

export default async function ProductsPage() {
  try {
    const products = await getProductsDB();

    return (
      <section className="min-h-screen w-full bg-[#f5f2eb] px-6 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-extrabold text-[#1a3d2b]">Experiencias</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={String(product.id)}
                href={`/products/${product.id}`}
                className="rounded-2xl border border-[#e8decd] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-[#1a1a1a]">{product.name}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-[#545454]">{product.description}</p>
                <p className="mt-4 text-xl font-extrabold text-[#1a3d2b]">${product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudieron cargar las experiencias";

    return (
      <section className="flex min-h-[60vh] w-full items-center justify-center bg-[#f5f2eb] px-6 py-14">
        <div className="max-w-xl rounded-2xl border border-[#eadfce] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#1a3d2b]">No pudimos cargar experiencias</h1>
          <p className="mt-3 text-sm text-[#4a4a4a]">{message}</p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-block rounded-xl bg-[#1a3d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#225239]"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
