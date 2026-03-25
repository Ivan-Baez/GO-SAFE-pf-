import { ReactNode } from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <section className="flex min-h-screen w-full bg-gray-50">
      {sidebar}
      <div className="w-full flex-1">{children}</div>
    </section>
  );
}