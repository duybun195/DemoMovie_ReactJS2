import { Pagable } from "./common"

export interface NotificationSearchRequest extends Pagable {}
export interface NotificationSearchResponse {
  totalUnRead: any
  notificationObject: NotificationObject
  notification: Notification
  message: string
  sendByName: string
  actionName: string
  code: string
}
export interface ListNotification {
  notificationObjectId: number
  notiferUserFID: number
  status: number
  id: number
}

export interface NotificationObject {
  actionTypeId: number
  entityName: string
  entityId: number
  createdDate: Date
  createdBy: number
  status: number
  message: string
  fullMessage: string
  listNotifications: ListNotification[]
  actionType?: any
  createdByUser?: any
  id: number
}

export interface Notification {
  notificationObjectId: number
  notiferUserFID: number
  status: number
  id: number
}
