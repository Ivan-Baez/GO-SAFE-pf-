import { Suspense } from "react";
import GoogleSuccessContent from "./GoogleSuccessContent";

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <GoogleSuccessContent />
    </Suspense>
  );
}