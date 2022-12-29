import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import errorImg from "../../../assets/images/pages/error.svg"
import { Helmet } from "react-helmet-async"
import "../../../assets/template/pages/page-misc.scss"

const AccessDenied = () => {
  return (
    <>
      <Helmet>
        <title>Không có quyền truy cập</title>
      </Helmet>
      <div className="misc-wrapper">
        <div className="misc-inner p-2 p-sm-3">
          <div className="w-100 text-center">
            <h2 className="mb-1">Bạn không có quyền truy cập</h2>
            <p className="mb-2">
              Xin lỗi! 😖 Địa chỉ URL bạn yêu cầu bạn ko có quyền truy cập. Vui lòng quay lại trang chủ!
            </p>
            <Button tag={Link} to="/" color="primary" className="btn-sm-block mb-2">
              Trang Chủ
            </Button>
            <Button tag={Link} to="/login" color="warning" className="btn-sm-block mb-2 ml-2">
              Đăng nhập
            </Button>
            <img className="img-fluid" src={errorImg} alt="Error page" />
          </div>
        </div>
      </div>
    </>
  )
}
export default AccessDenied
