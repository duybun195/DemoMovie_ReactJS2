import themeConfig from "app/theme/config/themeConfig"
import { RefObject } from "hoist-non-react-statics/node_modules/@types/react"
import _ from "lodash"
import moment from "moment"

export const isNullOrEmpty = (data: any): boolean => {
  return !data || data === undefined || data === "" || data === 0
}
export const defaultIfEmpty = <TData>(data: TData, defaultValue: TData): TData => {
  if (isNullOrEmpty(data)) return defaultValue
  return data
}
export const toInt = (value: any) => {
  if (!value) return 0
  if (isNullOrEmpty(value) || isNaN(parseInt(value))) return 0
  return parseInt(value)
}
export const toFloat = (value: any) => {
  if (isNullOrEmpty(value) || isNaN(parseInt(value))) return 0
  return parseFloat(value)
}
export const getRef = <TElement>(ref: RefObject<TElement>): TElement => {
  return (ref && ref.current) as TElement
}
export const toDateString = (date: Date, dateFormat: string | null = null): string => {
  if (!date) return ""
  return moment(date).format(dateFormat || themeConfig.common.dateTimeFormat)
}
export const toDateSeverString = (date?: Date): string | undefined => {
  if (!date) return undefined
  return moment(date).utc().format(themeConfig.common.dateTimeServerFormat)
}
export const getDateFromString = (dateString: string | undefined): string | undefined => {
  if (!dateString) return undefined
  return moment(dateString).format(themeConfig.common.dateTimeServerFormat)
}
export const formatNumber = (value: number | undefined): string => {
  if (!value && value !== 0) return ""
  return value.toLocaleString()
}

export const arrayToString = (value: any[]): string => {
  if (!value) return ""
  return value.filter(x => !isNullOrEmpty(x)).join(",")
}
export const toJsonArray = <T>(value: string | undefined | null): Array<T> => {
  if (!value) return new Array<T>()
  return JSON.parse(value) as Array<T>
}
/**
 *
 * @month tháng -1
 *
 */
export const getFirstDayOfMonth = (month: number, year: number): Date => {
  return new Date(year, month, 1, 0, 0, 0)
}

/**
 *
 * @month tháng -1
 *
 */
export const getLastDayOfMonth = (month: number, year: number): Date => {
  return moment(new Date(year, month, 1, 23, 59, 59)).add(1, "months").add(-1, "days").toDate()
}
export const getDateWithBeginTime = (date: Date | undefined): Date | undefined => {
  if (!date) return undefined
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}
export const getDateWithLastTime = (date: Date | undefined): Date | undefined => {
  if (!date) return undefined
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 0)
}
export const mapTo = <T1, T2>(fromObject: T1, toObject: T2): T2 => {
  const newObj = _.cloneDeep(toObject)
  _.keys(newObj).forEach(x => {
    newObj[x] = fromObject[x]
  })
  return newObj
}
export const getNestedPropValue = <TObject>(obj: TObject, name: string) => {
  if (!obj) return undefined
  try {
    if (name.indexOf(".") === -1) return obj[name]
    const splitProps = name.split(".")
    let tem = null
    for (let prop of splitProps) {
      if (!tem) tem = obj[prop]
      else tem = tem[prop]
    }
    return tem
  } catch {
    return null
  }
}
