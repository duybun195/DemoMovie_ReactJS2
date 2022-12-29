import { BaseAPIResponse } from "types/common"
import env from "utils/env"
export class ServiceWorkerHelper {
  private static _intance: ServiceWorkerHelper
  private _serviceRegistration: ServiceWorkerRegistration | null = null
  public updateFound: boolean = false
  public onUpdateFound
  constructor() {
    this.onUpdateFound = () => {}
  }
  public static get intance() {
    if (!this._intance) this._intance = new ServiceWorkerHelper()
    return this._intance
  }
  setRegistration(serviceRegistration) {
    this._serviceRegistration = serviceRegistration
  }

  updateServiceWorker = () => {
    if (!this._serviceRegistration) return
    const registrationWaiting = this._serviceRegistration.waiting
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: "SKIP_WAITING" })
      registrationWaiting.addEventListener("statechange", e => {
        if ((e as any).target.state === "activated") {
          window.location.reload()
        }
      })
    }
  }
  registerSW = (userId: number, roleId: number): void => {
    if (!navigator.serviceWorker) return
    navigator.serviceWorker.ready.then(function (registration) {
      ServiceWorkerHelper.intance.setRegistration(registration)
      // Use the PushManager to get the user's subscription to the push service.
      return registration.pushManager.getSubscription().then(async function (subscription) {
        // If a subscription was found, return it.
        if (subscription) {
          return subscription
        }
        // Get the server's public key
        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
        // send notifications that don't have a visible effect for the user).
        let response = await fetch(`${env.BaseUrl}notification/webpush-publickey`, {
          method: "GET",
        })
        if (!response.ok) return
        const jsonRes = (await response.json()) as BaseAPIResponse<string>
        const applicationKey = jsonRes.result
        return registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationKey,
          })
          .then(function (pushSubscription) {
            fetch(`${env.BaseUrl}notification/webpush-subcribe/${roleId}/${userId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pushSubscription),
            })
              .then(function (response) {
                if (response.ok) {
                  console.log("Successfully subscribed for Push Notifications")
                } else {
                  console.log("Failed to store the Push Notifications subscription on server")
                }
              })
              .catch(function (error) {
                console.log("Failed to store the Push Notifications subscription on server: " + error)
              })
          })
          .catch(function (error) {
            if (Notification.permission === "denied") {
            } else {
              console.log("Failed to subscribe for Push Notifications: " + error)
            }
          })
      })
    })
  }
}
