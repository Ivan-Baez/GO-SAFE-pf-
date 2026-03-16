import { ILoginErrors, ILoginProps, IRegisterErrors,IRegisterProps, IInstructorRegisterErrors, IInstructorRegisterProps } from "@/types/types";

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

    if (!values.primernombre?.trim()) {
      errors.primernombre = "El primer nombre es obligatorio";
    } else if (values.primernombre.trim().length < 2) {
      errors.primernombre = "El primer nombre debe tener al menos 2 caracteres";
    } else if (values.primernombre.trim().length > 20) {
      errors.primernombre = "El primer nombre no puede superar 20 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.primernombre.trim())) {
      errors.primernombre = "El primer nombre solo puede contener letras";
    }

    if (!values.segundonombre?.trim()) {
      errors.segundonombre = "El segundo nombre es obligatorio";
    } else if (values.segundonombre.trim().length < 2) {
      errors.segundonombre = "El segundo nombre debe tener al menos 2 caracteres";
    } else if (values.segundonombre.trim().length > 20) {
      errors.segundonombre = "El segundo nombre no puede superar 20 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.segundonombre.trim())) {
      errors.segundonombre = "El segundo nombre solo puede contener letras";
    }

    if (!values.username?.trim()) {
      errors.username = "El username es obligatorio";
    } else if (values.username.trim().length < 2) {
      errors.username = "El username debe tener al menos 2 caracteres";
    } else if (values.username.trim().length > 20) {
      errors.username = "El username no puede superar 20 caracteres";
    } else if (/\s/.test(values.username)) {
      errors.username = "El username no puede contener espacios";
    }

    if (!values.mail) {
      errors.mail = "Email requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)) {
      errors.mail = "Email invalido";
    }

    if (!values.password) {
      errors.password = "Contraseña requerida";
    } else if (values.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
      errors.password = "Debe incluir mayuscula, minuscula, numero y caracter especial";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirma tu contraseña";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!values.address?.trim()) {
      errors.address = "Direccion requerida";
    } else if (!/^[a-zA-Z0-9\s#\-\.]{5,100}$/.test(values.address.trim())) {
      errors.address = "Direccion invalida. Min 5, Max 100 caracteres";
    }

    if (!values.phone) {
      errors.phone = "Telefono requerido";
    } else if (!/^(\+57)?[0-9]{10}$/.test(values.phone)) {
      errors.phone = "Debe tener 10 digitos";
    }

    if (!values.birthdate) {
      errors.birthdate = "Fecha de nacimiento requerida";
    }

    if (!values.country) {
      errors.country = "Pais requerido";
    }

    if (!values.city) {
      errors.city = "Ciudad requerida";
    }

    if (!values.documentType) {
      errors.documentType = "Tipo de documento requerido";
    }

    if (!values.document) {
      errors.document = "Documento requerido";
    } else if (!/^\d{6,10}$/.test(values.document)) {
      errors.document = "El documento debe tener entre 6 y 10 digitos";
    }

    if (!values.genre) {
      errors.genre = "Genero requerido";
    }

    return errors;
}

export const validateRegisterStep1 = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};
  const currentYear = new Date().getFullYear();

  if (!values.fistName) {
    errors.fistName = "El nombre es obligatorio";
  } else if (values.fistName.length < 2) {
    errors.fistName = "Mínimo 2 caracteres";
  }

  if (!values.lastName) {
    errors.lastName = "El apellido es obligatorio";
  } else if (values.lastName.length < 2) {
    errors.lastName = "Mínimo 2 caracteres";
  }

  if (!values.document) {
    errors.document = "Tu documento es requerido";
  } else if (isNaN(Number(values.document))) {
    errors.document = "Debe ser un número";
  }

  if (!values.birthYear) {
    errors.birthYear = "Año requerido";
  } else {
    const age = currentYear - Number(values.birthYear);
    if (age < 18) {
      errors.birthYear = "Debes ser mayor de 18 años";
    } else if (age > 100) {
      errors.birthYear = "Año inválido";
    }
  }

  if (!values.genre) {
    errors.genre = "El género es obligatorio";
  }

  if (!values.address) {
    errors.address = "La dirección es obligatoria";
  } else if (values.address.length < 5) {
    errors.address = "La dirección debe ser más específica (mín. 5 caracteres)";
  }

  if (!values.city) {
    errors.city = "La ciudad es obligatoria";
  } else if (values.city.length < 3) {
    errors.city = "Nombre muy corto (mín. 3)";
  } else if (values.city.length > 20) {
    errors.city = "Nombre muy largo (máx. 20)";
  }

   if (!values.country) {
    errors.country = "El país es obligatorio";
  }
  
  if (!values.userName) {
    errors.userName = "El nombre de usuario es obligatorio";
  } else if (values.userName.length < 2) {
  errors.userName = "Debe tener al menos 2 caracteres";
  } else if (values.userName.length > 20) {
    errors.userName = "Máximo 20 caracteres";
  } else if (/\s/.test(values.userName)) {
    errors.userName = "No puede contener espacios";
  }

  // Regex estándar para validar emails
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Formato de email inválido (ej: usuario@mail.com)";
  } else if (values.email.length > 50) {
    errors.email = "El email no puede superar los 50 caracteres";
  }

  // 1. Validar el password principal (con el Regex del DTO)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

  if (!values.password) {
   errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 8) {
    errors.password = "Mínimo 8 caracteres";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "Debe incluir mayúscula, minúscula, número y carácter especial";
  }

  // 2. Validar el confirmPassword (la comparación)
  if (!values.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!values.phone) {
    errors.phone = "El teléfono es requerido";
  } else if (isNaN(Number(values.phone))) {
    errors.phone = "Debe contener solo números";
  } else if (Number(values.phone) < 1000) {
    errors.phone = "Número demasiado corto";
  }

  if (!values.isMajor) {
    errors.isMajor = "Debes confirmar que eres mayor de edad para continuar";
  }

  return errors;
};

