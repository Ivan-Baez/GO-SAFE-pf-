type ExperienceContentSectionProps = {
  title?: string;
  items: string[];
};

const ExperienceContentSection: React.FC<ExperienceContentSectionProps> = ({
  title = "Experiencia",
  items,
}) => {
  return (
    <div>
      <h3 className="mb-2 font-bold text-[#1a3d2b]">{title}</h3>

      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>✔ {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceContentSection;
