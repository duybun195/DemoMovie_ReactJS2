// ** React Imports
import { Link } from "react-router-dom"

// ** Third Party Components
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
export type BreadCrumbProps = {
  breadCrumbTitle: string
  breadCrumbParent?: string
  breadCrumbParent2?: string
  breadCrumbParent3?: string
  linkParent?: string
  linkParent2?: string
  linkParent3?: string
  breadCrumbActive?: string
}
const BreadCrumbs = ({
  breadCrumbTitle,
  breadCrumbParent,
  breadCrumbParent2,
  breadCrumbParent3,
  linkParent,
  linkParent2,
  linkParent3,
  breadCrumbActive,
}: BreadCrumbProps) => {
  // ** Props

  return (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-1">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? <h2 className="content-header-title float-left mb-0">{breadCrumbTitle}</h2> : ""}
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/">Trang chủ</Link>
                </BreadcrumbItem>
                {breadCrumbParent && (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {linkParent ? <Link to={linkParent}>{breadCrumbParent}</Link> : breadCrumbParent}
                  </BreadcrumbItem>
                )}
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {linkParent2 ? <Link to={linkParent2}>{breadCrumbParent2}</Link> : breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {linkParent3 ? <Link to={linkParent3}>{breadCrumbParent3}</Link> : breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                <BreadcrumbItem tag="li" active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs
