"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import PersonalData from "@/components/registerSteps/PersonalData";
import Stepper from "@/components/registerSteps/Stepper";
import StepPhoto from "@/components/registerSteps/StepPhoto";
import CertificationStep from "@/components/registerSteps/CertificateStep";
import EducationStep from "@/components/registerSteps/EducationStep";
import StepDescription from "@/components/registerSteps/StepDescription";
import StepAvailability from "@/components/registerSteps/StepAvailability";
import StepPricing from "@/components/registerSteps/StepPricing";

export default function RegisterInstructorView() {
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