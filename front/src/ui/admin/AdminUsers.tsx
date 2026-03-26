"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getToken = () => {
    const s = localStorage.getItem("userSession");
    return s ? JSON.parse(s)?.token : null;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await res.json();

    // 🔥 IMPORTANTE: mapear status
    const mapped = data
      .filter((u: any) => u.role === "user")
      .map((u: any) => ({
        ...u,
        statusText: u.status ? "active" : "banned",
      }));

    setUsers(mapped);
  };

  // 🔴 BANEAR
  const handleBan = async (id: string) => {
    try {
      setLoadingId(id);

      await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      // 🔥 ACTUALIZACIÓN EN TIEMPO REAL (SIN REFRESH)
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: false, statusText: "banned" }
            : u
        )
      );

    } catch (err) {
      console.error(err);
      alert("Error al banear usuario");
    } finally {
      setLoadingId(null);
    }
  };

  // ✏️ EDITAR
  const handleUpdate = async () => {
    await fetch(`${API_URL}/users/${selected.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(selected),
    });

    setSelected(null);
    setEditMode(false);
    fetchUsers();
  };

  const filtered = useMemo(() => {
    return users.filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="p-6 bg-[#f8f6f1] min-h-screen">

      <h1 className="text-2xl font-bold text-[#1e3c31] mb-4">
        Usuarios
      </h1>

      <input
        placeholder="Buscar..."
        className="border px-4 py-2 rounded-xl mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-4">

        {filtered.map((u) => (
          <div key={u.id} className="bg-white p-5 rounded-2xl border shadow-sm">

            <h2 className="font-bold text-[#1e3c31]">
              {u.firstName} {u.lastName}
            </h2>

            <p className="text-sm text-gray-500">{u.email}</p>

            {/* 🔥 ESTADO */}
            <p className="text-sm mt-1">
              Estado:{" "}
              <span
                className={
                  u.statusText === "active"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {u.statusText}
              </span>
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">

              <button
                onClick={() => {
                  setSelected(u);
                  setEditMode(false);
                }}
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                Ver
              </button>

              <button
                onClick={() => {
                  setSelected(u);
                  setEditMode(true);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
              >
                Editar
              </button>

              {/* 🔴 SOLO SI ESTA ACTIVO */}
              {u.status && (
                <button
                  onClick={() => handleBan(u.id)}
                  disabled={loadingId === u.id}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg disabled:opacity-50"
                >
                  {loadingId === u.id ? "Procesando..." : "Banear"}
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-[500px] space-y-3">

            <h2 className="font-bold text-lg">
              {editMode ? "Editar usuario" : "Perfil"}
            </h2>

            {[
              "firstName",
              "lastName",
              "email",
              "phone",
              "country",
              "city",
              "address",
            ].map((field) => (
              <input
                key={field}
                disabled={!editMode}
                value={selected[field] || ""}
                onChange={(e) =>
                  setSelected({ ...selected, [field]: e.target.value })
                }
                placeholder={field}
                className="border p-2 w-full rounded"
              />
            ))}

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setSelected(null)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Cerrar
              </button>

              {editMode && (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Guardar
                </button>
              )}

            </div>

          </div>

        </div>
      )}
    </div>
  );
}