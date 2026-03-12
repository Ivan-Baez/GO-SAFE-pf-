import { IProduct } from "@/types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {
    try {
    const response = await fetch (`${API_URL}/products` , {
        cache: "force-cache"
    })
    const products : IProduct[] = await response.json();
    return products;  
    }  catch (error: any) {
        throw new Error(error);
    } 
};

export async function getProductByID(id:string): Promise<IProduct> {
    try {
    const response = await getProductsDB();
    const productFiltered = response.find((product) => product.id.toString() === id);    
    if(!productFiltered) throw new Error('Product not found');
    return productFiltered;  
    }  catch (error: any) {
        throw new Error(error);
    } 
};

//conexion con el back