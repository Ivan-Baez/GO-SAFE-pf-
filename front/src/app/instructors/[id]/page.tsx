import InstructorPublicProfile from "@/ui/InstructorPublicProfile";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // después acá fetch real
  //const instructor = await getInstructorById(id);
  return <InstructorPublicProfile />;
}