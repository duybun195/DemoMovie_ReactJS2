import classnames from "classnames"
import { Heart, Eye } from "react-feather"
import { Link } from "react-router-dom"
import { Card, Button, CardText, Row, Col, CardBody } from "reactstrap"

import productImage1 from "../../../image/1.png"
import { Fragment, useEffect, useState } from "react"
import { useAppDispatch } from "utils/hook/appHook"
import { getMovies } from "services/movieService"
import { MovieResponse } from "types/movie"
export const WarehouseInfoDashboard = () => {
  const handleWishlistClick = (id, name) => {}
  const handleCartBtn = (id, name) => {}

  const dispatch = useAppDispatch()
  const [listMovieData, setListMovieData] = useState<MovieResponse[]>()

  useEffect(() => {
    const param: MovieResponse[] = []
    const result = dispatch(getMovies(param))
    console.log(result)
    setListMovieData(result)
  }, [])

  const data = [
    {
      image: productImage1,
      title: "Phim 1",
      content: "Nội dung phim 1",
    },
    {
      image: productImage1,
      title: "Phim 2",
      content: "Nội dung phim 2",
    },
    {
      image: productImage1,
      title: "Phim 3",
      content: "Nội dung phim 3",
    },
    {
      image: productImage1,
      title: "Phim 4",
      content: "Nội dung phim 4",
    },
    {
      image: productImage1,
      title: "Phim 5",
      content: "Nội dung phim 5",
    },
  ]

  console.log(listMovieData)

  return (
    <div className="ecommerce-application">
      <div className="content-detached content-right">
        <div className="content-body">
          <Fragment>
            <div
              className={classnames({
                "grid-view": true,
              })}
            >
              <Row>
                {data.map(item => (
                  <Col xs="12" sm="4" lg="3">
                    <Card className="ecommerce-card" key={1}>
                      <div className="item-img text-center mx-auto">
                        <Link to={"#"}>
                          <img className="img-fluid card-img-top" src={item.image} alt="123" />
                        </Link>
                      </div>
                      <CardBody>
                        <div className="item-wrapper">
                          <div className="item-rating">
                            <ul className="unstyled-list list-inline">
                              <li key={1} className="ratings-list-item mr-25"></li>
                            </ul>
                          </div>
                          <div className="item-cost">
                            <h6 className="item-price">{item.title}</h6>
                          </div>
                        </div>
                        <h6 className="item-name">
                          <CardText tag="span" className="item-company">
                            {item.content}
                          </CardText>
                        </h6>
                        <CardText className="item-description">123</CardText>
                      </CardBody>
                      <div className="item-options text-center">
                        <div className="d-flex justify-content-around p-2">
                          <Button className="btn-wishlist" color="light" onClick={() => handleWishlistClick(1, 1)}>
                            <Heart
                              className={classnames("mr-50", {
                                "text-danger": true,
                              })}
                              size={14}
                            />
                            <span>Like</span>
                          </Button>
                          <Button color="primary" className="btn-cart move-cart" onClick={() => handleCartBtn(1, 1)}>
                            <Eye className="mr-50" size={14} />
                            <span>Xem Phim</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  )
}
