import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticleById } from "../service/article"

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (id) {
      getArticleById(id)
        .then(setArticle)
        .catch(() => alert("Failed to load article"))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
        <div className="w-1/4 h-4 bg-slate-200 rounded"></div>
        <div className="w-full h-12 bg-slate-200 rounded-lg"></div>
        <div className="w-full h-64 bg-slate-200 rounded-2xl"></div>
        <div className="space-y-3">
          <div className="w-full h-4 bg-slate-200 rounded"></div>
          <div className="w-5/6 h-4 bg-slate-200 rounded"></div>
          <div className="w-4/6 h-4 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Article Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 underline"
        >
          Back to feed
        </button>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 sm:p-10 shadow-sm">
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-slate-500 hover:text-slate-800 mb-6 flex items-center gap-1 font-medium"
      >
        ← Back
      </button>

      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags?.map((tag: string, i: number) => (
          <span
            key={i}
            className="px-2.5 py-0.5 text-[10px] sm:text-xs bg-blue-50 text-blue-600 font-semibold rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 text-xs sm:text-sm text-slate-500">
        <span className="font-semibold text-slate-800">
          {article.author?.name || "Author"}
        </span>
        <span>•</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>

      {article.imageURL && (
        <div className="my-6 sm:my-8 rounded-xl overflow-hidden border border-slate-200">
          <img
            src={article.imageURL}
            alt={article.title}
            className="w-full h-48 sm:h-80 object-cover"
          />
        </div>
      )}

      <div className="prose prose-sm sm:prose-base prose-slate max-w-none text-slate-800 leading-relaxed whitespace-pre-line">
        {article.content}
      </div>
    </article>
  )
}
