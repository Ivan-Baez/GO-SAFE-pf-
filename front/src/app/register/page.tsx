import { Suspense } from "react"
import RegisterView from "@/ui/RegisterUsuarioView"

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterView />
    </Suspense>
  )
}