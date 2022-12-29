import { Button, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import errorImg from "../../../assets/images/pages/error.svg"

import "../../../assets/template/pages/page-misc.scss"
import { ReactSelect } from "app/components/ReactSelect/ReactSelect"

const ErrorPage = () => {
  const listOption = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ]
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Đã có lỗi xảy ra 🕵🏻‍♀️</h2>
          <p className="mb-2">Xin lỗi! 😖 Địa chỉ URL bạn yêu cầu không được tìm thấy. Vui lòng quay lại trang chủ!</p>
          <Button tag={Link} to="/" color="primary" className="btn-sm-block mb-2">
            Trang Chủ
          </Button>
          <img className="img-fluid" src={errorImg} alt="Error page" />
        </div>
      </div>
      <div className="d-flex">
        <Row>
          <Col md="12">
            <ReactSelect options={listOption} />
          </Col>
          <Col md="12">
            <ReactSelect options={listOption} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default ErrorPage
