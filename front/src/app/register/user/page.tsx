import { Suspense } from "react";
import RegisterView from "@/ui/user/RegisterUsuarioView";

export default function RegisterUserPage() {
  return (
    <section className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterView />
      </Suspense>
    </section>
  );
}
