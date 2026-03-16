"use client";
import { useAuth } from "@/context/AuthContext";
import { registerInstructor } from "@/service/authService";
import { IInstructorRegisterProps } from "@/types/types";
import { Formik, Form } from "formik";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Importar validaciones
import { validateRegisterStep1, ValidateRegisterStep2, ValidateCertificationStep, validateEducationStep, validateDescriptionStep, validateAvailabilityStep, validatePriceStep} from "@/lib/validate";

// Componentes de cada paso
import PersonalData from "@/components/registerSteps/PersonalData";
import Stepper from "@/components/registerSteps/Stepper";
import StepPhoto from "@/components/registerSteps/StepPhoto";
import CertificationStep from "@/components/registerSteps/CertificateStep";
import EducationStep from "@/components/registerSteps/EducationStep";
import StepDescription from "@/components/registerSteps/StepDescription";
import StepAvailability from "@/components/registerSteps/StepAvailability";
import StepPricing from "@/components/registerSteps/StepPricing";

export default function RegisterInstructorView() {
  const { setUserData } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const step = Number(searchParams.get("step")) || 1;

  // Función para cambiar el paso en la URL
  const updateStep = (nextStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", nextStep.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextStep = () => updateStep(step + 1);
  const prevStep = () => updateStep(step - 1);

    const initialValues: IInstructorRegisterProps = {

    fistName: "",

    lastName: "",

    phone: "",

    country: "",

    profilePic: "",

    // Educación

    noEducation: false,

    titulo: "",

    institucion: "",

    nivel: "",

    añoInicio: "",

    añoFin: "",

    actualidad: false,

    // Certificaciones

    noCertificado: false,

    category: "",

    nombreCertificado: "",

    certificadoUrl: "",

    // Bio y Disponibilidad

    bio: "",

    selectedDays: [],

    startTime: "08:00",

    endTime: "17:00",

    // Precios

    pricePerHour: "",

    currency: "USD",

  };

   const handleFinalSubmit = async (values: IInstructorRegisterProps) => {

    // 1. partes del "About"

    // operadores lógicos para manejar campos que podrían estar vacíos

    const seccionBio = values.bio || "Sin biografía proporcionada.";

 

    const seccionDispo = (values.selectedDays && values.selectedDays.length > 0)

      ? `Disponibilidad: ${values.selectedDays.join(", ")} de ${values.startTime} a ${values.endTime}.`

      : "Disponibilidad no especificada.";



    const seccionPrecio = values.pricePerHour

      ? `Tarifa: ${values.pricePerHour} ${values.currency} por hora.`

      : "Tarifa no especificada.";



      // Unificamos la Educación para que no se pierda (ya que el back no tiene campo)

      const seccionEducacion = values.noEducation

      ? "Sin formación académica adicional."

      : `Educación: ${values.titulo} en ${values.institucion} (${values.nivel}). ${values.añoInicio} - ${values.actualidad ? 'Actualidad' : values.añoFin}`;



    // 2. Unificamos TODO en el string 'about'

    const fullAbout = `

    ${seccionBio}

    ${seccionDispo}

    ${seccionPrecio}

    ${seccionEducacion}

    `.trim();



    // 3. Unificamos la Certificación (lo que el back espera en 'certifications')

    const fullCertifications = values.noCertificado

      ? "Sin certificaciones."

      : `${values.nombreCertificado} (${values.category}) - URL: ${values.certificadoUrl}`.trim();



    // 4. objeto final (DTO)

    const baseData = {

    // Identidad y Cuenta

    fistName: values.fistName,

    lastName: values.lastName,

    userName: values.userName,

    email: values.email,

    password: values.password,

    age: Number(values.age),

    genre: values.genre,

    // Documentación

    documentType: values.documentType,

    document: values.document,

    // Ubicación y Contacto

    phone: values.phone,

    country: values.country,

    city: values.city,

    address: values.address,

    //Foto

    profilePic: values.profilePic,

    // ROL (Fijo para este formulario)

    role: "instructor",

    // About unificado

    about: fullAbout,

    //Certificacion unificada

    certifications: fullCertifications

    };



   try {

        const res = await registerInstructor(baseData);



        if (res.token) {

            // ¡ESTO ES LO QUE CAMBIA EL NAVBAR!

            setUserData({

                token: res.token,

                user: res.user

            });

            alert("¡Bienvenido, Instructor!");

            router.push("/");

        } else {

            router.push("/login");

        }

    } catch (error: any) {

        alert(error.message);

    }

  };

  // Switch para renderizar las validaciones según el paso

  const getValidationSchema = () => {

    switch (step) {

      case 1: return validateRegisterStep1;

      case 2: return ValidateRegisterStep2;

      case 3: return validateEducationStep;

      case 4: return ValidateCertificationStep;

      case 5: return validateDescriptionStep;

      case 6: return validateAvailabilityStep;

      case 7: return validatePriceStep;

      default: return () => ({});

    }

  };

  return(
    <section>
      <Stepper currentStep={step} />

      <div>
      {step === 1 && <PersonalData next={nextStep} />}
      {step === 2 && <StepPhoto next={nextStep} prev={prevStep} />}
      {step === 3 && <CertificationStep next={nextStep} prev={prevStep} />}
      {step === 4 && <EducationStep next={nextStep} prev={prevStep} />}
      {step === 5 && <StepDescription next={nextStep} prev={prevStep} />}
      {step === 6 && <StepAvailability next={nextStep} prev={prevStep} />}
      {step === 7 && <StepPricing prev={prevStep} />}
      </div>
    </section>
    )
}