import HeroHome from "@/components/HeroHome";
import CategoriesHome from "@/components/CategoriesHome";
import Card  from "@/components/TarjetaInstructores";
import ReservationSteps from "@/components/ReservationSteps";

export default function HomePage() {
  return (
    <section className="w-full">
      <HeroHome/>
      <CategoriesHome/>
      <Card id={1} name={"alberto"} place={"Bogota D.C"} image={""} sport={"claimbing"} modality={"presencial"}/>
      <Card id={2} name={"juliana"} place={"Cordoba"} image={""} sport={"kayak"} modality={"presencial"}/>
      <ReservationSteps/>
    </section>
  );
}