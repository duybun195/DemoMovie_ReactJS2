import { Spinner } from "reactstrap"

export interface TableLoadingResultProps {
  loading?: boolean
  numOfRow: number | null | undefined
}
export const TableLoadingResult = ({ loading, numOfRow }: TableLoadingResultProps) => {
  if (loading)
    return (
      <tr>
        <td colSpan={99} valign="middle" align="center">
          <Spinner size="16" />
        </td>
      </tr>
    )
  if (numOfRow === 0)
    return (
      <tr>
        <td colSpan={99} valign="middle" align="center">
          <h3>Không có dữ liệu</h3>
        </td>
      </tr>
    )
  return null
}
