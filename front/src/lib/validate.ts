import { ILoginErrors, ILoginProps, IRegisterErrors,IRegisterProps } from "@/types/types";

export const validateFormLogin = (values: ILoginProps) => {
const errors: ILoginErrors = {};

if (!values.email) {
    errors.email = "Email requerido";
}

if (!values.password) {
    errors.password = "Contraseña requerida";
}

return errors;
};

export const ValidateFormRegister = (values:IRegisterProps) =>{
    const errors: IRegisterErrors = {};

//mail
    if(!values.mail){
            errors.mail = "Required email";
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)){
            errors.mail = "Invalid email address";

//password            
        } else if(!values.password){
            errors.password = "Required password";
        } else if(values.password.length < 8
        ){
            errors.password = "Password must be at least 6 characters";
        }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)){
            errors.password = "Mín. 8 caracteres, mayúscula, minúscula, número y carácter especial";

        if(values.password !==values.confirmPassword){
            errors.confirmPassword = "Las contraseñas no coinciden"
        }

//primernombre
        }else if(!values.primernombre|| values.primernombre.trim() ===""){
            errors.name = "Required name";
        }else if(values.primernombre.trim().length > 20){
            errors.name = "El nombre no puede superar los 20 caracteres"
        }else if(values.primernombre.trim().length < 2){
            errors.name = "El nombre debe contar con mas de 2 caractores"
        }else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.primernombre)){   
            errors.name = "El nombre solo puede contener letras" 

//segundonombre
        }else if(!values.segundonombre|| values.segundonombre.trim() ===""){
            errors.name = "Required name";
        }else if(values.segundonombre.trim().length > 20){
            errors.name = "El nombre no puede superar los 20 caracteres"
        }else if(values.segundonombre.trim().length < 2){
            errors.name = "El nombre debe contar con mas de 2 caractores"
        }else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.segundonombre)){   
            errors.name = "El nombre solo puede contener letras"     

//address
        } else if(!values.address.trim()){
            errors.address = "Required address";
        } else if (!/^[a-zA-Z0-9\s#\-\.]{5,100}$/.test(values.address)) {
            errors.address="Direccion invalida. Min 5 ,Max 50 caracteres";

//phone    
} else if(!values.phone){
            errors.phone = "Required phone";
        }else if (!/^(\+57)?[0-9]{10}$/.test(values.phone)){
            errors.phone= "debe tener min 10 digitos Col, "
//age
        } else if (!values.birthdate ){
            errors.birthdate = "Required age";
//city
        }else if(!values.city){
            errors.city = "Requiered city";
//country
        }else if(!values.country){
            errors.country = "Requiered country";
//document
        } else if (!values.document){
            errors.document= "Requiered document";
        }else if(!/^\d{6,10}$/.test(values.document)){
            errors.document= "Debe tener entre 6 a 10 digitos"
//documentType
        } else if(!values.documentType){
            errors.documentType= "Requiered documentType"
//genero
        } else if (!values.genre){
            errors.genre = "Requiered genre"
        }
    return errors;
}

