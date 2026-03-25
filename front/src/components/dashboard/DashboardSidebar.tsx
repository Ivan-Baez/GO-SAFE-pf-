"use client";

import Link from "next/link";
import { LogOut, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type SidebarItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
};

interface DashboardSidebarProps {
  title: string;
  subtitle: string;
  menuItems: SidebarItem[];
  onLogout: () => void;
}

export default function DashboardSidebar({
  title,
  subtitle,
  menuItems,
  onLogout,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  let activeAssigned = false;

  return (
    <aside className="flex min-h-screen w-65 flex-col justify-between bg-[#1a3d2b] p-6 text-white">
      <div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const matchesPath = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isActive = matchesPath && !activeAssigned;

            if (isActive) {
              activeAssigned = true;
            }

            if (item.disabled) {
              return (
                <div
                  key={item.name}
                  className="cursor-not-allowed rounded-2xl px-4 py-3 text-white/40"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-[#df6d51]"
      >
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}