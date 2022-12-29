import { ReactElement } from "hoist-non-react-statics/node_modules/@types/react"
import { Home } from "react-feather"
export type Navigation = {
  id: string
  title: string
  icon?: ReactElement
  iconName?: string
  navLink?: string
  children?: Navigation[]
  childNavLink?: string[]
}
const navigation2: Navigation[] = [
  {
    id: "dashboard",
    title: "Tổng quan",
    icon: <Home size={20} />,
    navLink: "/",
  },
]
export default navigation2
