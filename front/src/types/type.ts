export interface  IRegisterProps {
    name:string
    documentType:string
    document:string
    genre:string
    age: number
    address:string
    phone:string
    country:string
    city:string
    mail:string
    password:string
}

export interface IRegisterErrors{ 
    name?:string
    documentType?:string
    document?:string
    genre?:string
    age?: string
    address?:string
    phone?:string
    country?:string
    city?:string
    mail?:string
    password?:string
}

