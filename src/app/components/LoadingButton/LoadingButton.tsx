import React from "react"
import { Button, ButtonProps, Spinner } from "reactstrap"
type Props = {
  children: any
  loading: boolean
  [x: string]: any
}
const LoadingButton = ({ children, loading, ...rest }: Props & ButtonProps) => {
  if (loading) {
    return (
      <Button disabled={true} {...rest}>
        <Spinner className="mr-2" size="sm" />
        {children}
      </Button>
    )
  }
  return <Button {...rest}>{children}</Button>
}
export default LoadingButton
