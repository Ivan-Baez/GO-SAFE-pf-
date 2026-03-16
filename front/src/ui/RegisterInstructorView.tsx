"use client";
import { useAuth } from "@/context/AuthContext";
import { registerInstructor } from "@/service/authService";
import { IInstructorRegisterProps } from "@/types/types";
import { Formik, Form } from "formik";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Importar validaciones
import { validateRegisterStep1, ValidateRegisterStep2, ValidateCertificationStep, validateEducationStep, validateDescriptionStep, validateAvailabilityStep, validatePriceStep} from "@/lib/validate";

// Componentes
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

  const step = parseInt(searchParams.get("step") ?? "1", 10);

  const updateStep = (nextStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", nextStep.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextStep = () => { if (step < 7) updateStep(step + 1); };
  const prevStep = () => updateStep(step - 1);

  const initialValues: IInstructorRegisterProps = {
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    birthDay: "", birthMonth: "", birthYear: "", address: "", city: "",
    country: "", phone: "", isMajor: false, document: "", genre: "",
    userName: "", profilePic: "", noEducation: false, titulo: "",
    institucion: "", nivel: "", añoInicio: "", añoFin: "", actualidad: false,
    noCertificado: false, category: "", nombreCertificado: "", certificadoUrl: "",
    bio: "", selectedDays: [], startTime: "08:00", endTime: "17:00",
    pricePerHour: "", currency: "USD",
  };

  const handleFinalSubmit = async (values: IInstructorRegisterProps) => {
    // 1. Unificamos strings para el objeto instructor
    const seccionBio = values.bio || "Sin biografía.";
    const seccionDispo = (values.selectedDays && values.selectedDays.length > 0)
      ? `Disponibilidad: ${values.selectedDays.join(", ")} de ${values.startTime} a ${values.endTime}.`
      : "Disponibilidad no especificada.";
    const seccionPrecio = values.pricePerHour
      ? `Tarifa: ${values.pricePerHour} ${values.currency} por hora.`
      : "Tarifa no especificada.";
    const seccionEducacion = values.noEducation
      ? "Sin formación académica adicional."
      : `Educación: ${values.titulo} en ${values.institucion} (${values.nivel}).`;

    const fullAbout = `${seccionBio}\n${seccionDispo}\n${seccionPrecio}\n${seccionEducacion}`.trim();
    const fullCertifications = values.noCertificado
      ? "Sin certificaciones."
      : `${values.nombreCertificado} (${values.category})`.trim();

    // 2. OBJETO FINAL (DTO) - Ajustado al Swagger
    const baseData = {
      user: {
        fistName: values.firstName || "Nombre", 
        lastName: values.lastName || "Apellido",
        userName: values.userName || (values.firstName ? values.firstName + "91" : "user_temp"),
        email: (values.email || "").toLowerCase().trim(),
        password: values.password,
        birthdate: `${values.birthDay}/${values.birthMonth}/${values.birthYear}`,
        genre: values.genre || "Male",
        documentType: "CC",
        document: Number(values.document) || 1234567,
        phone: Number(values.phone) || 1234567,
        country: values.country || "Colombia",
        city: values.city || "Bogota",
        address: values.address || "Calle 123",
        profilePic: values.profilePic || "https://example.com/profile.jpg",
      },
      instructor: {
        about: fullAbout,
        certifications: fullCertifications
      }
    };

    console.log("Enviando a /auth/signup-instructor:", baseData);

    try {
      const res = await registerInstructor(baseData as any);
      // Si el backend devuelve un token o un objeto exitoso
      alert("¡Registro exitoso! Por favor, inicia sesión.");
      router.push("/login");
    } catch (error: any) {
      console.error("Error capturado:", error);
      alert("Error en el registro: " + (error.message || "Verifica los datos"));
    }
  };

  const getValidationSchema = (values: any) => {
    switch (step) {
      case 1: return validateRegisterStep1(values);
      case 2: return ValidateRegisterStep2(values);
      case 3: return ValidateCertificationStep(values);
      case 4: return validateEducationStep(values);
      case 5: return validateDescriptionStep(values);
      case 6: return validateAvailabilityStep(values);
      case 7: return validatePriceStep(values);
      default: return {};
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      //validate={getValidationSchema}
      onSubmit={(values) => {
        if (step === 7) {
          handleFinalSubmit(values);
        } else {
          nextStep();
        }
      }}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <Stepper currentStep={step} />
          
          {Object.keys(errors).length > 0 && (
            <div className="max-w-md mx-auto mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              <strong>Faltan campos obligatorios:</strong> {Object.keys(errors).join(", ")}
            </div>
          )}

          <div>
            {step === 1 && <PersonalData />}
            {step === 2 && <StepPhoto prev={prevStep} />}
            {step === 3 && <CertificationStep prev={prevStep} />}
            {step === 4 && <EducationStep prev={prevStep} />}
            {step === 5 && <StepDescription prev={prevStep} />}
            {step === 6 && <StepAvailability prev={prevStep} />}
            {step === 7 && (
              <StepPricing 
                prev={prevStep} 
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}