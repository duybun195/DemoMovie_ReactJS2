/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Switch, BrowserRouter, Route } from "react-router-dom"
import { routes } from "router"

import IRoute from "types/router-info"
import PrivateLayout from "./layouts/PrivateLayout"
import PublicLayout from "./layouts/PublicLayout"
import NotFound from "./pages/Common/NotFound"

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((item: IRoute, index: number) => {
          if (item.type === "blank")
            return (
              <Route key={index} path={item.path}>
                {item.component}
              </Route>
            )
          if (item.type === "public" || item.type === "private") {
            const Layout = item.type === "public" ? PublicLayout : PrivateLayout
            return (
              <Layout
                key={index}
                path={item.path}
                component={item.component}
                headerEmpty={item.headerEmpty}
                exact={item.exact}
                title={item.title}
              />
            )
          }
          return null
        })}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
