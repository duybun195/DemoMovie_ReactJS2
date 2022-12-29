import { toast, ToastPosition, TypeOptions } from "react-toastify"

const toastHelper = {
  show: (msg: string, type: TypeOptions = "success") => {
    toast(msg, { type, autoClose: 5000, delay: 0 })
  },
  showSuccess: (msg: string | any) => {
    toastHelper.show(msg, "success")
  },
  showWarning: (msg: string | any) => {
    toastHelper.show(msg, "warning")
  },
  showInfo: (msg: string | any) => {
    toastHelper.show(msg, "info")
  },
  showError: (msg: string | any = "Lỗi không thể xử lý") => {
    toastHelper.show(msg, "error")
  },
  showMsgCenter: (msg: string, type: TypeOptions = "success") => {
    toast(msg, { type, autoClose: 5000, delay: 0, position: "top-center" })
  },
  showMsgPosition: (msg: string, type: TypeOptions = "success", position: ToastPosition) => {
    toast(msg, { type, autoClose: 5000, delay: 0, position: position })
  },
}
export default toastHelper
