import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMyArticles } from "../service/article"
import { PageHeader } from "../components/common/PageHeader"

export const MyArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getMyArticles()
      .then(setArticles)
      .catch(() => alert("Failed to fetch your articles"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="My Published Articles"
        description="Manage all stories you have written."
        actionLabel="+ Write New"
        actionLink="/write"
      />

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-full h-20 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
          <p className="text-slate-500 text-sm">
            You haven't published any articles yet.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
          {articles.map((item) => (
            <div
              key={item._id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
            >
              <div className="space-y-1">
                <Link
                  to={`/article/${item._id}`}
                  className="font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 line-clamp-1"
                >
                  {item.title}
                </Link>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-400">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{item.tags?.length || 0} tags</span>
                </div>
              </div>
              <Link
                to={`/article/${item._id}`}
                className="text-xs font-semibold text-blue-600 hover:underline self-start sm:self-auto"
              >
                View Story →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
