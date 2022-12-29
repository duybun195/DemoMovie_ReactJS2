import * as signalR from "@microsoft/signalr"
import { NotificationHelper } from "./notificationHelper"
import { sweetAlertHelper } from "./sweetAlertHelper"
import { getUrlDownload } from "./webHelper"
export interface SignalRSetting {
  userId: number
  roleId: number
  onReceivedMessageSystem?: (data) => void
  onReceivedMessage?: (data) => void
}
export class SignalrHelper {
  private _connection: signalR.HubConnection | null = null
  private static _instance: SignalrHelper
  public static get instance() {
    if (!this._instance) this._instance = new SignalrHelper()
    return this._instance
  }
  initSignalr = (options: SignalRSetting): void => {
    const notificationHelper = NotificationHelper.instance
    try {
      if (!this._connection) {
        this._connection = new signalR.HubConnectionBuilder()
          .withUrl(getUrlDownload(`noti-hub?userId=${options.userId}&roleId=${options.roleId}`))
          .build()
        this._connection.on("ReceivedMessageSystem", data => {
          options.onReceivedMessageSystem && options.onReceivedMessageSystem(data)
          if (notificationHelper.isAllowNoti) notificationHelper.sendNotification("WMS- Thông báo", data)
        })
        this._connection.on("ReceiveMessage", data => {
          options.onReceivedMessage && options.onReceivedMessage(data)
          if (notificationHelper.isAllowNoti) notificationHelper.sendNotification("WMS- Thông báo", data)
        })
        this._connection.on("ReceiveAllConnectMessage", data => {
          sweetAlertHelper
            .showConfirm(
              "Thông báo",
              `Hệ thống ghi nhận đã thay đổi kho! Vui lòng xác nhận để cập nhật`,
              "info",
              false,
              false,
            )
            .then(async res => {
              if (res.isConfirmed) {
                window.location.reload()
              }
            })
        })
      }
      if (this._connection.state === signalR.HubConnectionState.Disconnected)
        try {
          this._connection.start()
        } catch (err) {
          console.error("signalr", err)
        }
    } catch (err) {
      console.error("signalr", err)
    }
  }
  sendMessage(message: string) {
    if (this._connection) this._connection.invoke("sendMessage", message).then(rs => console.log(rs))
  }
  getConnectionId() {
    return this._connection?.connectionId
  }
}
