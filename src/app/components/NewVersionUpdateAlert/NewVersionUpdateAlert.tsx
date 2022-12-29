import { useEffect, useState } from "react"
import { Info } from "react-feather"
import { Alert } from "reactstrap"
import { ServiceWorkerHelper } from "utils/serviceWorkerHelper"

export const NewVersionUpdateAlert = () => {
  const [isShow, setIsShow] = useState(() => {
    return ServiceWorkerHelper.intance.updateFound
  })
  useEffect(() => {
    ServiceWorkerHelper.intance.onUpdateFound = () => {
      console.log("New version")
      setIsShow(true)
    }
  }, [])
  if (isShow) {
    return (
      <Alert color="danger">
        <div className="alert-body text-center">
          <span>
            <Info /> Hệ thống có bản cập nhật mới vui lòng bấm
            <a className="text-primary h4 mx-1" onClick={() => window.location.reload()}>
              ĐÂY
            </a>
            để tải lại trang
          </span>
        </div>
      </Alert>
    )
  }
  return <></>
}
