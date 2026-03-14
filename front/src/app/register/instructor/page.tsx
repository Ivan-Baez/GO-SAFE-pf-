"use client";
import { useState, useEffect } from "react";
import RegisterInstructorView from "@/ui/RegisterInstructorView"

export default function InstructorRegisterPage(){
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // O un spinner/cargando
  }

    return(
        <section className="w-full">
            <RegisterInstructorView/>
        </section>
    )
}