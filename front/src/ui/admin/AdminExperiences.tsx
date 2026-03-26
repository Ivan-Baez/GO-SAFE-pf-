"use client";

import { useEffect, useState } from "react";
import { MapPin, DollarSign, UserRound, EyeOff } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);

  const getToken = () => {
    const s = localStorage.getItem("userSession");
    return s ? JSON.parse(s)?.token : null;
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const res = await fetch(`${API_URL}/experiences`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const data = await res.json();
    setExperiences(data);
    setLoading(false);
  };

  // 🔥 OCULTAR / MOSTRAR
  const toggleStatus = async (exp: any) => {
    await fetch(`${API_URL}/experiences/${exp.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        ...exp,
        status: !exp.status,
      }),
    });

    setExperiences((prev) =>
      prev.map((e) =>
        e.id === exp.id ? { ...e, status: !e.status } : e
      )
    );
  };

  // ✏️ EDITAR
  const handleUpdate = async () => {
    await fetch(`${API_URL}/experiences/${selected.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(selected),
    });

    setSelected(null);
    setEditMode(false);
    fetchExperiences();
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <section className="p-6 bg-[#f7f4ee] min-h-screen">

      <h1 className="text-2xl font-bold text-[#1a3d2b] mb-6">
        Experiencias
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white rounded-2xl shadow border overflow-hidden">

            <img
              src={exp.imageUrl}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-lg text-[#1a3d2b]">
                {exp.title}
              </h2>

              <p className="text-sm text-gray-500">
                {exp.category} · {exp.dificulty}
              </p>

              <p className="text-sm mt-2 line-clamp-2">
                {exp.description}
              </p>

              <div className="mt-3 space-y-1 text-sm">

                <p className="flex items-center gap-2">
                  <MapPin size={14} /> {exp.city}, {exp.country}
                </p>

                <p className="flex items-center gap-2">
                  <DollarSign size={14} /> ${exp.price}
                </p>

                <p className="flex items-center gap-2">
                  <UserRound size={14} />
                  {exp.instructor?.user?.firstName || "Instructor"}
                </p>

              </div>

              {/* 🔥 ESTADO */}
              <p className="mt-2 text-sm">
                Estado:{" "}
                <span className={exp.status ? "text-green-600" : "text-red-500"}>
                  {exp.status ? "Activa" : "Oculta"}
                </span>
              </p>

              <div className="flex gap-2 mt-4 flex-wrap">

                <button
                  onClick={() => setSelected(exp)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  Ver
                </button>

                <button
                  onClick={() => {
                    setSelected(exp);
                    setEditMode(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => toggleStatus(exp)}
                  className="bg-[#1a3d2b] text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <EyeOff size={14} />
                  {exp.status ? "Ocultar" : "Mostrar"}
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-[500px] space-y-3">

            <h2 className="font-bold text-lg">
              {editMode ? "Editar experiencia" : "Detalle"}
            </h2>

            {[
              "title",
              "description",
              "city",
              "country",
              "price",
              "capacity",
              "category",
              "dificulty",
            ].map((field) => (
              <input
                key={field}
                disabled={!editMode}
                value={selected[field] || ""}
                onChange={(e) =>
                  setSelected({ ...selected, [field]: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            ))}

            <div className="flex justify-end gap-2">

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
    </section>
  );
}