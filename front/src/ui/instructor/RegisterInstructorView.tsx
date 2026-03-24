"use client";
import { useAuth } from "@/context/AuthContext";
import { registerInstructor } from "@/service/authService";
import { IInstructorRegisterProps } from "@/types/types";
import { Formik, Form } from "formik";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Importar validaciones
import { validateRegisterStep1, ValidateRegisterStep2, ValidateCertificationStep, validateEducationStep, validateDescriptionStep} from "@/lib/validate";

// Componentes
import PersonalData from "@/components/registerSteps/PersonalData";
import Stepper from "@/components/registerSteps/Stepper";
import StepPhoto from "@/components/registerSteps/StepPhoto";
import CertificationStep from "@/components/registerSteps/CertificateStep";
import EducationStep from "@/components/registerSteps/EducationStep";
import StepDescription from "@/components/registerSteps/StepDescription";

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
    country: "", phone: "", isMajor: false, document: "", documentType: "", genre: "",
    userName: "", profilePic: "", noEducation: false, career: "",
    institution: "", level: "", añoInicio: "", añoFin: "", onCourse: false,
    noCertificado: false, title: "", url: "", title2: "",
    url2: "", about: ""
  };

  const handleFinalSubmit = async (values: IInstructorRegisterProps) => {
  
    const period = values.onCourse
      ? `${values.añoInicio}-${values.añoInicio}`
      : `${values.añoInicio}-${values.añoFin}`;

    // Certifications
    const certifications = values.noCertificado
    ? []
    : [
      { title: values.title, url: values.url },
      { title: values.title2, url: values.url2 },
    ].filter((cert) => cert.title && cert.url);

    // 2. OBJETO FINAL (DTO) - Ajustado al Swagger
    const baseData = {
      user: {
        firstName: values.firstName, 
        lastName: values.lastName,
        userName: values.userName,
        email: values.email?.toLowerCase().trim(),
        password: values.password,
        birthdate: `${values.birthDay}-${values.birthMonth}-${values.birthYear}`,
        genre: values.genre,
        documentType: values.documentType,
        document: Number(values.document),
        phone: Number(values.phone),
        country: values.country,
        city: values.city,
        address: values.address,
        profilePic: values.profilePic,
      },
      instructor: {
        career: values.career,
        institution: values.institution,
        level: values.level,
        period: period,
        onCourse: values.onCourse,
        about: values.about,
        certifications,
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
      default: return {};
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={getValidationSchema}
      validateOnMount={true}
      onSubmit={(values) => {
        if (step === 5) {
          handleFinalSubmit(values);
        } else {
          nextStep();
        }
      }}
    >
      {({ errors, isSubmitting, setFieldValue }) => (
        <Form>
          <Stepper currentStep={step} />

          <div>
            {step === 1 && <PersonalData />}
            {step === 2 && <StepPhoto prev={prevStep} setFieldValue={setFieldValue} />}
            {step === 3 && <CertificationStep prev={prevStep} />}
            {step === 4 && <EducationStep prev={prevStep} />}
            {step === 5 && <StepDescription prev={prevStep} />}
          </div>
        </Form>
      )}
    </Formik>
  );
}