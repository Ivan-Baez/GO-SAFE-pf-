export interface ILoginProps {
    email: string,
    password: string
}

export interface ILoginErrors {
    email?: string,
    password?: string
}

export interface  IRegisterProps {
    primernombre:string
    segundonombre:string
    username:string
    documentType:string
    document:string
    genre:string
    birthdate: string
    address:string
    phone:string
    country:string
    city:string
    mail:string
    password:string
    confirmPassword: string
}

export interface IRegisterErrors{ 
    name?:string
    documentType?:string
    document?:string
    genre?:string
    birthdate?: string
    address?:string
    phone?:string
    country?:string
    city?:string
    mail?:string
    password?:string
    confirmPassword?: string
}

export interface IService {
    id:number
    name:string
    place:string
    image: string
    sport: string
}

export interface IOrder {
    id:string
    date: string
    name:string
    price:number
    place:string
    image: string
}

export interface IUserSession {
    token: string;
    user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    orders:[];
};
} 

export interface IProduct {
id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number;
    stock: number;
}