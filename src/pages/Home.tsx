import React, { useEffect, useState } from "react"
import { getAllArticles, toggleArticleFavorite } from "../service/article"
import { useAuth } from "../hooks/useAuth"
import { ArticleCard } from "../components/article/ArticleCard"

export const Home: React.FC = () => {
  const { user } = useAuth()
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    fetchArticles()
  }, [page])

  const fetchArticles = () => {
    setLoading(true)
    getAllArticles(page, 6)
      .then((res) => {
        setArticles(res.data)
        setTotalPages(res.meta.totalPages)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const handleFavorite = async (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (!user) return alert("Please login to favorite articles")

    try {
      const updatedArticle = await toggleArticleFavorite(id)
      setArticles(articles.map((a) => (a._id === id ? updatedArticle : a)))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-sm">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Explore Tech Publications
        </h1>
        <p className="text-blue-100 text-xs sm:text-base max-w-xl">
          Discover modern software engineering, AI, and DevOps articles.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-slate-200 rounded-2xl h-80 w-full"></div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
          <p className="text-slate-500">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {articles.map((item) => (
            <ArticleCard
              key={item._id}
              item={item}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs font-medium text-slate-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
