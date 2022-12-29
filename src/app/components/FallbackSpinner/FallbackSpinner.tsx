// ** Logo
import { Spinner } from "reactstrap"

const FallBackSpinner = () => {
  return (
    <div className="d-flex justify-content-center my-1 vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img className="fallback-logo mb-2" width={200} alt="logo" />
        <Spinner color="success" />
      </div>
    </div>
  )
}

export default FallBackSpinner
