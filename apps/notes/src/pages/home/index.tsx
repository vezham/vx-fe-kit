import { Outlet } from '@tanstack/react-router'

const Home = () => {
  return (
    <div className="flex">
      <div className="bg-secondary h-screen w-20">Menu</div>

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
