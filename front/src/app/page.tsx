import HeroHome from "@/components/HeroHome";
import CategoriesHome from "@/components/CategoriesHome";
import ReservationSteps from "@/components/ReservationSteps";
import TestimonialsHome from "@/components/TestimonialsHome";
import PartnerLogos from "@/components/PartnerLogos";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <section className="w-full">
      <HeroHome/>
      <CategoriesHome/>
      <ReservationSteps/>
      <TestimonialsHome/>
      <PartnerLogos/>
      <Newsletter/>
    </section>
  );
}