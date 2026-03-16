import { IProduct } from "@/types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ExperienceApi {
    id: string;
    title: string;
    description: string;
    price: number | string;
    capacity?: number;
}

const DEFAULT_EXPERIENCE_IMAGE = "/Decore2.png";

export async function getProductsDB(): Promise<IProduct[]> {
    try {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL no esta definido");
    }

    const response = await fetch(`${API_URL}/experiences`, {
        cache: "force-cache"
    });

    if (!response.ok) {
        throw new Error(`No se pudo obtener productos: ${response.status}`);
    }

    const apiProducts: ExperienceApi[] = await response.json();
    const products: IProduct[] = apiProducts.map((item) => ({
        id: item.id,
        name: item.title,
        price: Number(item.price),
        description: item.description,
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: item.capacity ?? 1,
    }));

    return products;  
    }  catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Error obteniendo productos";
        if (message.toLowerCase().includes("fetch failed")) {
            throw new Error("No se pudo conectar con el backend. Verifica que la API este corriendo en http://localhost:3000");
        }
        throw new Error(message);
    } 
};

export async function getProductByID(id: string): Promise<IProduct> {
    try {
    const response = await getProductsDB();
    const productFiltered = response.find((product) => product.id.toString() === id);    
    if(!productFiltered) throw new Error('Product not found');
    return productFiltered;  
    }  catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Error obteniendo producto";
        if (message === "Product not found") {
            throw new Error("No se encontro la experiencia solicitada");
        }
        throw new Error(message);
    } 
};

//conexion con el back