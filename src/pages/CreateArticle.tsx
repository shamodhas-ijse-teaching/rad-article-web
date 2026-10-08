import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { createArticle, generateAIDescription } from "../service/article"

export const CreateArticle: React.FC = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>(["react", "frontend"])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [aiSummary, setAiSummary] = useState("")
  const [generatingAI, setGeneratingAI] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const readingTime = Math.ceil(wordCount / 200) || 1

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault()
      const cleanTag = tagInput.trim().replace(/^#|,/g, "").toLowerCase()
      if (cleanTag && !tags.includes(cleanTag)) setTags([...tags, cleanTag])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/"))
      return alert("Please select a valid image file")
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0])
  }

  const handleGenerateAI = async () => {
    if (!title.trim() || !content.trim())
      return alert("Title and Content required for AI Synthesis.")
    setGeneratingAI(true)
    try {
      const res = await generateAIDescription(title, content)
      setAiSummary(res.description)
    } catch {
      alert("AI Summary generation failed.")
    } finally {
      setGeneratingAI(false)
    }
  }

  const handleCopySummary = () => {
    if (!aiSummary) return
    navigator.clipboard.writeText(aiSummary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim())
      return alert("Title and Content are required")

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("tags", JSON.stringify(tags))
      if (imageFile) formData.append("image", imageFile)

      await createArticle(formData)
      navigate("/")
    } catch {
      alert("Article publication failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 px-2 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl"
          >
            ←
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none">
              Draft Story
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1">
              NexART Creator Studio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 sm:bg-transparent rounded-xl"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl disabled:opacity-50"
          >
            {submitting ? "Publishing..." : "Publish Story"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {imagePreview ? (
            <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-48 sm:h-80">
              <img
                src={imagePreview}
                alt="Cover"
                className="w-full h-full object-cover group-hover:opacity-85"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-xs font-semibold bg-white text-slate-900 rounded-xl"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null)
                    setImagePreview(null)
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-rose-600 text-white rounded-xl"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition ${isDragging ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700">
                Click or drag & drop cover image
              </p>
            </div>
          )}
        </div>

        <div>
          <textarea
            rows={1}
            placeholder="Article Title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              e.target.style.height = "auto"
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="w-full text-2xl sm:text-4xl font-extrabold text-slate-900 placeholder:text-slate-300 bg-transparent resize-none outline-none border-b border-transparent focus:border-slate-200 pb-2"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
          <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Categorization & Tags
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-semibold rounded-lg"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tag (Enter)..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 bg-transparent py-1 flex-1 min-w-30"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Body Content
          </label>
          <textarea
            rows={14}
            required
            placeholder="Write your technical analysis..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-sm sm:text-base text-slate-800 placeholder:text-slate-300 outline-none resize-y leading-relaxed font-normal"
          />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50/50 via-white to-blue-50/40 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                ✦
              </div>
              <div>
                <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
                  AI Executive Abstract
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {aiSummary && (
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              )}
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={generatingAI}
                className="flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg disabled:opacity-50"
              >
                {generatingAI ? "Synthesizing..." : "⚡ Generate Abstract"}
              </button>
            </div>
          </div>
          {generatingAI ? (
            <div className="space-y-2 py-3 animate-pulse">
              <div className="h-2 bg-indigo-100 rounded w-3/4"></div>
              <div className="h-2 bg-indigo-100 rounded w-full"></div>
            </div>
          ) : aiSummary ? (
            <div className="mt-2 p-3 sm:p-4 rounded-xl bg-white/80 border border-indigo-100/80">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif italic text-justify">
                "{aiSummary}"
              </p>
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-slate-400 italic py-2">
              Add Title and Content to generate an AI Abstract.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
