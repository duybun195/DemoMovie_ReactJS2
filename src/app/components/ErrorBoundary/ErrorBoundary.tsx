import React from "react"
import { LoaderHelper } from "utils/loaderHelper"
interface ErrorBoundaryState {
  hasError: boolean
}
export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      LoaderHelper.showHide(false)
      return <h5>Đã có lỗi xảy ra </h5>
    }
    return this.props.children
  }
}
