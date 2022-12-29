import { createAsyncThunk } from "@reduxjs/toolkit"
import { DownloadFileInfo } from "types/common"
import { axioClient, ThunkConfig } from "utils/rtk/baseQuery"
import { getFileNameFromResponse, getUrlDownload } from "utils/webHelper"
export const dowloadFileThunk = createAsyncThunk<
  DownloadFileInfo,
  { url: string; data: any; type: "POST" | "GET" },
  ThunkConfig
>("common/dowloadFile", async (param, thunkAPI) => {
  const response = await axioClient(thunkAPI.getState)(getUrlDownload(param.url), {
    method: param.type,
    url: param.url,
    data: param.type === "POST" ? param.data : null,
    params: param.type === "GET" ? param.data : null,
    responseType: "blob",
  })
  return { fileData: response.data as Blob, fileName: getFileNameFromResponse(response) }
})
