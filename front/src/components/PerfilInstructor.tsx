"use client";

import Image from "next/image";
import { BadgeCheck, ShieldCheck, Star, Users } from "lucide-react";

type ExperienceOffered = {
	id: string;
	title: string;
	location: string;
	duration: string;
	price: number;
};

type AdventureHistoryItem = {
	id: string;
	title: string;
	location: string;
	date: string;
};

export type InstructorProfile = {
	id: string;
	profileImage: string;
	name: string;
	profession: string;
	about: string;
	certifications: string[];
	certificationBadgeText: string;
	rating: number;
	followers: number;
	services: string[];
	adventureHistory: AdventureHistoryItem[];
	experiencesOffered: ExperienceOffered[];
};

type PerfilInstructorProps = {
	profile?: InstructorProfile;
	onLeaveReview?: () => void;
};

export const DEFAULT_INSTRUCTOR_PROFILE: InstructorProfile = {
	id: "1",
	profileImage:
		"https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=900&q=80",
	name: "Santiago Torres",
	profession: "Guia profesional de montana",
	about:
		"Soy guia de montana con 9 anos de experiencia en expediciones de media y alta exigencia. Me enfoco en seguridad, planificacion de ruta y acompanamiento personalizado para que cada aventura sea memorable.",
	certifications: [
		"Guia experto de montana",
		"Primeros auxilios en areas remotas",
		"Rescate tecnico en terrenos de altura",
	],
	certificationBadgeText:
		"Santiago Torres certificado como guia experto de montana y rescate de primeros auxilios.",
	rating: 4.8,
	followers: 1284,
	services: [
		"Guias para senderismo y alta montana",
		"Entrenamiento tecnico de escalada",
		"Planificacion de rutas seguras",
		"Asesoria de equipo y preparacion fisica",
	],
	adventureHistory: [
		{
			id: "h1",
			title: "Ascenso al Nevado del Ruiz",
			location: "Caldas, Colombia",
			date: "Febrero 2026",
		},
		{
			id: "h2",
			title: "Travesia de paramo en Chingaza",
			location: "Cundinamarca, Colombia",
			date: "Diciembre 2025",
		},
		{
			id: "h3",
			title: "Ruta tecnica de roca en Suesca",
			location: "Suesca, Colombia",
			date: "Noviembre 2025",
		},
	],
	experiencesOffered: [
		{
			id: "e1",
			title: "Escalada guiada para intermedios",
			location: "Suesca",
			duration: "4 horas",
			price: 90,
		},
		{
			id: "e2",
			title: "Senderismo tecnico y orientacion",
			location: "Chingaza",
			duration: "6 horas",
			price: 75,
		},
		{
			id: "e3",
			title: "Curso de seguridad en montana",
			location: "Bogota",
			duration: "3 horas",
			price: 65,
		},
	],
};

function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1" aria-label={`Puntuacion ${rating} de 5`}>
			{Array.from({ length: 5 }).map((_, index) => {
				const filled = index < Math.round(rating);
				return (
					<Star
						key={index}
						className={`h-4 w-4 ${filled ? "fill-[#f3b614] text-[#f3b614]" : "text-[#b8b8b8]"}`}
					/>
				);
			})}
			<span className="ml-1 text-sm font-semibold text-[#315341]">{rating.toFixed(1)}</span>
		</div>
	);
}

