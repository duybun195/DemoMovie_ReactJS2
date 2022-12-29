import { Helmet } from "react-helmet-async"
import { Package } from "react-feather"
import { Card, CardBody, CardText, Col, Row } from "reactstrap"
import Avatar from "app/theme/components/avatar"
import "./dashboard.scss"
import { WarehouseInfoDashboard } from "./components/WarehouseInfoDashboard"
import decorationLeft from "../../../assets/images/elements/decore-left.png"
import decorationRight from "../../../assets/images/elements/decore-right.png"

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Tổng quan</title>
      </Helmet>

      <Row>
        <Col md="12">
          <Card className="card-congratulations">
            <CardBody className="text-center">
              <img className="congratulations-img-left" src={decorationLeft} alt="decor-left" />
              <img className="congratulations-img-right" src={decorationRight} alt="decor-right" />
              <Avatar icon={<Package size={28} />} className="shadow" color="primary" size="xl" />
              <div className="text-center">
                <h1 className="mb-1 text-white">Demo Movie</h1>
                <CardText className="m-auto w-85">Demo Xem Phim</CardText>
              </div>
            </CardBody>
          </Card>
          <WarehouseInfoDashboard />
        </Col>
      </Row>
    </>
  )
}
