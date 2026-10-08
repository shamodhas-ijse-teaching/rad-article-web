import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const Header: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("REFRESH_TOKEN")
    window.location.href = "/login"
  }

  const activeLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}`

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span
            onClick={() => navigate("/")}
            className="text-2xl font-black tracking-tight text-blue-600 cursor-pointer"
          >
            Nex<span className="text-slate-900">Art</span>
          </span>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={activeLinkStyle}>
              Feed
            </NavLink>
            <NavLink to="/my-articles" className={activeLinkStyle}>
              My Articles
            </NavLink>
            {user?.roles?.includes("ADMIN") && (
              <NavLink to="/admin" className={activeLinkStyle}>
                Dashboard
              </NavLink>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/write"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
          >
            Write
          </NavLink>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold leading-none">
                {user?.name || "Author"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>

        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-lg">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-slate-700"
          >
            Feed
          </NavLink>
          <NavLink
            to="/my-articles"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-slate-700"
          >
            My Articles
          </NavLink>
          {user?.roles?.includes("ADMIN") && (
            <NavLink
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium text-slate-700"
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/write"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-medium text-blue-600"
          >
            Write New Article
          </NavLink>
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold">{user?.name || "Author"}</span>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-rose-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
