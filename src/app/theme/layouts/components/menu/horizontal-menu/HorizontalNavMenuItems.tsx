// ** React Imports

// ** Ability Context

// ** Menu Components Imports
import HorizontalNavMenuLink from "./HorizontalNavMenuLink"
import HorizontalNavMenuGroup from "./HorizontalNavMenuGroup"
import {
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem,
} from "../../../utils"

const HorizontalNavMenuItems = props => {
  // ** Context
  //const ability = useContext(AbilityContext)

  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  }

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children && canViewMenuGroup(item)) {
      return <TagName item={item} index={index} key={item.id} {...props} />
    }
    if (canViewMenuItem(item)) return <TagName item={item} index={index} key={item.id} {...props} />
    return null
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
