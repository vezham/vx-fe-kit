import React from 'react'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-content2 flex h-screen w-64 items-center justify-center">
        Sidebar
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default SidebarLayout
