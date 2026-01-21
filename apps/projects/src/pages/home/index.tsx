import React from 'react'

const Home = () => {
  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        <div className="w-full xl:mx-12 xl:max-w-5xl">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <h2 className="text-small text-default-500 mt-2">
                Manage your projects, track progress, collaborate with teams and
                setup your settings.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Home }