export const ValidateRegisterStep2 = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};

  if (!values.profilePic) {
    errors.profilePic = "La URL de la foto es obligatoria";
  } else if (!values.profilePic.startsWith('http')) {
    errors.profilePic = "La URL debe empezar con http:// o https://";
  }

  return errors;
}

// Validación para el Step de Certificaciones
export const ValidateCertificationStep = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};

  // Si el usuario NO marcó "noCertificado", validamos los campos
  if (!values.noCertificado) {
    if (!values.category) {
      errors.category = "Selecciona un área para tu certificación.";
    }
    
    if (!values.nombreCertificado) {
      errors.nombreCertificado = "El nombre del certificado es obligatorio si no marcas la casilla.";
    }

    if (values.certificadoUrl && !values.certificadoUrl.startsWith('http')) {
      errors.certificadoUrl = "La URL del certificado debe ser un enlace válido (http/https).";
    }
  }

  return errors;
}

export const validateEducationStep = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};
  const currentYear = new Date().getFullYear();

  if (!values.titulo) {
    errors.titulo = "El título o carrera es obligatorio";
  }

  if (!values.institucion) {
    errors.institucion = "La institución es obligatoria";
  }

  if (!values.nivel) {
    errors.nivel = "Selecciona un nivel de estudios";
  }

  // Validación de Años
  if (!values.añoInicio) {
    errors.añoInicio = "Año de inicio requerido";
  } else if (Number(values.añoInicio) > currentYear) {
    errors.añoInicio = "No puede ser un año futuro";
  }

  if (!values.actualidad) {
    if (!values.añoFin) {
      errors.añoFin = "Año de fin requerido";
    } else if (values.añoInicio && values.añoFin < values.añoInicio) {
      errors.añoFin = "No puede ser menor al inicio";
    }
  }

  return errors;
};

// Validación para el Step del "About Me" (Biografía)
export const validateDescriptionStep = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};

  if (!values.bio) {
    errors.bio = "La biografía es obligatoria.";
  } else if (values.bio.length < 20) {
    errors.bio = `Es muy corta. Escribe al menos ${20 - values.bio.length} caracteres más.`;
  } else if (values.bio.length > 500) {
    errors.bio = "Has superado el límite de 500 caracteres.";
  }

  return errors;
};

export const validateAvailabilityStep = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};

  // Validar que haya seleccionado al menos un día
  if (!values.selectedDays || values.selectedDays.length === 0) {
    errors.selectedDays = "Selecciona al menos un día de disponibilidad.";
  }

  // Validar rango horario
  // Si las horas vienen como "08:00", podemos comparar directamente los strings
  // o extraer el número: parseInt(values.startTime.split(':')[0])
  const start = parseInt(values.startTime.split(':')[0]);
  const end = parseInt(values.endTime.split(':')[0]);

  if (!start) {
    errors.startTime = "Debes seleccionar un rango horario";
  }

  if (end <= start) {
    errors.endTime = "La hora de fin debe ser posterior a la de inicio.";
  }

  return errors;
};

export const validatePriceStep = (values: IInstructorRegisterProps): IInstructorRegisterErrors => {
  const errors: IInstructorRegisterErrors = {};

  const price = Number(values.pricePerHour);

  if (!values.pricePerHour || values.pricePerHour === "") {
    errors.pricePerHour = "Debes ingresar un valor por hora.";
  } else if (isNaN(price) || price <= 0) {
    errors.pricePerHour = "El precio debe ser un número mayor a 0.";
  } else if (price > 1000000) { // Ejemplo de seguridad
    errors.pricePerHour = "El precio parece demasiado alto.";
  }

  return errors;
};