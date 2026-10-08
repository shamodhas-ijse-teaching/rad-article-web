import React from "react"
import { Button } from "./Button"

interface PaginationProps {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  setPage
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-3 pt-4">
      <Button
        variant="ghost"
        size="sm"
        disabled={page <= 1}
        onClick={() => setPage((p) => p - 1)}
        className="border border-slate-300"
      >
        Previous
      </Button>
      <span className="text-xs font-medium text-slate-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="ghost"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="border border-slate-300"
      >
        Next
      </Button>
    </div>
  )
}
