import Swal, { SweetAlertIcon } from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const showConfirm = (
  title: string,
  message: string,
  type: SweetAlertIcon = "info",
  showCancelButton: boolean = true,
  allowOutsideClick: boolean = true,
) => {
  return MySwal.fire({
    title: title || "Xác nhận!",
    text: message,
    icon: type || "warning",
    showCancelButton: showCancelButton,
    confirmButtonText: "Xác nhận",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ml-1",
    },
    buttonsStyling: false,
    allowOutsideClick: allowOutsideClick,
  })
}

const showMessSystem = (isSuccess: boolean, message?: string) => {
  return MySwal.fire({
    title: isSuccess ? "Cập nhật dữ liệu thành công!" : "Cập nhật dữ liệu lỗi!",
    text: message,
    icon: isSuccess ? "success" : "error",
  })
}
const showAlert = (message?: string, type: SweetAlertIcon = "success") => {
  return MySwal.fire({
    title: "Thông báo",
    text: message,
    icon: type,
  })
}
export const sweetAlertHelper = {
  showConfirm,
  showMessSystem,
  showAlert,
}
