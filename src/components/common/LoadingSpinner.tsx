import React from "react"

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
    </div>
  )
}
