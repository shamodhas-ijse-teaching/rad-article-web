import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

interface ArticleCardProps {
  item: any
  onFavorite?: (e: React.MouseEvent, id: string) => void
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  item,
  onFavorite
}) => {
  const { user } = useAuth()
  const isFavorited = user && item.favorites?.includes(user.id)

  return (
    <Link
      to={`/article/${item._id}`}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition relative"
    >
      {onFavorite && (
        <button
          onClick={(e) => onFavorite(e, item._id)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition ${isFavorited ? "bg-rose-500/90 text-white" : "bg-white/70 text-slate-400 hover:bg-white hover:text-rose-500"}`}
        >
          <svg
            className="w-4 h-4"
            fill={isFavorited ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      {item.imageURL && (
        <div className="h-40 sm:h-48 overflow-hidden bg-slate-100">
          <img
            src={item.imageURL}
            alt={item.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {item.tags?.slice(0, 3).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 rounded-md font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 mb-2">
            {item.title}
          </h2>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {item.content}
          </p>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs text-slate-400">
          <span className="font-semibold text-slate-700">
            {item.author?.name || "Author"}
          </span>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  )
}
