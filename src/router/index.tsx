import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import type { ReactNode } from "react"
import Register from "../pages/Register"
import Login from "../pages/Login"
import { Home } from "../pages/Home"
import { ArticleDetail } from "../pages/ArticleDetail"
import { CreateArticle } from "../pages/CreateArticle"
import { MyArticles } from "../pages/MyArticles"
import { AdminDashboard } from "../pages/AdminDashboard"
import { MainLayout } from "../components/layout/MainLayout"

type RequireAuthTypes = { children: ReactNode; roles?: string[] }

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to={"/login"} replace />

  if (roles && !roles.some((role) => user?.roles.includes(role))) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p className="text-sm text-slate-600">
          You do not have permission to view this page.
        </p>
      </div>
    )
  }
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route
            path="/write"
            element={
              <RequireAuth roles={["WRITER", "ADMIN"]}>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/my-articles"
            element={
              <RequireAuth roles={["WRITER", "ADMIN"]}>
                <MyArticles />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth roles={["ADMIN"]}>
                <AdminDashboard />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
