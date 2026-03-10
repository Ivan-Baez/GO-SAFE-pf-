import React from "react";

export default function AdminDashboard() {
  const stats = [
    { title: "Users", value: 128 },
    { title: "Experiences", value: 42 },
    { title: "Instructors", value: 16 },
    { title: "Bookings", value: 73 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl shadow p-6 flex flex-col"
          >
            <span className="text-gray-500 text-sm">{stat.title}</span>
            <span className="text-2xl font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Usuarios recientes</h2>
          <ul className="space-y-2">
            <li className="flex justify-between border-b pb-2">
              <span>Ana García</span>
              <span className="text-gray-500 text-sm">ana@email.com</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Juan Pérez</span>
              <span className="text-gray-500 text-sm">juan@email.com</span>
            </li>
            <li className="flex justify-between">
              <span>Lucía Torres</span>
              <span className="text-gray-500 text-sm">lucia@email.com</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actiones rápidas</h2>
          <div className="flex flex-col gap-3">
            <button className="bg-gray-600 text-white rounded-xl py-2">Administrar Experiencia</button>
            <button className="bg-gray-600 text-white rounded-xl py-2">Administrar Usuarios</button>
            <button className="bg-gray-600 text-white rounded-xl py-2">Administrar Instructores</button>
            <button className="bg-gray-600 text-white rounded-xl py-2">Administrar Publica</button>
          </div>
        </div>
      </div>
    </div>
  );
}
