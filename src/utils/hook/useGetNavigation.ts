import { Navigation } from "app/theme/layouts/navigation"
import { useMemo } from "react"
import { useCurrentUser } from "utils/hook/useAuth"
//import Navigation from "../../app/theme/layouts/navigation"

export const useGetNavigation = () => {
  const currentUser = useCurrentUser()
  const navigation = useMemo(() => {
    if (!currentUser) return []
    const relativeLink = {
      "danh-sach-xn-kho": ["tao-moi-xn-kho", "chinh-sua-xn-kho/"],
      "yeu-cau-nhap-kho": ["yeu-cau-nhap-kho/"],
      "danh-sach-chuyen-kho": ["tao-moi-chuyen-kho", "chinh-sua-chuyen-kho"],
    }
    if (!currentUser.permissionModules) return []
    return currentUser.permissionModules.map(
      x =>
        ({
          iconName: x.icon,
          id: x.router,
          title: x.moduleName,
          navLink: x.router,
          children:
            x.router === "/"
              ? []
              : x.permissionPages.map(
                  c =>
                    ({
                      iconName: c.icon,
                      id: c.router,
                      title: c.pageName,
                      navLink: `/${x.router}/${c.router}`,
                      childNavLink: relativeLink[c.router] ? relativeLink[c.router] : [],
                    } as Navigation),
                ),
        } as Navigation),
    )
  }, [currentUser])
  return navigation
}
