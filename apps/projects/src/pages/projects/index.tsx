import { Outlet } from '@tanstack/react-router'

const ProjectsLayout = () => {
  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { ProjectsLayout }
