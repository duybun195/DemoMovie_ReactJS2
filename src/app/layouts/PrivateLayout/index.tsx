import * as React from "react"
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom"
import { TRouteComponent } from "types/router-info"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useCurrentUser } from "utils/hook/useAuth"
import LayoutWrapper from "app/theme/layouts/components/layout-wrapper/LayoutWrapper"
import { useRouterTransition } from "utils/hook/useRouterTransition"
import VerticalLayout from "app/theme/layouts/VerticalLayout"
import { useAppDispatch } from "utils/hook/appHook"
// import { logout, refreshUserInfo, useGetUserInfoQuery } from "services/authService"
// import { UserInfo } from "types/auth"
import HorizontalLayout from "app/theme/layouts/HorizontalLayout"
import { useLayout } from "utils/hook/useLayout"
import { PageLoading } from "app/components/PageLoading/PageLoading"
import ErrorBoundary from "app/components/ErrorBoundary/ErrorBoundary"
import { ProcessDownloadFile } from "app/components/ProcessDownloadFile/ProcessDownloadFile"
import { useGetNavigation } from "utils/hook/useGetNavigation"
import { NotificationHelper } from "utils/notificationHelper"
import { NewVersionUpdateAlert } from "app/components/NewVersionUpdateAlert/NewVersionUpdateAlert"

interface Props extends RouteProps {
  component: TRouteComponent
  headerEmpty?: boolean
  title?: string
  wrapperclassName?: any
}
function PrivateLayout({ component: Component, headerEmpty, title, ...rest }: Props): React.ReactElement {
  const location = useLocation()
  const currentUser = useCurrentUser()
  const [transition, setTransition] = useRouterTransition()
  const [layout] = useLayout()

  // ** Default Layout
  const DefaultLayout = layout === "horizontal" ? "HorizontalLayout" : "VerticalLayout"

  const dispatch = useAppDispatch()
  // const { data, isSuccess, isError } = useGetUserInfoQuery("", {})
  const navigation = useGetNavigation()
  const checkPermissionPage = () => {
    return (
      navigation.length > 0 &&
      navigation.some(
        x =>
          x.navLink &&
          (location.pathname.indexOf(x.navLink) !== -1 ||
            x.childNavLink?.some(c => location.pathname.indexOf(c) !== -1)),
      )
    )
  }
  // useEffect(() => {
  //   if (data || isError) {
  //     if (isSuccess && data?.success && !isError && !data.result.changePermission) {
  //       dispatch(refreshUserInfo(data.result as UserInfo))
  //     } else {
  //       dispatch(logout())
  //     }
  //   }
  // }, [isSuccess, data, isError])
  useEffect(() => {
    NotificationHelper.instance.askNotiPermission()
    if (currentUser) {
    }
  }, [])
  if (!currentUser) {
    return <Redirect to={{ pathname: "/login", state: { from: location.pathname } }}></Redirect>
  }
  if (!checkPermissionPage())
    return <Redirect to={{ pathname: "/access-denied", state: { from: location.pathname } }}></Redirect>
  return (
    <Route
      {...rest}
      render={props => {
        const Child = () => (
          <>
            <Helmet defaultTitle="DEMO DUYBUN" htmlAttributes={{ lang: "vi" }}>
              <title>{title}</title>
            </Helmet>
            <Component {...props} />
          </>
        )
        const LayoutTag = DefaultLayout === "HorizontalLayout" ? HorizontalLayout : VerticalLayout
        return (
          <LayoutTag>
            <ErrorBoundary>
              <LayoutWrapper
                {...props}
                layout={DefaultLayout}
                transition={transition}
                setTransition={setTransition}
                children={Child()}
              ></LayoutWrapper>
              <PageLoading />
              <ProcessDownloadFile />
              <NewVersionUpdateAlert />
            </ErrorBoundary>
          </LayoutTag>
        )
      }}
    />
  )
}

export default PrivateLayout