export default function PerfilInstructor({
	profile = DEFAULT_INSTRUCTOR_PROFILE,
	onLeaveReview,
}: PerfilInstructorProps) {
	const safeProfile: InstructorProfile = {
		...DEFAULT_INSTRUCTOR_PROFILE,
		...profile,
		certifications: Array.isArray(profile?.certifications)
			? profile.certifications
			: DEFAULT_INSTRUCTOR_PROFILE.certifications,
		services: Array.isArray(profile?.services)
			? profile.services
			: DEFAULT_INSTRUCTOR_PROFILE.services,
		adventureHistory: Array.isArray(profile?.adventureHistory)
			? profile.adventureHistory
			: DEFAULT_INSTRUCTOR_PROFILE.adventureHistory,
		experiencesOffered: Array.isArray(profile?.experiencesOffered)
			? profile.experiencesOffered
			: DEFAULT_INSTRUCTOR_PROFILE.experiencesOffered,
	};

	return (
		<section className="min-h-screen bg-[#f5f2eb] px-6 py-10">
			<div className="mx-auto max-w-6xl space-y-6">
				<article className="grid gap-6 rounded-3xl bg-white p-6 shadow md:grid-cols-3">
					<div className="md:col-span-1">
						<div className="relative mx-auto h-64 w-full max-w-xs overflow-hidden rounded-2xl border border-[#dfd6c9]">
							<Image
								src={safeProfile.profileImage}
								alt={safeProfile.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 320px"
							/>
						</div>
					</div>

					<div className="space-y-4 md:col-span-2">
						<div className="flex flex-wrap items-center gap-3">
							<h1 className="text-3xl font-extrabold text-[#1a3d2b]">{safeProfile.name}</h1>
							<span className="inline-flex items-center gap-1 rounded-full bg-[#e8f4ec] px-3 py-1 text-xs font-bold text-[#1f5f3e]">
								<BadgeCheck className="h-4 w-4" />
								Perfil verificado
							</span>
						</div>

						<p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#607568]">
							{safeProfile.profession}
						</p>

						<div className="flex flex-wrap items-center gap-4 text-sm text-[#445f52]">
							<Stars rating={safeProfile.rating} />
							<span className="inline-flex items-center gap-2">
								<Users className="h-4 w-4" />
								{safeProfile.followers.toLocaleString("es-CO")} seguidores
							</span>
						</div>

						<div className="rounded-2xl bg-[#f7efe5] p-4 text-sm text-[#4d4d4d]">
							<h2 className="mb-2 text-base font-bold text-[#1a3d2b]">Sobre mi</h2>
							<p>{safeProfile.about}</p>
						</div>

						<button
							onClick={onLeaveReview}
							className="rounded-xl bg-[#f3c54b] px-5 py-3 text-sm font-bold text-[#1f1f1f] transition hover:bg-[#e7b636]"
						>
							Dejar una reseña
						</button>
					</div>
				</article>

				<article className="grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl bg-white p-6 shadow">
						<h2 className="mb-4 text-xl font-extrabold text-[#1a3d2b]">Certificaciones</h2>

						<div className="mb-4 rounded-2xl border border-[#cae7d4] bg-[#f0fbf4] p-4 text-sm text-[#2a5f45]">
							<p className="flex items-start gap-2 font-semibold">
								<ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
								<span>{safeProfile.certificationBadgeText}</span>
							</p>
						</div>

						<ul className="space-y-2 text-sm text-[#4d4d4d]">
							{safeProfile.certifications.map((certification) => (
								<li key={certification} className="flex items-center gap-2">
									<BadgeCheck className="h-4 w-4 text-[#1f5f3e]" />
									<span>{certification}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-3xl bg-white p-6 shadow">
						<h2 className="mb-4 text-xl font-extrabold text-[#1a3d2b]">Servicios que ofrece</h2>
						<div className="flex flex-wrap gap-2">
							{safeProfile.services.map((service) => (
								<span
									key={service}
									className="rounded-full bg-[#ecf2ed] px-4 py-2 text-sm font-semibold text-[#2f4b3b]"
								>
									{service}
								</span>
							))}
						</div>
					</div>
				</article>

				<article className="grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl bg-white p-6 shadow">
						<h2 className="mb-4 text-xl font-extrabold text-[#1a3d2b]">Aventuras realizadas</h2>
						<ul className="space-y-3">
							{safeProfile.adventureHistory.map((item) => (
								<li key={item.id} className="rounded-2xl border border-[#e7dfd2] p-4">
									<p className="text-sm font-bold text-[#2b4336]">{item.title}</p>
									<p className="text-sm text-[#5d6b64]">{item.location}</p>
									<p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#7b8a82]">{item.date}</p>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-3xl bg-white p-6 shadow">
						<h2 className="mb-4 text-xl font-extrabold text-[#1a3d2b]">Experiencias disponibles</h2>
						<div className="space-y-3">
							{safeProfile.experiencesOffered.map((experience) => (
								<article key={experience.id} className="rounded-2xl border border-[#e7dfd2] p-4">
									<div className="flex items-center justify-between gap-3">
										<p className="text-sm font-bold text-[#2b4336]">{experience.title}</p>
										<p className="text-sm font-extrabold text-[#1a3d2b]">${experience.price} USD</p>
									</div>
									<p className="mt-1 text-sm text-[#5d6b64]">{experience.location}</p>
									<p className="text-xs uppercase tracking-[0.12em] text-[#7b8a82]">
										Duracion: {experience.duration}
									</p>
								</article>
							))}
						</div>
					</div>
				</article>
			</div>
		</section>
	);
}
