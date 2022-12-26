import React from 'react'

export function Card ({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 h-full w-full p-4 bg-slate-700 rounded-lg">
      <h2 className="text-xl pb-2 border-b-2 border-gray-500">
        {title}
      </h2>
      <div>
        {children}
      </div>
    </div>
  )
}
