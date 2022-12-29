import RouteInfo from "types/router-info"
import { AuthRoute } from "./auth"
import { CommonRoute } from "./common"
import { HomeRoute } from "./home"

const routes: RouteInfo[] = [...AuthRoute, ...HomeRoute, ...CommonRoute]
export { routes }
