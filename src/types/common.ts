export interface BaseAPIResponse<T> {
  statusCode: number
  result: T
  message?: string
  success: boolean
}

export interface Pagable {
  pageIndex: number
  pageSize: number
}
export interface PagableResponse<T> {
  items: Array<T>
  totalItems: number
}
export interface SelectItem {
  value: any
  label: any
  disable?: boolean
  color?: string
}

export interface SelectFromAPISelect {
  value: any
  text: any
  disable?: boolean
}

export class SelectItemFromObj implements SelectItem {
  value: any
  label: any
  disable?: boolean
  color?: string
  constructor(value: any, label: any, disable: boolean = false, color: string | undefined = undefined) {
    this.value = value
    this.label = label
    this.disable = disable
    this.color = color
  }
}
// export class SelectFromAPISelect {
//   value: any
//   text: any
//   disable?: boolean
//   color?: string
//   constructor(value: any, text: any, disable: boolean = false) {
//     this.value = value
//     this.text = text
//     this.disable = disable
//   }
// }

export interface SerialInfoJsonObj {
  code: string
  fullFrom: string
  fullTo: string
  from: number
  to: number
  fullSerialDisplay: string
}
export interface CommonSource {
  id: number
  groupId: number
  name: string
}
export interface SortableItem {
  id: number
}
export interface RefreshToken {
  refreshToken: string
}

export const DefaultRowsPerPage = 10
export const MaxRowsPerPage = 100
export interface DownloadFileInfo {
  fileData: Blob
  fileName: string
}
export const REGION_TYPE = {
  1: "Miền bắc",
  2: "Miền trung",
  3: "Miền Nam",
}

export enum ImportExportRequestType {
  IMPORT = 10,
  EXPORT = 20,
}
export enum ImportExportRequestStatus {
  PENDING = 10,
  PARTIAL_EXPORTED = 20,
  FINISH = 25,
  CANCEL = 30,
}
export interface CommonSettings {
  serialCodes: string
}
export enum WarehouseID {
  Medino = 1,
  HCM = 2,
  HANOI = 3,
  DONG_NAI = 4,
}
export const ListPageSize = [10, 20, 50, 100, 500, 9999]
export const PageSizeMax = 9999
