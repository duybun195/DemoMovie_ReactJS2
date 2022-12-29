// ** React Imports
import { Fragment, useEffect } from "react"

// ** Third Party Components
import classnames from "classnames"
import { layoutActions } from "../../../../../services/layoutService"

// ** Store & Actions

// ** Styles
import "animate.css/animate.css"
import { useAppDispatch, useAppSelector } from "utils/hook/appHook"
import React from "react"
import { ReactElement } from "hoist-non-react-statics/node_modules/@types/react"
type Props = {
  layout?: string
  children: ReactElement
  appLayout?: ReactElement
  wrapperClass?: string | any
  transition?: string | ((value: any) => void)
  setTransition?: string | ((value: any) => void)
  routeMeta?: any
}
const LayoutWrapper = ({ layout, children, appLayout, wrapperClass, transition, routeMeta }: Props) => {
  const { handleContentWidth, handleMenuCollapsed, handleMenuHidden } = layoutActions
  // ** Props

  // ** Store Vars
  const dispatch = useAppDispatch()
  const store = useAppSelector(state => state.layout)
  const contentWidth = store.contentWidth

  //** Vars
  const Tag = layout === "HorizontalLayout" && !appLayout ? "div" : Fragment
  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth("full"))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(!routeMeta.menuHidden))
      }
    }
  }

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
  }, [])

  return (
    <div
      className={classnames("app-content content overflow-hidden", {
        [wrapperClass]: wrapperClass,
        //"show-overlay": navbarStore.query.length,
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          "content-wrapper": !appLayout,
          "content-area-wrapper": appLayout,
          "container p-0": contentWidth === "boxed",
          [`animate__animated animate__${transition}`]: transition !== "none" && transition?.length,
        })}
      >
        <Tag
          /*eslint-disable */
          {...(layout === "HorizontalLayout" && !appLayout
            ? { className: classnames({ "content-body": !appLayout }) }
            : {})}
          /*eslint-enable */
        >
          {children}
        </Tag>
      </div>
    </div>
  )
}

export default LayoutWrapper
