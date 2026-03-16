import { getProductByID } from "@/service/productService";
import ExperienceView from "@/ui/ExperienceView";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    productID: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productID } = await params;

  try {
    const productDetail = await getProductByID(productID);
    return <ExperienceView {...productDetail} />;
  } catch (error) {
    const message = error instanceof Error ? error.message : "No fue posible cargar la experiencia";

    return (
      <section className="flex min-h-[60vh] w-full items-center justify-center bg-[#f5f2eb] px-6 py-14">
        <div className="max-w-xl rounded-2xl border border-[#eadfce] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#1a3d2b]">Ups, no pudimos cargar esta experiencia</h1>
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
