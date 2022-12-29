import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import errorImg from "../../../assets/images/pages/error.svg"

import "../../../assets/template/pages/page-misc.scss"

const NotFound = () => {
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Không Tìm Thấy Trang 🕵🏻‍♀️</h2>
          <p className="mb-2">Xin lỗi! 😖 Địa chỉ URL bạn yêu cầu không được tìm thấy. Vui lòng quay lại trang chủ!</p>
          <Button tag={Link} to="/" color="primary" className="btn-sm-block mb-2">
            Trang Chủ
          </Button>
          <img className="img-fluid" src={errorImg} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default NotFound
