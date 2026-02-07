import React from 'react'

type HomeProps = {
  children?: React.ReactNode
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div className="flex gap-2">
      <div className="bg-default grid h-screen w-20 items-center justify-center">
        <div>Home</div>
        <div>Settings</div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Home
