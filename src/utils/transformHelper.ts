import { BaseAPIResponse, PagableResponse, SelectItem } from "types/common"
import { isNullOrEmpty, toDateSeverString } from "./typeHelper"

export function toSelectList<TModel>(
  listItem: TModel[] | undefined,
  idField: keyof TModel | ((value: TModel) => any),
  textField: keyof TModel | ((value: TModel) => any),
  disableField?: keyof TModel | ((value: TModel) => any),
  label?: string,
): SelectItem[] {
  const result: SelectItem[] = []
  if (!listItem) return result
  if (!isNullOrEmpty(label)) {
    const defaultOption: SelectItem = { label: label, value: typeof idField === "number" ? 0 : "" }
    result.push(defaultOption)
  }
  if (listItem) {
    listItem.forEach(item => {
      let text,
        value = "",
        disable = false
      if (typeof textField === "string") text = item[textField.toString()]
      else text = (textField as (value: TModel) => string)(item)
      if (typeof idField === "string") value = item[idField.toString()]
      else value = (idField as (value: TModel) => string)(item)
      if (disableField) {
        if (typeof disableField === "string") disable = item[disableField.toString()]
        else value = (disableField as (value: TModel) => string)(item)
      }
      let select: SelectItem = {
        label: text,
        value: value,
        disable: disable,
      }
      result.push(select)
    })
  }
  return result
}
export function getResultBaseResponse<T>(baseResponse: BaseAPIResponse<T> | undefined): T | undefined {
  if (!baseResponse) return undefined
  const { result, success } = baseResponse
  if (!success) return undefined
  if (!result) return undefined
  return result
}
export function getMessageBaseResponse<T>(baseResponse: BaseAPIResponse<T> | undefined): string {
  if (!baseResponse) return ""
  const { message } = baseResponse
  return message || ""
}
export function createEmptyBaseResponse<T>(message: string = ""): BaseAPIResponse<T> {
  return {
    message: message,
  } as BaseAPIResponse<T>
}
export function findItemFromPagingData<T>(
  baseResponse: BaseAPIResponse<PagableResponse<T>> | undefined,
  predicate: (item: T) => boolean,
): T | undefined {
  if (!baseResponse || !baseResponse.success) return undefined
  return baseResponse.result.items.find(item => predicate(item))
}
export function getDateFromRange(listDate: Date[] | undefined): { dateFrom?: string; dateTo?: string } {
  if (!listDate || listDate.length === 0) return {}
  const fromDate = listDate[0]
  let fromDateString
  if (fromDate) {
    fromDate.setHours(0, 0, 0)
    fromDateString = toDateSeverString(fromDate)
  }
  let toDate = listDate[1] || null
  if (!toDate && fromDate) toDate = fromDate
  if (toDate) toDate.setHours(23, 59, 59)
  let toDateString
  if (toDate) toDateString = toDateSeverString(toDate)
  return { dateFrom: fromDateString, dateTo: toDateString }
}
