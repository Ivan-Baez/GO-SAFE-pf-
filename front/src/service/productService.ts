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

// Datos de demostración para cuando no hay backend
const DEMO_EXPERIENCES: Record<string, IProduct> = {
    "demo-1": {
        id: "demo-1",
        name: "Climbing en Suesca",
        price: 80,
        description: "Una experiencia increíble de escalada en roca en Suesca, uno de los destinos más populares de Colombia. Perfecto para escaladores intermedio que buscan mejorar sus habilidades en un ambiente natural auténtico.",
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: 15,
    },
    "demo-2": {
        id: "demo-2",
        name: "Escalada en El Peñol",
        price: 120,
        description: "Desafía los 2147 escalones del famoso Peñol de Guatapé. Una aventura extrema para escaladores avanzados que buscan la adrenalina al máximo. Incluye guía especializado y equipo de seguridad.",
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: 10,
    },
    "demo-3": {
        id: "demo-3",
        name: "Climbing en La Mojarra",
        price: 60,
        description: "Introducción perfecta al mundo de la escalada. Ubicado en Santander, este lugar es ideal para principiantes que quieren aprender de forma segura y divertida con monitores certificados.",
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: 20,
    },
};

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
        // Primero verificar si es un ID de demostración
        if (id in DEMO_EXPERIENCES) {
            return DEMO_EXPERIENCES[id];
        }

        // Si no, intentar obtener del backend
        const response = await getProductsDB();
        const productFiltered = response.find((product) => product.id.toString() === id);    
        if(!productFiltered) throw new Error('Product not found');
        return productFiltered;  
    }  catch (error: unknown) {
        // Si falla el backend pero es un ID demo, devolverlo
        if (id in DEMO_EXPERIENCES) {
            return DEMO_EXPERIENCES[id];
        }
        
        const message = error instanceof Error ? error.message : "Error obteniendo producto";
        if (message === "Product not found") {
            throw new Error("No se encontro la experiencia solicitada");
        }
        throw new Error(message);
    } 
};

//conexion con el back