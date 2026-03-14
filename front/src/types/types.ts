export interface ILoginProps {
    email: string,
    password: string
}

export interface ILoginErrors {
    email?: string,
    password?: string
}

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

export interface IInstructorRegisterErrors{
    fistName?: string;     
    lastName?: string;    
    userName?: string;    
    documentType?: string;
    document?: string;    
    genre?: string;
    age?: string;
    birthDay?: string;   
    birthMonth?: string; 
    birthYear?: string;
    address?: string;
    phone?: string;
    country?: string;
    city?: string;
    email?: string;      
    password?: string;
    confirmPassword?: string; 
    profilePic?: string; 
    isMajor?: string;
    // Step Certificación
    noCertificado?: boolean;
    category?: string;
    nombreCertificado?: string;
    certificadoUrl?: string;
    certifications?: string;
    //Step Education
    titulo?: string;
    institucion?: string;
    nivel?: string;
    añoInicio?: string;
    añoFin?: string;
    actualidad?: boolean;
    // Step About
    bio?: string;
    disponibilidad?: string;
    precios?: string;
    about?: string;  
    //Step Disponibilidad
    selectedDays?: string;
    startTime?: string;
    endTime?: string;
    //Step Precios
    pricePerHour?: string;
}

export interface IInstructorRegisterProps {
  fistName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string; 
  documentType?: string;
  document?: string; 
  age?: number;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  genre?: string;
  profilePic?: string;
  // Campos auxiliares del Front
  isMajor?: boolean; 
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  // Step Certificación
  noCertificado?: boolean;
  category?: string;
  nombreCertificado?: string;
  certificadoUrl?: string;
  certifications?: string;
  //Step Education
  titulo?: string;
  institucion?: string;
  nivel?: string;
  añoInicio?: number | string; 
  añoFin?: number | string;
  actualidad?: boolean;
  noEducation?: boolean;
  // Step About
  bio?: string;
  disponibilidad?: string;
  precios?: string;
  about?: string;
  //Step Disponibilidad
  selectedDays?: string[];
  startTime?: string;
  endTime?: string;
  //Step Precios
  pricePerHour?: number | string;
  currency?: string;
}