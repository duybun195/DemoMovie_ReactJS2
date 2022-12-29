// ** React Imports

import { Navigation } from "./navigation"

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveVerticalNavMenuItemComponent = item => {
  if (item.header) return "VerticalNavMenuSectionHeader"
  if (item.children) return "VerticalNavMenuGroup"
  return "VerticalNavMenuLink"
}

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveHorizontalNavMenuItemComponent = item => {
  if (item.children) return "HorizontalNavMenuGroup"
  return "HorizontalNavMenuLink"
}

/**
 * Check if nav-link is active
 * @param {Object} link nav-link object
 */
// export const isNavLinkActive = (link, currentURL, match) => {
//   // return currentURL === link || (URLParams && Object.keys(URLParams).length && currentURLFilter === item.navLink)
//   const getFirstObjProp = obj => obj[Object.keys(obj)[0]]
//   return (
//     currentURL === link ||
//     (match !== null && match !== undefined && match.url === `${link}/${getFirstObjProp(match.params)}`)
//   )
// }

export const isNavLinkActive = (
  link: string | undefined,
  currentURL: string,
  routerProps: any,
  childNavLinks: string[] | undefined,
): boolean => {
  return (
    currentURL === link ||
    (childNavLinks && childNavLinks.indexOf(currentURL) !== -1) ||
    (routerProps && routerProps.meta && routerProps.meta.navLink && routerProps.meta.navLink === link)
  )
}

/**
 * Check if nav group is
 * @param {Array} children Group children
 */
// export const isNavGroupActive = (children, currentURL, match) => {
//   return children.some(child => {
//     // If child have children => It's group => Go deeper(recursive)
//     if (child.children) {
//       return isNavGroupActive(child.children, currentURL, match)
//     }
//     // else it's link => Check for matched Route
//     return isNavLinkActive(child.navLink, currentURL, match)
//   })
// }
export const isNavGroupActive = (children: Navigation[], currentURL: string, routerProps: any): boolean => {
  return children.some(child => {
    // If child have children => It's group => Go deeper(recursive)
    if (child.children) {
      return isNavGroupActive(child.children, currentURL, routerProps)
    }
    // else it's link => Check for matched Route
    return isNavLinkActive(child.navLink, currentURL, routerProps, child.childNavLink)
  })
}

/**
 * Search for parent object
 * @param {Array} navigation Group children
 * @param {string} currentURL current URL
 */
// export const search = (navigation, currentURL, match) => {
//   let result
//   navigation.some(child => {
//     let children
//     // If child have children => It's group => Go deeper(recursive)
//     if (child.children && (children = search(child.children, currentURL, match))) {
//       return (result = {
//         id: child.id,
//         children
//       })
//     }

//     // else it's link => Check for matched Route
//     if (isNavLinkActive(child.navLink, currentURL, match)) {
//       return (result = {
//         id: child.id
//       })
//     }
//   })
//   return result
// }

export const search = (navigation: Navigation[], currentURL: string, routerProps: any): Navigation => {
  let result
  navigation.some(child => {
    let children
    // If child have children => It's group => Go deeper(recursive)
    if (child.children && (children = search(child.children, currentURL, routerProps))) {
      return (result = {
        id: child.id,
        navLink: child.navLink,
        children,
      })
    }
    // else it's link => Check for matched Route
    if (isNavLinkActive(child.navLink, currentURL, routerProps, child.childNavLink)) {
      return (result = {
        id: child.id,
        navLink: child.navLink,
      })
    }
    return null
  })
  return result
}
export const searchParentsNavLink = (listNav: Navigation[], currentURL: string): Navigation | null => {
  let result
  for (let child of listNav) {
    if (child.childNavLink && child.childNavLink.find(x => currentURL.indexOf(x) !== -1)) return child
    if (child.children && (result = searchParentsNavLink(child.children, currentURL))) return result
  }
  return null
}
/**
 * Loop through nested object
 * @param {object} obj nested object
 */
export const getAllParents = (obj, match) => {
  const res = [] as object[]
  const recurse = (obj: any, current) => {
    for (const key in obj) {
      const value = obj[key]
      if (value !== undefined) {
        if (value && typeof value === "object") {
          recurse(value, key)
        } else {
          if (key === match) {
            res.push(value)
          }
        }
      }
    }
  }
  recurse(obj, null)
  return res
}

export const canViewMenuGroup = item => {
  return true
  //const ability = useContext(AbilityContext)
  // ! This same logic is used in canViewHorizontalNavMenuGroup and canViewHorizontalNavMenuHeaderGroup. So make sure to update logic in them as well
  //const hasAnyVisibleChild = item.children && item.children.some(i => ability.can(i.action, i.resource))
  // ** If resource and action is defined in item => Return based on children visibility (Hide group if no child is visible)
  // ** Else check for ability using provided resource and action along with checking if has any visible child
  // if (!(item.action && item.resource)) {
  //   return true
  // }
  // return ability.can(item.action, item.resource) && hasAnyVisibleChild
}

export const canViewMenuItem = item => {
  return true
  // const ability = useContext(AbilityContext)
  // return ability.can(item.action, item.resource)
}
