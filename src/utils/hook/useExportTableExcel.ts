import * as XLSX from "xlsx"
export interface ExportTableExcelProps {
  tableId: string
  sheetName: string
  fileName: string
}
export const useExportTableExcel = ({ tableId, sheetName, fileName }: ExportTableExcelProps) => {
  const exportExcelTable = () => {
    var data = document.getElementById(tableId)
    var file = XLSX.utils.table_to_book(data, { sheet: sheetName })
    XLSX.write(file, { bookType: "xlsx", bookSST: true, type: "base64" })
    XLSX.writeFile(file, `${fileName}`)
  }
  return { exportExcelTable }
}
