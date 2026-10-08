import React from "react"
import { Link } from "react-router-dom"
import { Button } from "./Button"

interface PageHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  actionLink?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionLabel,
  actionLink
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="w-full sm:w-auto">
          <Button className="w-full">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
