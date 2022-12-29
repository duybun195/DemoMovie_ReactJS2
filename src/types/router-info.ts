import { Component, ComponentType, ReactElement } from "react"
import { RouteComponentProps } from "react-router-dom"

type RouteType = "private" | "public" | "blank"

export type TRouteComponent =
  | ComponentType<RouteComponentProps<any>>
  | ComponentType<any>
  | any
  | Component
  | JSX.IntrinsicElements

export default interface RouteInfo {
  path: string
  component: TRouteComponent
  type?: RouteType
  exact?: boolean
  headerEmpty?: boolean
  title?: string
  metas?: ReactElement[]
  activeMenuId?: string
}
