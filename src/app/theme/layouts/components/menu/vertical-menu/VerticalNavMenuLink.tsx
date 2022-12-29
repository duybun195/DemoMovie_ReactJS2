// ** React Imports
import { useEffect, useMemo } from "react"
import { NavLink, useLocation, matchPath } from "react-router-dom"

// ** Third Party Components
import { Badge } from "reactstrap"
import classnames from "classnames"

// ** Vertical Menu Array Of Items

// ** Utils
import { search, getAllParents, searchParentsNavLink } from "../../../utils"
import { useGetNavigation } from "utils/hook/useGetNavigation"
import { DynamicIcon } from "app/components/DynamicIcon/DynamicIcon"

const VerticalNavMenuLink = ({
  item,
  groupActive,
  setGroupActive,
  activeItem,
  setActiveItem,
  groupOpen,
  setGroupOpen,
  toggleActiveGroup,
  parentItem,
  routerProps,
  currentActiveItem,
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = (item.externalLink ? "a" : NavLink) as any
  const navigation = useGetNavigation()
  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname

  // ** To match path
  const match = matchPath(currentURL, {
    path: `${item.navLink}/:param`,
    exact: true,
    strict: false,
  })

  // ** Search for current item parents
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchParents = (navigation, currentURL) => {
    const parents = search(navigation, currentURL, routerProps) // Search for parent object
    const allParents = getAllParents(parents, "id") // Parents Object to Parents Array
    return allParents
  }

  // ** URL Vars
  const resetActiveGroup = navLink => {
    const parents = search(navigation, navLink, match)
    toggleActiveGroup(item.id, parents)
  }

  // ** Reset Active & Open Group Arrays
  const resetActiveAndOpenGroups = () => {
    setGroupActive([])
    setGroupOpen([])
  }
  const activeUrl = useMemo(() => searchParentsNavLink(navigation, currentURL), [navigation, currentURL])
  // ** Checks url & updates active item
  useEffect(() => {
    setActiveItem((activeUrl && activeUrl.navLink) || currentURL)
    const arr = searchParents(navigation, currentURL)
    setGroupActive([...arr])
  }, [location])

  return (
    <li
      className={classnames({
        "nav-item": !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem,
      })}
    >
      <LinkTag
        className="d-flex align-items-center"
        target={item.newTab ? "_blank" : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || "/",
            }
          : {
              to: item.navLink || "/",
              isActive: (match, location) => {
                if (!match) {
                  return false
                }

                if (match.url && match.url !== "" && match.url === item.navLink) {
                  currentActiveItem = item.navLink
                }
              },
            })}
        /*eslint-enable */
        onClick={e => {
          if (!item.navLink.length) {
            e.preventDefault()
          }
          parentItem ? resetActiveGroup(item.navLink) : resetActiveAndOpenGroups()
        }}
      >
        <DynamicIcon size={14} icon={item.icon} iconName={item.iconName} />
        <span className="menu-item text-truncate">{item.title}</span>
        {item.badge && item.badgeText ? (
          <Badge className="baggle ml-auto mr-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  )
}

export default VerticalNavMenuLink
