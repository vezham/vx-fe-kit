import { ReactNode } from 'react'

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      Welcome to Mail!...
      {children}
    </div>
  )
}

export default Page
