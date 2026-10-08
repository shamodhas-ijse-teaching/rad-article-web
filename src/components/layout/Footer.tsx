import React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
      <p>
        © 2026 NexArt Publishing Platform. Powered by Supabase Storage & Gemini
        AI.
      </p>
      <p className="mt-1.5">
        Developed by{" "}
        <a
          href="https://shamodha.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          Shamodha Sahan
        </a>
      </p>
    </footer>
  )
}
