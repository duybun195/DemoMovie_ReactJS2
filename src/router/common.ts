import RouteInfo from "types/router-info"
import { lazyLoad } from "utils/loadable"

export const CommonRoute: RouteInfo[] = [
  {
    path: "/not-found",
    exact: true,
    component: lazyLoad(
      () => import("../app/pages/Common/NotFound"),
      module => module.default,
    ),
    type: "public",
    title: "Không tìm thấy trang",
  },
  {
    path: "/error",
    exact: true,
    component: lazyLoad(
      () => import("../app/pages/Common/Error"),
      module => module.default,
    ),
    type: "public",
    title: "Lỗi",
  },
  {
    path: "/access-denied",
    exact: true,
    component: lazyLoad(
      () => import("../app/pages/Common/AccessDenied"),
      module => module.default,
    ),
    type: "public",
    title: "Lỗi",
  },
]
