// ** React Imports
import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

// ** Horizontal menu items array

// ** Third Party Components
import classnames from "classnames"

// ** Utils
import { search, getAllParents } from "../../../utils"
import { useGetNavigation } from "utils/hook/useGetNavigation"
import { DynamicIcon } from "app/components/DynamicIcon/DynamicIcon"

const HorizontalNavMenuLink = ({
  item,
  setOpenDropdown,
  setGroupActive,
  activeItem,
  setActiveItem,
  routerProps,
  currentActiveItem,
  isChild,
}) => {
  const navigation = useGetNavigation()
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = (item.externalLink ? "a" : NavLink) as any

  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname

  // ** Get parents of current items
  const searchParents = (navigation, currentURL) => {
    const parents = search(navigation, currentURL, routerProps) // Search for parent object
    const allParents = getAllParents(parents, "id") // Parents Object to Parents Array
    allParents.pop()
    return allParents
  }

  // ** Remove all items from OpenDropdown array
  const resetOpenDropdowns = () => setOpenDropdown([])

  // ** On mount update active group array
  useEffect(() => {
    setActiveItem(currentURL)
    const arr = searchParents(navigation, currentURL)
    setGroupActive([...arr])
  }, [location])

  return (
    <li
      className={classnames("nav-item", {
        active: item.navLink === activeItem,
        disabled: item.disabled,
      })}
      onClick={resetOpenDropdowns}
    >
      <LinkTag
        className={classnames("d-flex align-items-center", {
          "dropdown-item": isChild,
          "nav-link": !isChild,
        })}
        tag={LinkTag}
        target={item.newTab ? "_blank" : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || "/",
            }
          : {
              to: item.navLink || "/",
              isActive: match => {
                if (!match) {
                  return false
                }

                if (match.url && match.url !== "" && match.url === item.navLink) {
                  currentActiveItem = item.navLink
                }
              },
            })}
        /*eslint-enable */
      >
        <DynamicIcon size={14} icon={item.icon} iconName={item.iconName} />
        <span>{item.title}</span>
      </LinkTag>
    </li>
  )
}

export default HorizontalNavMenuLink
