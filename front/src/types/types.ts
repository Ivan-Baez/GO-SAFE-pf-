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
    primernombre?:string
    segundonombre?:string
    username?:string
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

export interface IInstructorRegisterErrors{
    firstName?: string;     
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
    title?: string;
    title2?: string;
    url?: string;
    url2?: string;
    certifications?: string;
    //Step Education
    career?: string;
    institution?: string;
    level?: string;
    añoInicio?: string;
    añoFin?: string;
    onCourse?: boolean;
    // Step About
    about?: string;  
}

export interface IInstructorRegisterProps {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email: string;
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
  title?: string;
  title2?: string;
  url?: string;
  url2?: string;
  certifications?: string;
  //Step Education
  career?: string;
  institution?: string;
  level?: string;
  añoInicio?: number | string; 
  añoFin?: number | string;
  onCourse?: boolean;
  noEducation?: boolean;
  // Step About
  about?: string;
}

export interface IService {
    id:number
    name:string
    place:string
    image: string
    sport?: string
    modality:string
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
    orders: any[];
};
} 

export interface IProduct {
    id: number | string;
    name: string;
    place: string
    price: number;
    description: string;
    image: string;
    categoryId: number;
    stock: number;
}

export interface IUserData {
  role: "user" | "instructor" | "admin";
}

export interface IReview {
  id: string;
  comment: string;
  rating: number;
  createdAt?: string;
}

export interface IInstructor {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  profilePic: string;
  rating?: number;
  totalReviews?: number;
  verified?: boolean;
  career?: string;
  status?: string;
  instructorProfile: {
    about?: string;
    certifications?: string;
    experience?: string;
    languages?: string;
    modality?: string;
    availability?: string;
    level?: string;
    duration?: string;
    price?: number;
    specialties?: string[];
    activities?: string[];
    tags?: string[];
  };
  reviews?: any[];
}

export interface IBlogPost {
  id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  content: string;
}
