// import { HeaderItem } from "../header/types"

// export type SidebarItem = {
//   icon:string
//   label: string
//   href?: string
//   count?: number
// }

// export type SidebarProps = {
//   header?: HeaderItem[]
//   sidebar?: SidebarItem[]
//   children?: React.ReactNode
// }

export interface SidebarItemProps {
  icon: string
  href: string
  label: string
  count?: number
  active?: boolean
  iconColor?: string
}

export interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}
