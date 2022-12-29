import toastHelper from "./toastHelper"
export const PERMISSON_KEY = "noti-permisson"
export const PERMISSION_TYPE = {
  NONE: "none",
  DENIED: "denied",
  GRANTED: "granted",
}
export interface PermissionUserSetting {
  allowNoti: boolean
  permissionType: string
}

export class NotificationHelper {
  private static _instance: NotificationHelper
  static get instance() {
    if (!this._instance) this._instance = new NotificationHelper()
    return this._instance
  }
  get isAllowNoti() {
    return this.getPermissonSetting().permissionType === PERMISSION_TYPE.GRANTED
  }

  public getPermissonSetting() {
    const value = localStorage.getItem(PERMISSON_KEY)
    if (!value) return {} as PermissionUserSetting
    return JSON.parse(value) as PermissionUserSetting
  }
  public setPermissionType(type: string) {
    const settings = this.getPermissonSetting()
    settings.permissionType = type
    localStorage.setItem(PERMISSON_KEY, JSON.stringify(settings))
  }
  public askNotiPermission = () => {
    if (!window.Notification) return
    const $this = this
    if (
      window.Notification &&
      Notification.permission !== PERMISSION_TYPE.DENIED &&
      Notification.permission !== PERMISSION_TYPE.GRANTED
    ) {
      Notification.requestPermission(function (status) {
        // If the user said okay
        $this.setPermissionType(status)
        if (status === PERMISSION_TYPE.GRANTED) {
          toastHelper.showSuccess("Đã bật nhận thông báo")
        }
        // Otherwise, we can fallback to a regular modal alert
        else {
          toastHelper.showWarning("Đã tắt nhận thông báo")
        }
      })
    }
  }
  public sendNotification(title, options: NotificationOptions) {
    if (this.isAllowNoti) new Notification(title, options)
  }
}
