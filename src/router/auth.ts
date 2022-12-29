import RouteInfo from "types/router-info"
import { lazyLoad } from "utils/loadable"

export const AuthRoute: RouteInfo[] = [
  {
    path: "/login",
    exact: true,
    component: lazyLoad(
      () => import("../app/pages/Auth/Login"),
      module => module.Login,
    ),
    type: "public",
    title: "Login",
  },
]
