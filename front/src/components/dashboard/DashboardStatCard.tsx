import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconClassName: string;
  iconWrapperClassName: string;
}

export default function DashboardStatCard({
  icon: Icon,
  title,
  value,
  iconClassName,
  iconWrapperClassName,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-3xl border border-[#ece7df] bg-white p-5 shadow-sm">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${iconWrapperClassName}`}>
        <Icon size={20} className={iconClassName} />
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="mt-1 text-3xl font-bold text-[#1a3d2b]">{value}</h3>
    </div>
  );
}