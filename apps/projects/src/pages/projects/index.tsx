import { Outlet } from '@tanstack/react-router'

import { Button, useDisclosure } from '@vezham/react/v2'

import { AddProjectModal } from './AddProjectModal'

const ProjectsLayout = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        <div className="w-full xl:mx-12 xl:max-w-5xl">
          <div className="flex justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Projects & Tasks</h1>
              <p className="text-default-500 mt-2">
                Manage your projects and tasks
              </p>
            </div>

            <Button color="primary" onPress={onOpen}>
              Add Project
            </Button>
          </div>

          <Outlet />
        </div>
      </div>

      <AddProjectModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}

export { ProjectsLayout }
