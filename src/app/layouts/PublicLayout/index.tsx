/**
 *
 * PublicLayout
 *
 */
import BlankLayout from "app/theme/layouts/BlankLayout"
import React, { ReactElement, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { Route, RouteProps } from "react-router-dom"
import { TRouteComponent } from "types/router-info"

interface Props extends RouteProps {
  component: TRouteComponent
  headerEmpty?: boolean
  title?: string
  activeMenuId?: string
}

function PublicLayout({ component: Component, headerEmpty, activeMenuId, title, ...rest }: Props): ReactElement {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <BlankLayout>
            <Suspense fallback={null}>
              <Helmet defaultTitle="Aleda" htmlAttributes={{ lang: "vi" }}>
                <title>{title}</title>
              </Helmet>
              <Component {...props} />
            </Suspense>
          </BlankLayout>
        )
      }}
    />
  )
}

export default PublicLayout
