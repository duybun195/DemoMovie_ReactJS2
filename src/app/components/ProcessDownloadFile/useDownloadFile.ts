import { unwrapResult } from "@reduxjs/toolkit"
import { saveAs } from "file-saver"
import { dowloadFileThunk } from "services/commonService"
import { layoutActions } from "services/layoutService"
import { DownloadFileInfo } from "types/common"
import { useAppDispatch, useAppSelector } from "utils/hook/appHook"
import toastHelper from "utils/toastHelper"

export const useDowloadFile = () => {
  const dispatch = useAppDispatch()
  const isShowDowloadFile = useAppSelector(state => state.layout.showDowloadFile)
  const dowloadFile = async (url: string, data: any, type: "POST" | "GET", fileName?: string) => {
    try {
      dispatch(layoutActions.showHideModalDowloadFileProcess())
      const result = unwrapResult(await dispatch(dowloadFileThunk({ url, data, type }))) as DownloadFileInfo
      saveAs(result.fileData, fileName ? fileName : result.fileName)
      toastHelper.showSuccess("Đã xuất file!")
      dispatch(layoutActions.showHideModalDowloadFileProcess())
    } catch {
      toastHelper.showError("Lỗi không thể tải file")
      dispatch(layoutActions.showHideModalDowloadFileProcess())
    }
  }
  return {
    isShowDowloadFile,
    dowloadFile,
  }
}
