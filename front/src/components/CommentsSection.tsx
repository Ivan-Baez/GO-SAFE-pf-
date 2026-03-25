"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export type CommentItem = {
  id: number;
  author: string;
  message: string;
  rating: number;
  date: string;
};

type CommentsSectionProps = {
  title?: string;
  initialComments?: CommentItem[];
};

const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: 1,
    author: "Maria Fernandez",
    message:
      "Increible experiencia. El instructor fue claro, paciente y muy profesional durante toda la actividad.",
    rating: 5,
    date: "Hace 2 dias",
  },
  {
    id: 2,
    author: "Carlos Medina",
    message:
      "Muy buena organizacion y equipo en excelente estado. Repetiria sin dudas.",
    rating: 4,
    date: "Hace 1 semana",
  },
];

const getStars = (rating: number) => {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
};

const CommentsSection: React.FC<CommentsSectionProps> = ({
  title = "Comentarios",
  initialComments,
}) => {
  const { userData } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>(
    initialComments?.length ? initialComments : DEFAULT_COMMENTS,
  );
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const averageRating = useMemo(() => {
    if (!comments.length) return 0;
    const total = comments.reduce((acc, current) => acc + current.rating, 0);
    return total / comments.length;
  }, [comments]);

  const handleAddComment = () => {
    const authorName = userData?.user?.name?.trim();

    if (!authorName || !message.trim()) return;

    const newComment: CommentItem = {
      id: Date.now(),
      author: authorName,
      message: message.trim(),
      rating,
      date: "Ahora",
    };

    setComments((prev) => [newComment, ...prev]);
    setMessage("");
    setRating(5);
  };

  return (
    <section className="mx-auto mt-10 max-w-6xl rounded-2xl bg-white p-6 shadow">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-[#1a3d2b]">{title}</h3>
        <div className="text-right text-sm text-gray-600">
          <p className="font-semibold text-[#1a3d2b]">
            {averageRating.toFixed(1)} / 5
          </p>
          <p>{comments.length} opiniones</p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 rounded-xl bg-[#f7efe5] p-4 md:grid-cols-12">
        <div className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 md:col-span-3">
          {userData?.user?.name || "Inicia sesion para comentar"}
        </div>

        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Escribe tu comentario"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-6"
        />

        <select
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-1"
        >
          {[5, 4, 3, 2, 1].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddComment}
          disabled={!userData?.user?.name}
          className="rounded-lg bg-[#1a3d2b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#245a3f] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        >
          Publicar
        </button>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-xl border border-gray-200 p-4">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[#1a3d2b]">{comment.author}</p>
                <p className="text-xs text-gray-500">{comment.date}</p>
              </div>
              <p className="text-sm font-semibold text-[#d4a017]" aria-label={`Puntuacion ${comment.rating} de 5`}>
                {getStars(comment.rating)}
              </p>
            </div>
            <p className="text-sm text-gray-700">{comment.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;
