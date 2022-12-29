// ** React Imports
import { forwardRef, LegacyRef, ReactElement } from "react"

// ** Third Party Components
import { Badge } from "reactstrap"
import classnames from "classnames"
const listColor = [
  "primary",
  "secondary",
  "success",
  "danger",
  "info",
  "warning",
  "dark",
  "light-primary",
  "light-secondary",
  "light-success",
  "light-danger",
  "light-info",
  "light-warning",
  "light-dark",
]
type Color = typeof listColor[number]
export type Props = {
  imgClassName?: string | any
  className?: string | any
  src?: string
  tag?: string | (() => string)
  badgeUp?: boolean
  content?: string
  icon?: ReactElement
  contentStyles?: object
  badgeText?: string
  imgHeight?: string | number
  imgWidth?: string | number
  size?: "sm" | "lg" | "xl"
  status?: "online" | "offline" | "away" | "busy"
  badgeColor?: Color
  color?: Color
  img?: string | boolean | null
}

const Avatar = forwardRef((props: Props, ref: LegacyRef<HTMLDivElement>): any => {
  // ** Props
  const {
    color,
    className,
    imgClassName,
    size,
    badgeUp,
    content,
    icon,
    badgeColor,
    badgeText,
    img,
    imgHeight,
    imgWidth,
    status,
    tag: Tag,
    contentStyles,
    ...rest
  } = props

  // ** Function to extract initials from content
  const getInitials = str => {
    const results = [] as Array<any>
    const wordArray = str?.split(" ") || []
    wordArray.forEach(e => {
      results.push(e[0])
    })
    return results.join("")
  }

  return (
    <div
      className={classnames("avatar", {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames("avatar-content", {
            "position-relative": badgeUp,
          })}
          style={contentStyles}
        >
          {getInitials(content)}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge color={badgeColor ? badgeColor : "primary"} className="badge-sm badge-up" pill>
              {badgeText ? badgeText : "0"}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName,
          })}
          src={img as string}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </div>
  )
})

export default Avatar
