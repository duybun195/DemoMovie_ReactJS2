import { AxiosResponse } from "axios"
import _ from "lodash"
import env from "./env"
import { toInt } from "./typeHelper"

export const sumArray = <T>(array: Array<T>, prop: keyof T): number => {
  if (!array || array.length === 0) return 0
  let total = 0
  array.forEach(x => {
    total += toInt(x[prop])
  })
  return total
}
export const groupByArray = <T>(array: Array<T>, ...keys: (keyof T)[]): { keys: T; values: T[] }[] => {
  if (!array || array.length === 0) return []
  const result = {}
  array.forEach((item, index) => {
    let keyObj = {}
    let keyIndex = ""
    keys.forEach(k => {
      keyObj[k.toString()] = item[k.toString()]
      keyIndex += item[k.toString()] + "_"
    })
    if (!result[keyIndex]) result[keyIndex] = { keys: keyObj, values: [] }
    result[keyIndex].values.push(item)
  })
  return _.values(result)
}
export const getUrlDownload = (url: string): string => {
  return `${env.BaseUrl.replace("/api/", "/")}${url}`
}
export const getFileNameFromResponse = (response: AxiosResponse<any>): string => {
  var filename = ""
  var disposition = response.headers["Content-Disposition"] || response.headers["content-disposition"]
  if (disposition) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    var matches = filenameRegex.exec(disposition)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "")
    }
  }
  return filename
}
export const getReportExcelFileName = (fileName: string) => {
  return `${fileName}_${new Date().getTime()}.xlsx`
}

export const getRefreshToken = () => {
  return new Date().getTime().toString()
}
export const getDefaultOrderSearch = () => {
  return ["RegionTypeId DESC", "WarehouseFID ASC", "COD DESC", "MobileNo ASC"].join(",")
}
