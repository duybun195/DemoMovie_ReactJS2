import React from "react"
import ReactPaginate from "react-paginate"
type Props = {
  loading?: boolean
  currentPageIndex: number
  onPageChange: (pageIndex: number) => void
  totalItems?: number
  pageSize: number
}
const MXPaging = ({ currentPageIndex, onPageChange, totalItems, pageSize }: Props) => {
  let totalPages = 0
  if (totalItems && totalItems > 0) {
    totalPages = Math.ceil(totalItems / pageSize)
  }
  if (totalItems === 0) return <span />
  return (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPageIndex}
      onPageChange={page => onPageChange(page.selected)}
      pageCount={totalPages}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-center pr-1 mt-1"
    />
  )
}
export default MXPaging
