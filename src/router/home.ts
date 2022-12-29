import RouteInfo from "types/router-info"
import { lazyLoad } from "utils/loadable"

export const HomeRoute: RouteInfo[] = [
  {
    path: "/",
    exact: true,
    component: lazyLoad(
      () => import("../app/pages/HomePage/HomePage"),
      module => module.HomePage,
    ),
    type: "public",
    title: "Trang chủ",
  },
]
