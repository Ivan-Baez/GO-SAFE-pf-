import { IProduct } from "@/types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ExperienceApi {
    id?: string;
    title: string;
    imageUrl?: string;
    location?: string;
    city?: string;
    country?: string;
    category?: string;
    dificulty?: string;
    description: string;
    price: number | string;
    capacity?: number;
    duration?: string;
    ageRange?: string;
}

export interface ExperienceCatalogItem {
    id: string;
    title: string;
    image: string;
    difficulty: string;
    price: number;
    location: string;
    category: string;
}

const DEFAULT_EXPERIENCE_IMAGE = "/Decore2.png";

// Datos de demostración para cuando no hay backend
const DEMO_EXPERIENCES: Record<string, IProduct> = {
    "demo-1": {
        id: "demo-1",
        name: "Climbing en Suesca",
        place:"mexico",
        price: 80,
        description: "Una experiencia increíble de escalada en roca en Suesca, uno de los destinos más populares de Colombia. Perfecto para escaladores intermedio que buscan mejorar sus habilidades en un ambiente natural auténtico.",
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: 15,
    },
    "demo-2": {
        id: "demo-2",
        name: "caminata en El Peñol",
        place:"Medellin",
        price: 120,
        description: "Desafía los 2147 escalones del famoso Peñol de Guatapé. Una aventura extrema para escaladores avanzados que buscan la adrenalina al máximo. Incluye guía especializado y equipo de seguridad.",
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: 10,
    },
    "demo-3": {
        id: "demo-3",
        name: "Escalada en La Mojarra",
        place:"Barranquilla",
        price: 60,
        description: "Introducción perfecta al mundo de la escalada. Ubicado en Santander, este lugar es ideal para principiantes que quieren aprender de forma segura y divertida con monitores certificados.",
        image: DEFAULT_EXPERIENCE_IMAGE,
        categoryId: 0,
        stock: 20,
    },
};

export async function getProductsDB(): Promise<IProduct[]> {
    try {
    const response = await fetch(`${API_URL}/experiences`, {
        cache: "force-cache"
    });

    if (!response.ok) {
        throw new Error(`No se pudo obtener productos: ${response.status}`);
    }

    const apiProducts: ExperienceApi[] = await response.json();
    const products: IProduct[] = apiProducts.map((item) => ({
        id: item.id ?? item.title,
        name: item.title,
        place: item.location || [item.city, item.country].filter(Boolean).join(", ") || "Ubicacion por confirmar",
        price: Number(item.price),
        description: item.description,
        image: item.imageUrl || DEFAULT_EXPERIENCE_IMAGE,
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

const mapApiToCatalogItem = (item: ExperienceApi): ExperienceCatalogItem => ({
    id: item.id ?? item.title,
    title: item.title,
    image: item.imageUrl || DEFAULT_EXPERIENCE_IMAGE,
    difficulty: item.dificulty || "Intermedio",
    price: Number(item.price),
    location: item.location || [item.city, item.country].filter(Boolean).join(", ") || "Ubicacion por confirmar",
    category: item.category || "Sin categoria",
});

export async function getExperiencesCatalog(): Promise<ExperienceCatalogItem[]> {
    const response = await fetch(`${API_URL}/experiences`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`No se pudo obtener experiencias: ${response.status}`);
    }

    const apiProducts: ExperienceApi[] = await response.json();
    return apiProducts.map(mapApiToCatalogItem);
}

export async function getExperiencesByCategory(category: string): Promise<ExperienceCatalogItem[]> {
    const safeCategory = category.trim();
    const response = await fetch(`${API_URL}/experiences?category=${encodeURIComponent(safeCategory)}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`No se pudieron obtener experiencias por categoria: ${response.status}`);
    }

    const apiProducts: ExperienceApi[] = await response.json();
    return apiProducts.map(mapApiToCatalogItem);
}

export async function getProductByID(id: string): Promise<IProduct> {
    try {
        // Primero verificar si es un ID de demostración
        if (id in DEMO_EXPERIENCES) {
            return DEMO_EXPERIENCES[id];
        }

        // Si no, obtener por endpoint directo
        const response = await fetch(`${API_URL}/experiences/${id}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(response.status === 404 ? "Product not found" : `No se pudo obtener producto: ${response.status}`);
        }

        const item: ExperienceApi = await response.json();
        return {
            id: item.id ?? id,
            name: item.title,
            place: item.location || [item.city, item.country].filter(Boolean).join(", ") || "Ubicacion por confirmar",
            price: Number(item.price),
            description: item.description,
            image: item.imageUrl || DEFAULT_EXPERIENCE_IMAGE,
            categoryId: 0,
            stock: item.capacity ?? 1,
            duration: item.duration,
            ageRange: item.ageRange,
            capacity: item.capacity,
            difficulty: item.dificulty,
        };
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