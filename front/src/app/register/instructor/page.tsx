import { Suspense } from "react"
import RegisterInstructorView from "@/ui/instructor/RegisterInstructorView"

export default function InstructorRegisterPage() {
  return (
    <section className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterInstructorView />
      </Suspense>
    </section>
  )
}