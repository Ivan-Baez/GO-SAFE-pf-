interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}