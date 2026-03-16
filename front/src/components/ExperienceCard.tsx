import { Heart, MapPin, Leaf, Map as MapIcon, Send } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  dateRange: string;
  author: string;
  attendees: number;
  image: string;
  category: string;
}

export default function ExperienceCard({ exp }: { exp: any }) {
  return (
    <div className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-100 max-w-[300px] hover:shadow-md transition-shadow duration-300">
      {/* Imagen con bordes muy redondeados */}
      <div className="relative h-44 w-full mb-4 overflow-hidden rounded-[24px]">
        <img
          src={exp.image || "https://images.unsplash.com/photo-1522163182402-834f871fd851"}
          alt={exp.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="px-2">
        <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
          {exp.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>{exp.dateRange || "14-29 Junio"}</span>
          <span>•</span>
          <span>por {exp.author || "Robbin Joseph"}</span>
        </div>

        {/* Iconos circulares decorativos */}
        <div className="flex gap-2 mb-6">
          <div className="p-2 bg-gray-50 rounded-full text-gray-400">
            <Leaf size={16} />
          </div>
          <div className="p-2 bg-gray-50 rounded-full text-gray-400">
            <MapIcon size={16} />
          </div>
          <div className="p-2 bg-gray-50 rounded-full text-gray-400">
            <Send size={16} />
          </div>
        </div>

        {/* Footer de la Card */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={16} className="text-gray-400" />
            <span>{exp.attendees || 24} personas asistirán</span>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}