import PerfilInstructor, {
  DEFAULT_INSTRUCTOR_PROFILE,
  InstructorProfile,
} from "@/components/PerfilInstructor";

interface InstructorProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

const profilesById: Record<string, Partial<InstructorProfile>> = {
  "1": {
    id: "1",
    name: "Alberto Rios",
    profession: "Instructor de climbing y seguridad en roca",
    profileImage:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=900&q=80",
    about:
      "Especialista en climbing con enfoque en tecnica, manejo de riesgo y progresion por niveles para deportistas principiantes e intermedios.",
    followers: 954,
    rating: 4.7,
  },
  "2": {
    id: "2",
    name: "Juliana Perez",
    profession: "Guia de kayak y navegacion en aguas rapidas",
    profileImage:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
    about:
      "Guia certificada en kayak con experiencia en rios de nivel tecnico medio y alto. Trabajo practicas seguras y control de maniobras.",
    followers: 1432,
    rating: 4.9,
  },
  "3": {
    id: "3",
    name: "Camila Soto",
    profession: "Guia de senderismo y aventura en montana",
    profileImage:
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=900&q=80",
    about:
      "Lidero rutas de senderismo de baja y media dificultad, con foco en orientacion, lectura del terreno y preparacion fisica.",
    followers: 1110,
    rating: 4.8,
  },
};

export default async function InstructorProfilePage({ params }: InstructorProfilePageProps) {
  const { id } = await params;
  const customProfile = profilesById[id];
  const profile: InstructorProfile | undefined = customProfile
    ? { ...DEFAULT_INSTRUCTOR_PROFILE, ...customProfile, id }
    : undefined;

  return <PerfilInstructor profile={profile} />;
}
