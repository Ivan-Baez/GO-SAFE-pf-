import HeroHome from "@/components/HeroHome";
import CategoriesHome from "@/components/CategoriesHome";
import Card from "@/components/TarjetaInstructores";
import ReservationSteps from "@/components/ReservationSteps";

export default function HomePage() {
  return (
    <section className="w-full">
      <HeroHome/>
      <CategoriesHome/>
      <Card/>
      <ReservationSteps/>
    </section>
  );
}