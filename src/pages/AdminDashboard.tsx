import React, { useEffect, useState } from "react"
import { getAdminArticles, toggleArticleVisibility } from "../service/article"
import { PageHeader } from "../components/common/PageHeader"
import { Pagination } from "../components/common/Pagination"
import { LoadingSpinner } from "../components/common/LoadingSpinner"

export const AdminDashboard: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchArticles()
  }, [page])

  const fetchArticles = () => {
    setLoading(true)
    getAdminArticles(page, 15)
      .then((res) => {
        setArticles(res.data)
        setTotalPages(res.meta.totalPages)
      })
      .catch(() => alert("Failed to fetch admin articles"))
      .finally(() => setLoading(false))
  }

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleArticleVisibility(id)
      setArticles(articles.map((a) => (a._id === id ? updated : a)))
    } catch (err) {
      alert("Failed to update visibility")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Administration"
        description="Manage global article visibility and compliance."
      />

      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white border border-slate-200 rounded-2xl">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.author?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-md ${item.isVisible ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"}`}
                    >
                      {item.isVisible ? "VISIBLE" : "HIDDEN"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggle(item._id)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      {item.isVisible ? "Hide" : "Show"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}
