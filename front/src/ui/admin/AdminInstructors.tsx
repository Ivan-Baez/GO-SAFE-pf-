"use client";

import { useEffect, useMemo, useState } from "react";

export type InstructorStatus = "pending" | "approved" | "banned";

export interface AdminInstructor {
  id: string;
  firstName: string;
  lastName: string;
  userName?: string;
  email?: string;
  phone?: number | string;
  documentType?: string;
  document?: number | string;
  country?: string;
  city?: string;
  address?: string;
  profilePic?: string;
  career?: string;
  institution?: string;
  level?: string;
  period?: string;
  onCourse?: boolean;
  about?: string;
  certifications?: string[];
  status?: InstructorStatus | string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminInstructors() {
  const [instructors, setInstructors] = useState<AdminInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | InstructorStatus>("all");

  const getToken = () => {
    if (typeof window === "undefined") return null;

    const session = localStorage.getItem("userSession");
    if (!session) return null;

    try {
      const parsed = JSON.parse(session);
      return parsed?.token || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("No hay token de sesión. Iniciá sesión.");
      }

      const res = await fetch(`${API_URL}/instructors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (res.status === 403) {
        throw new Error("No tenés permisos para ver esta sección.");
      }

      if (!res.ok) {
        throw new Error("No se pudieron obtener los instructores.");
      }

      const data = await res.json();

      const mappedData: AdminInstructor[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id || item._id || "",
            firstName:
              item.firstName ||
              item.user?.firstName ||
              item.user?.fistName ||
              "",
            lastName: item.lastName || item.user?.lastName || "",
            userName: item.userName || item.user?.userName || "",
            email: item.email || item.user?.email || "",
            phone: item.phone || item.user?.phone || "",
            documentType: item.documentType || item.user?.documentType || "",
            document: item.document || item.user?.document || "",
            country: item.country || item.user?.country || "",
            city: item.city || item.user?.city || "",
            address: item.address || item.user?.address || "",
            profilePic: item.profilePic || item.user?.profilePic || "",
            career: item.career || item.instructor?.career || "",
            institution: item.institution || item.instructor?.institution || "",
            level: item.level || item.instructor?.level || "",
            period: item.period || item.instructor?.period || "",
            onCourse: item.onCourse ?? item.instructor?.onCourse,
            about: item.about || item.instructor?.about || "",
            certifications:
              item.certifications || item.instructor?.certifications || [],
            status: item.status || "pending",
          }))
        : [];

      setInstructors(mappedData);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (instructor: AdminInstructor) => {
    try {
      setLoadingId(instructor.id);

      const token = getToken();
      if (!token) throw new Error("No hay token.");

      const bodyToSend = {
        ...instructor,
        status: "approved",
      };

      const res = await fetch(`${API_URL}/instructors/${instructor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) {
        throw new Error("No se pudo aprobar el instructor.");
      }

      setInstructors((prev) =>
        prev.map((item) =>
          item.id === instructor.id ? { ...item, status: "approved" } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo aprobar el instructor.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleBan = async (id: string) => {
    try {
      setLoadingId(id);

      const token = getToken();
      if (!token) throw new Error("No hay token.");

      const res = await fetch(`${API_URL}/instructors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("No se pudo banear/eliminar el instructor.");
      }

      setInstructors((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "banned" } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo banear/eliminar el instructor.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredInstructors = useMemo(() => {
    return instructors.filter((instructor) => {
      const fullName =
        `${instructor.firstName} ${instructor.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (instructor.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (instructor.userName || "").toLowerCase().includes(search.toLowerCase()) ||
        (instructor.city || "").toLowerCase().includes(search.toLowerCase()) ||
        (instructor.country || "").toLowerCase().includes(search.toLowerCase()) ||
        (instructor.career || "").toLowerCase().includes(search.toLowerCase());

      const currentStatus = (instructor.status || "pending") as InstructorStatus;
      const matchesStatus =
        statusFilter === "all" ? true : currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [instructors, search, statusFilter]);

  const getStatusStyles = (status: InstructorStatus = "pending") => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border border-green-200";
      case "banned":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Cargando instructores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#f8f6f1] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3c31]">
              Gestión de instructores
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Revisá perfiles y decidí si admitirlos o banearlos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Buscar instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-[320px] rounded-xl border border-[#d9d4ca] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1e3c31]"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | InstructorStatus)
              }
              className="rounded-xl border border-[#d9d4ca] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1e3c31]"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobados</option>
              <option value="banned">Baneados</option>
            </select>
          </div>
        </div>

        {filteredInstructors.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-[#ece7df]">
            <p className="text-gray-600">No se encontraron instructores.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredInstructors.map((instructor) => {
              const currentStatus = (instructor.status || "pending") as InstructorStatus;

              return (
                <article
                  key={instructor.id}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-[#ece7df]"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={
                          instructor.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt={`${instructor.firstName} ${instructor.lastName}`}
                        className="h-20 w-20 rounded-full object-cover border border-[#ece7df]"
                      />

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-[#1e3c31]">
                            {instructor.firstName} {instructor.lastName}
                          </h2>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                              currentStatus
                            )}`}
                          >
                            {currentStatus === "pending" && "Pendiente"}
                            {currentStatus === "approved" && "Aprobado"}
                            {currentStatus === "banned" && "Baneado"}
                          </span>
                        </div>

                        {instructor.userName && (
                          <p className="text-sm text-gray-500">@{instructor.userName}</p>
                        )}

                        <p className="text-sm text-gray-700 mt-1">
                          {instructor.email || "Sin email"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {[instructor.city, instructor.country]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(instructor)}
                        disabled={loadingId === instructor.id || currentStatus === "approved"}
                        className="rounded-xl bg-[#1e3c31] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                      >
                        {loadingId === instructor.id ? "Procesando..." : "Admitir"}
                      </button>

                      <button
                        onClick={() => handleBan(instructor.id)}
                        disabled={loadingId === instructor.id || currentStatus === "banned"}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                      >
                        {loadingId === instructor.id ? "Procesando..." : "Banear"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InfoItem label="Carrera" value={instructor.career} />
                    <InfoItem label="Institución" value={instructor.institution} />
                    <InfoItem label="Nivel" value={instructor.level} />
                    <InfoItem label="Período" value={instructor.period} />
                    <InfoItem
                      label="En curso"
                      value={
                        instructor.onCourse === undefined
                          ? "-"
                          : instructor.onCourse
                          ? "Sí"
                          : "No"
                      }
                    />
                    <InfoItem label="Teléfono" value={String(instructor.phone || "")} />
                    <InfoItem
                      label="Documento"
                      value={
                        instructor.documentType || instructor.document
                          ? `${instructor.documentType || ""} ${instructor.document || ""}`
                          : "-"
                      }
                    />
                    <InfoItem label="Ciudad" value={instructor.city} />
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-[#1e3c31] mb-1">
                      Sobre el instructor
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {instructor.about || "Sin descripción."}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-[#1e3c31] mb-2">
                      Certificaciones
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {instructor.certifications &&
                      instructor.certifications.length > 0 ? (
                        instructor.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-[#eef3ef] px-3 py-1 text-xs text-[#1e3c31]"
                          >
                            {typeof cert === "string" ? cert : "Certificación"}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          Sin certificaciones cargadas
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#ece7df]">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-[#1e3c31] break-words">
        {value || "-"}
      </p>
    </div>
  );
}