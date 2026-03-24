"use client";

import { useEffect, useMemo, useState } from "react";

type UserStatus = "active" | "banned" | "pending";
type UserRole = "user" | "admin" | "instructor";

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  userName?: string;
  email?: string;
  birthdate?: string;
  genre?: string;
  documentType?: string;
  document?: number | string;
  phone?: number | string;
  country?: string;
  city?: string;
  address?: string;
  profilePic?: string;
  role?: UserRole | string;
  status?: UserStatus | string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");

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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("No hay token de sesión. Iniciá sesión.");
      }

      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (res.status === 403) {
        throw new Error("No tenés permisos para ver los usuarios.");
      }

      if (!res.ok) {
        throw new Error("No se pudieron obtener los usuarios.");
      }

      const data = await res.json();

      const mappedUsers: AdminUser[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id || item._id || "",
            firstName: item.firstName || item.fistName || "",
            lastName: item.lastName || "",
            userName: item.userName || "",
            email: item.email || "",
            birthdate: item.birthdate || "",
            genre: item.genre || "",
            documentType: item.documentType || "",
            document: item.document || "",
            phone: item.phone || "",
            country: item.country || "",
            city: item.city || "",
            address: item.address || "",
            profilePic: item.profilePic || "",
            role: item.role || "user",
            status: item.status || "active",
          }))
        : [];

      setUsers(mappedUsers);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (id: string) => {
    try {
      setLoadingId(id);

      const token = getToken();
      if (!token) throw new Error("No hay token.");

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("No se pudo banear/eliminar el usuario.");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: "banned" } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo banear/eliminar el usuario.");
    } finally {
      setLoadingId(null);
    }
  };

  const handlePromoteToAdmin = async (user: AdminUser) => {
    try {
      setLoadingId(user.id);

      const token = getToken();
      if (!token) throw new Error("No hay token.");

      const bodyToSend = {
        ...user,
        role: "admin",
      };

      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) {
        throw new Error("No se pudo actualizar el usuario.");
      }

      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id ? { ...item, role: "admin" } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el usuario.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const userRole = (user.role || "user") as UserRole;
      const userStatus = (user.status || "active") as UserStatus;

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.userName || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.city || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.country || "").toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" ? true : userRole === roleFilter;
      const matchesStatus =
        statusFilter === "all" ? true : userStatus === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const getStatusStyles = (status: string = "active") => {
    switch (status) {
      case "banned":
        return "bg-red-100 text-red-700 border border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      default:
        return "bg-green-100 text-green-700 border border-green-200";
    }
  };

  const getRoleStyles = (role: string = "user") => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "instructor":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Cargando usuarios...</p>
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
              Gestión de usuarios
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Administrá usuarios, revisá sus datos y bloqueá cuentas si hace falta.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            <input
              type="text"
              placeholder="Buscar por nombre, email o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg:w-[320px] rounded-xl border border-[#d9d4ca] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1e3c31]"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "all" | UserRole)}
              className="rounded-xl border border-[#d9d4ca] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1e3c31]"
            >
              <option value="all">Todos los roles</option>
              <option value="user">Usuarios</option>
              <option value="instructor">Instructores</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | UserStatus)
              }
              className="rounded-xl border border-[#d9d4ca] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1e3c31]"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="pending">Pendientes</option>
              <option value="banned">Baneados</option>
            </select>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#ece7df]">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-[#1e3c31]">{users.length}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#ece7df]">
            <p className="text-sm text-gray-500">Usuarios</p>
            <p className="text-2xl font-bold text-gray-700">
              {users.filter((u) => (u.role || "user") === "user").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#ece7df]">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#ece7df]">
            <p className="text-sm text-gray-500">Baneados</p>
            <p className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.status === "banned").length}
            </p>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-[#ece7df]">
            <p className="text-gray-600">No se encontraron usuarios.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredUsers.map((user) => {
              const currentStatus = user.status || "active";
              const currentRole = user.role || "user";

              return (
                <article
                  key={user.id}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-[#ece7df]"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={
                          user.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-20 w-20 rounded-full object-cover border border-[#ece7df]"
                      />

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-[#1e3c31]">
                            {user.firstName} {user.lastName}
                          </h2>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                              currentStatus
                            )}`}
                          >
                            {currentStatus === "active" && "Activo"}
                            {currentStatus === "pending" && "Pendiente"}
                            {currentStatus === "banned" && "Baneado"}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleStyles(
                              currentRole
                            )}`}
                          >
                            {currentRole}
                          </span>
                        </div>

                        {user.userName && (
                          <p className="text-sm text-gray-500">@{user.userName}</p>
                        )}

                        <p className="text-sm text-gray-700 mt-1">
                          {user.email || "Sin email"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {[user.city, user.country].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentRole !== "admin" && (
                        <button
                          onClick={() => handlePromoteToAdmin(user)}
                          disabled={loadingId === user.id}
                          className="rounded-xl bg-[#1e3c31] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                          {loadingId === user.id ? "Procesando..." : "Hacer admin"}
                        </button>
                      )}

                      <button
                        onClick={() => handleBan(user.id)}
                        disabled={loadingId === user.id || currentStatus === "banned"}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                      >
                        {loadingId === user.id ? "Procesando..." : "Banear"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InfoItem label="Fecha de nacimiento" value={user.birthdate} />
                    <InfoItem label="Género" value={user.genre} />
                    <InfoItem label="Teléfono" value={String(user.phone || "")} />
                    <InfoItem
                      label="Documento"
                      value={
                        user.documentType || user.document
                          ? `${user.documentType || ""} ${user.document || ""}`
                          : "-"
                      }
                    />
                    <InfoItem label="País" value={user.country} />
                    <InfoItem label="Ciudad" value={user.city} />
                    <InfoItem label="Dirección" value={user.address} />
                    <InfoItem label="Rol" value={currentRole} />
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