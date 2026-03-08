import { IRegisterErrors,IRegisterProps } from "@/types/type";

export const ValidateFormRegister = (values:IRegisterProps) =>{
    const errors: IRegisterErrors = {};
    if(!values.mail){
            errors.mail = "Required email";

        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)){
            errors.mail = "Invalid email address";
        } else if(!values.password){
            errors.password = "Required password";
        } else if(values.password.length < 6){
            errors.password = "Password must be at least 6 characters";
        }else if(!values.name){
            errors.name = "Required name";
        } else if(!values.address){
            errors.address = "Required address";
        } else if(!values.phone){
            errors.phone = "Required phone";
        } else if (!values.age){
            errors.age = "Required age";
        }else if(!values.city){
            errors.city = "Requiered city";
        }else if(!values.country){
            errors.country = "Requiered country";
        } else if (!values.document){
            errors.document= "Requiered document";
        } else if(!values.documentType){
            errors.documentType= "Requiered documentType"
        } else if (!values.genre){
            errors.genre = "Requiered genre"
        }

    



        return errors
}

