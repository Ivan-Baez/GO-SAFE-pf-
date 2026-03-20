import RegisterForBothtView from "@/ui/RegisterForBothtView";
import React from "react";
import { Suspense } from "react";

function page() {
  return (
    <section className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForBothtView />;
      </Suspense>
    </section>
  );
}

export default page;
