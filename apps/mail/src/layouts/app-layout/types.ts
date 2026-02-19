import { MenuItem } from '../../components/menu/types'

export type AppLayoutProps = {
  children?: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  menu?: MenuItem[]
}
