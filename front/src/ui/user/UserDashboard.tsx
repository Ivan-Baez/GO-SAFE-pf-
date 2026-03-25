"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import UserSidebar from "@/components/dashboard/UserSidebar";
import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";
import { toastError, toastSuccess } from "@/lib/toast";
import {
    UserCircle2,
    Mail,
    PencilLine,
    NotebookPen,
    CalendarDays,
    MapPin,
    Save,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface DecodedToken {
    id?: string;
    role?: string;
    email?: string;
}

interface UserProfile {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phone?: string;
    profilePic?: string;
}

interface BlogItem {
    id: string;
    text: string;
    imageUrl?: string;
    user?: { id?: string; firstName?: string; lastName?: string };
}

interface UserActivity {
    id: string;
    status?: boolean;
    paymentStatus?: string;
    experience?: {
        title?: string;
        location?: string;
        date?: string;
    };
    user?: { id?: string };
}

export default function UserDashboard() {
    const { userData, setUserData } = useAuth();
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [myPosts, setMyPosts] = useState<BlogItem[]>([]);
    const [activities, setActivities] = useState<UserActivity[]>([]);

    const [editValues, setEditValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        profilePic: "",
    });

    const [newPost, setNewPost] = useState({
        text: "",
        imageUrl: "",
    });

    const userIdFromToken = useMemo(() => {
        if (!userData?.token) return "";
        try {
            const decoded = jwtDecode<DecodedToken>(userData.token);
            return decoded.id || "";
        } catch {
            return "";
        }
    }, [userData?.token]);

    const displayName = useMemo(() => {
        if (profile?.firstName || profile?.lastName) {
            return `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
        }
        return userData?.user?.name || "Usuario";
    }, [profile, userData?.user?.name]);

    const approvedActivities = useMemo(
        () =>
            activities.filter(
                (activity) => activity.paymentStatus === "approved" || activity.status,
            ).length,
        [activities],
    );

    const profileCompletion = useMemo(() => {
        const fields = [
            editValues.firstName,
            editValues.lastName,
            editValues.email,
            editValues.address,
            editValues.phone,
            editValues.profilePic,
        ];

        const completed = fields.filter((field) => field.trim().length > 0).length;
        return Math.round((completed / fields.length) * 100);
    }, [editValues]);

    const loadDashboardData = async () => {
        if (!userData?.token || !userIdFromToken) return;

        try {
            const [profileRes, blogsRes, ordersRes] = await Promise.all([
                fetch(`${API_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${userData.token}` },
                    cache: "no-store",
                }),
                fetch(`${API_URL}/blogs`, { cache: "no-store" }),
                fetch(`${API_URL}/orders`, { cache: "no-store" }),
            ]);

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);
                setEditValues({
                    firstName: profileData.firstName || "",
                    lastName: profileData.lastName || "",
                    email: profileData.email || userData.user.email || "",
                    address: profileData.address || userData.user.address || "",
                    phone: String(profileData.phone || userData.user.phone || ""),
                    profilePic: profileData.profilePic || "",
                });
            }

            if (blogsRes.ok) {
                const blogsData: BlogItem[] = await blogsRes.json();
                setMyPosts(blogsData.filter((post) => post.user?.id === userIdFromToken));
            }

            if (ordersRes.ok) {
                const ordersData: UserActivity[] = await ordersRes.json();
                setActivities(
                    ordersData.filter((order) => order.user?.id === userIdFromToken),
                );
            }
        } catch {
            toastError("No se pudo cargar toda la informacion del dashboard");
        }
    };

    useEffect(() => {
        loadDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData?.token, userIdFromToken]);

    const handleSaveProfile = async () => {
        if (!userData?.token || !userIdFromToken) {
            toastError("Sesion invalida, vuelve a iniciar sesion");
            return;
        }

        try {
            setIsSavingProfile(true);
            const response = await fetch(`${API_URL}/users/${userIdFromToken}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.token}`,
                },
                body: JSON.stringify({
                    firstName: editValues.firstName,
                    lastName: editValues.lastName,
                    email: editValues.email,
                    address: editValues.address,
                    phone: Number(editValues.phone),
                    profilePic: editValues.profilePic,
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.message || "No se pudo actualizar el perfil");
            }

            setProfile((prev) => ({
                ...(prev || { id: userIdFromToken }),
                ...editValues,
            }));

            if (userData) {
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        name: `${editValues.firstName} ${editValues.lastName}`.trim(),
                        email: editValues.email,
                        address: editValues.address,
                        phone: editValues.phone,
                    },
                });
            }

            toastSuccess("Perfil actualizado correctamente");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "No se pudo guardar";
            toastError(message);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleCreatePost = async () => {
        if (!userIdFromToken) {
            toastError("Sesion invalida, vuelve a iniciar sesion");
            return;
        }

        if (!newPost.text.trim()) {
            toastError("Escribe el contenido del post");
            return;
        }

        try {
            setIsPublishing(true);
            const response = await fetch(`${API_URL}/blogs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: newPost.text.trim(),
                    userId: userIdFromToken,
                    imageUrl: newPost.imageUrl.trim() || undefined,
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.message || "No se pudo crear la publicacion");
            }

            const created: BlogItem = await response.json();
            setMyPosts((prev) => [created, ...prev]);
            setNewPost({ text: "", imageUrl: "" });
            toastSuccess("Publicacion creada");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "No se pudo crear";
            toastError(message);
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <DashboardLayout sidebar={<UserSidebar />}>
            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
                            Panel del usuario
                        </p>
                        <h1 className="text-3xl font-bold text-[#1a3d2b] md:text-4xl">
                            Gestiona tu perfil y actividad
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Revisa tus reservas, actualiza tu cuenta y comparte tus aventuras.
                        </p>
                    </div>
                </div>

                <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-[#ece7df] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#1a3d2b]">
                            Perfil de usuario
                        </h2>
                        <p className="mt-1 text-gray-600">
                            Tu cuenta está <span className="font-semibold text-[#1a3d2b]">activa</span> y lista para reservar experiencias.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-[#f7f4ee] px-4 py-3 text-sm text-[#1a3d2b]">
                        Perfil completado: <span className="font-bold">{profileCompletion}%</span>
                    </div>
                </div>

                <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardStatCard
                        icon={NotebookPen}
                        title="Publicaciones creadas"
                        value={myPosts.length}
                        iconWrapperClassName="bg-[#f2c24d]/20"
                        iconClassName="text-[#c58a00]"
                    />
                    <DashboardStatCard
                        icon={CalendarDays}
                        title="Actividades registradas"
                        value={activities.length}
                        iconWrapperClassName="bg-[#df6d51]/15"
                        iconClassName="text-[#df6d51]"
                    />
                    <DashboardStatCard
                        icon={MapPin}
                        title="Reservas aprobadas"
                        value={approvedActivities}
                        iconWrapperClassName="bg-[#1a3d2b]/10"
                        iconClassName="text-[#1a3d2b]"
                    />
                    <DashboardStatCard
                        icon={Mail}
                        title="Correo principal"
                        value={editValues.email || userData?.user?.email || "Sin correo"}
                        iconWrapperClassName="bg-[#f2c24d]/20"
                        iconClassName="text-[#c58a00]"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2 space-y-6">
                        <div className="rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-wide text-gray-500">
                                        Cuenta
                                    </p>
                                    <h2 className="text-2xl font-bold text-[#1a3d2b]">
                                        Mi perfil
                                    </h2>
                                </div>
                            </div>

                            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#ece7df] p-4">
                                {editValues.profilePic ? (
                                    <img
                                        src={editValues.profilePic}
                                        alt="Foto de perfil"
                                        className="h-20 w-20 rounded-2xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#edf1ea]">
                                        <UserCircle2 className="text-[#1a3d2b]" size={40} />
                                    </div>
                                )}

                                <div>
                                    <p className="text-lg font-semibold text-[#1a3d2b]">{displayName}</p>
                                    <p className="text-sm text-gray-500">
                                        {editValues.email || userData?.user?.email}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input
                                    value={editValues.profilePic}
                                    onChange={(event) =>
                                        setEditValues((prev) => ({ ...prev, profilePic: event.target.value }))
                                    }
                                    placeholder="URL foto de perfil"
                                    className="w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                                />
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <input
                                        value={editValues.firstName}
                                        onChange={(event) =>
                                            setEditValues((prev) => ({ ...prev, firstName: event.target.value }))
                                        }
                                        placeholder="Nombre"
                                        className="w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                                    />
                                    <input
                                        value={editValues.lastName}
                                        onChange={(event) =>
                                            setEditValues((prev) => ({ ...prev, lastName: event.target.value }))
                                        }
                                        placeholder="Apellido"
                                        className="w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                                    />
                                </div>
                                <input
                                    value={editValues.email}
                                    onChange={(event) =>
                                        setEditValues((prev) => ({ ...prev, email: event.target.value }))
                                    }
                                    placeholder="Correo"
                                    className="w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                                />
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <input
                                        value={editValues.address}
                                        onChange={(event) =>
                                            setEditValues((prev) => ({ ...prev, address: event.target.value }))
                                        }
                                        placeholder="Direccion"
                                        className="w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                                    />
                                    <input
                                        value={editValues.phone}
                                        onChange={(event) =>
                                            setEditValues((prev) => ({ ...prev, phone: event.target.value }))
                                        }
                                        placeholder="Telefono"
                                        className="w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                                    />
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    disabled={isSavingProfile}
                                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#1a3d2b] px-5 py-3 font-semibold text-white transition hover:bg-[#122a1e] disabled:opacity-60"
                                >
                                    <Save size={16} />
                                    {isSavingProfile ? "Guardando..." : "Guardar cambios"}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-wide text-gray-500">
                                        Comunidad
                                    </p>
                                    <h2 className="text-2xl font-bold text-[#1a3d2b]">
                                        Mis publicaciones
                                    </h2>
                                </div>
                            </div>

                            {myPosts.length === 0 ? (
                                <p className="rounded-xl bg-[#f6f3ec] px-4 py-3 text-sm text-gray-600">
                                    Aun no has creado publicaciones.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {myPosts.map((post) => (
                                        <article
                                            key={post.id}
                                            className="rounded-2xl border border-[#ece6d9] p-4"
                                        >
                                            <p className="text-sm text-[#2c2c2c]">{post.text}</p>
                                            {post.imageUrl ? (
                                                <img
                                                    src={post.imageUrl}
                                                    alt="Imagen de la publicacion"
                                                    className="mt-3 h-44 w-full rounded-xl object-cover"
                                                />
                                            ) : null}
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <NotebookPen size={18} className="text-[#1a3d2b]" />
                                <h3 className="text-xl font-bold text-[#1a3d2b]">Crear publicacion</h3>
                            </div>

                            <textarea
                                value={newPost.text}
                                onChange={(event) =>
                                    setNewPost((prev) => ({ ...prev, text: event.target.value }))
                                }
                                rows={4}
                                placeholder="Comparte tu experiencia, consejos o historias de aventura..."
                                className="w-full rounded-2xl border border-[#d9d3c6] px-4 py-3 text-sm outline-none focus:border-[#1a3d2b]"
                            />

                            <input
                                value={newPost.imageUrl}
                                onChange={(event) =>
                                    setNewPost((prev) => ({ ...prev, imageUrl: event.target.value }))
                                }
                                placeholder="URL de imagen (opcional)"
                                className="mt-3 w-full rounded-xl border border-[#d9d3c6] px-4 py-2.5 text-sm outline-none focus:border-[#1a3d2b]"
                            />

                            <button
                                onClick={handleCreatePost}
                                disabled={isPublishing}
                                className="mt-4 w-full rounded-xl bg-[#e8b62d] px-5 py-2.5 font-semibold text-[#1a1a1a] transition hover:bg-[#d7a920] disabled:opacity-60"
                            >
                                {isPublishing ? "Publicando..." : "Publicar"}
                            </button>
                        </div>

                        <div className="rounded-3xl border border-[#ece7df] bg-white p-6 shadow-sm">
                            <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
                                Agenda
                            </p>
                            <h2 className="mb-5 text-2xl font-bold text-[#1a3d2b]">
                                Mis actividades
                            </h2>

                            {activities.length === 0 ? (
                                <p className="rounded-xl bg-[#f6f3ec] px-4 py-3 text-sm text-gray-600">
                                    Todavia no tienes actividades registradas.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="rounded-2xl border border-[#ece7df] p-4"
                                        >
                                            <p className="font-semibold text-[#1a3d2b]">
                                                {activity.experience?.title || "Experiencia"}
                                            </p>
                                            <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600">
                                                <span className="inline-flex items-center gap-2">
                                                    <MapPin size={14} />
                                                    {activity.experience?.location || "Ubicacion por confirmar"}
                                                </span>
                                                <span className="inline-flex items-center gap-2">
                                                    <CalendarDays size={14} />
                                                    {activity.experience?.date || "Fecha por confirmar"}
                                                </span>
                                                <span className="mt-1 inline-flex w-fit rounded-full bg-[#eef4ee] px-3 py-1 text-xs font-medium text-[#1a3d2b]">
                                                    {activity.paymentStatus || (activity.status ? "approved" : "pending")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}