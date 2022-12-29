import { useEffect, useState } from "react"
import { ChevronsDown, ChevronsUp } from "react-feather"
import "./table-sort-button.scss"
export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}
export interface TableSortButtonProps {
  isSorted: boolean
  columnName: string
  handleClick: (sortString: string) => void
}
export const TableSortButton = ({ isSorted, columnName, handleClick }: TableSortButtonProps) => {
  const [sortType, setSortType] = useState<SortType | null>()
  const handleSortClick = () => {
    let type = sortType
    if (!type) type = SortType.ASC
    else if (type === SortType.ASC) type = SortType.DESC
    else if (type === SortType.DESC) type = null
    if (type) handleClick(`${columnName} ${type}`)
    else handleClick("")
    setSortType(type)
  }
  useEffect(() => {
    if (!isSorted) {
      setSortType(null)
    }
  }, [isSorted])
  return (
    <div
      className="btn-sorts"
      title={`Click to sort ${sortType === SortType.ASC ? "descending" : "ascending"}`}
      onClick={handleSortClick}
    >
      <span className="sort-icon">
        <ChevronsUp size={14} color={sortType === SortType.ASC ? "green" : "gray"} />
        <ChevronsDown size={14} color={sortType === SortType.DESC ? "green" : "gray"} />
      </span>
    </div>
  )
}
