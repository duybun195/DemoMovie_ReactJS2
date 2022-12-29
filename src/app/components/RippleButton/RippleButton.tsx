// ** React Imports
import { useState, useEffect } from "react"

// ** Third Party Components
import { Button, ButtonProps, Spinner } from "reactstrap"
import classnames from "classnames"

// ** Styles
import "./ripple-button.scss"
import { Icon } from "react-feather"
import { useHistory } from "react-router"
export type RippleButtonProps = {
  loading?: boolean
  icon?: Icon
  className?: any
  children: any
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  [key: string]: any
  to?: string
} & ButtonProps
const ButtonRipple = ({ className, children, onClick, icon: Icon, loading, to, ...rest }: RippleButtonProps) => {
  // ** States
  const history = useHistory()
  const [mounted, setMounted] = useState(false)
  const [isRippling, setIsRippling] = useState(false)
  const [coords, setCoords] = useState({ x: -1, y: -1 })

  const renderIcon = () => {
    if (Icon)
      return (
        <>
          {loading ? <Spinner size="sm" /> : <Icon size={10} />}
          <span className="align-middle ml-25">{children}</span>
        </>
      )
    return children
  }
  // ** Toggle mounted on mount & unmount
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // ** Check for coords and set ripple
  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true)
        setTimeout(() => setIsRippling(false), 500)
      } else {
        setIsRippling(false)
      }
    }
  }, [coords])

  // ** Reset Coords on ripple end
  useEffect(() => {
    if (mounted) {
      if (!isRippling) setCoords({ x: -1, y: -1 })
    }
  }, [isRippling])

  return (
    <Button
      disabled={loading}
      className={classnames("waves-effect", {
        [className]: className,
      })}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const rect = (e.target as any).getBoundingClientRect()
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        if (to) {
          history.push(to)
        }
        if (onClick) {
          onClick(e)
        }
      }}
      {...rest}
    >
      {renderIcon()}
      {isRippling ? (
        <span
          className="waves-ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        ></span>
      ) : null}
    </Button>
  )
}

export default ButtonRipple
