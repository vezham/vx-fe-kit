import { Outlet } from '@tanstack/react-router'
import React from 'react'

interface BoardDashboardProps {
  children?: React.ReactNode
}

const BoardDashboard = ({ children }: BoardDashboardProps) => {
  return (
    <div className="flex">
      <div className="bg-secondary h-screen w-64">Sidebar</div>
      <div className="flex-1 p-4">{children || <Outlet />}</div>
    </div>
  )
}

export { BoardDashboard }
