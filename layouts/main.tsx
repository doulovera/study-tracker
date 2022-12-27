import React from 'react'
import { Header } from '../components/header'

export default function MainLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen min-w-[280px] bg-slate-800">
      <div className="flex flex-col flex-1 w-full h-full">
        <Header />
        {children}
      </div>
    </div>
  )
}
