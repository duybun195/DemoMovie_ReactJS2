import { Icon } from "react-feather"
import * as Icons from "react-feather"
export interface DynamicIconProps {
  icon?: Icon
  iconName?: string
  size: number
}
export const DynamicIcon = ({ icon: IconTag, iconName, size }: DynamicIconProps) => {
  if (IconTag) return <IconTag size={size} />
  if (iconName) {
    const IconTagByName = Icons[iconName] as Icon
    return <IconTagByName size={size} />
  }
  return <></>
}
