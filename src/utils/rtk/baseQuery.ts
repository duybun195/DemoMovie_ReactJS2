import { BaseQueryFn } from "@reduxjs/toolkit/query/react"
import env from "utils/env"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { BaseAPIResponse } from "types/common"
import { AppDispatch, RootState } from "store"
export type ThunkConfig = {
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  getState: () => RootState
}
export const axioClient = getState => {
  let headers = {
    //"Content-Type": "application/json",
  }
  const token = getState()?.auth?.token
  if (token) headers["authorization"] = `Bearer ${token}`

  const axioInstance = axios.create({
    baseURL: env.BaseUrl,
    responseType: "json",
    headers: headers,
  })
  // axioInstance.interceptors.request.use(config => {
  //   config.paramsSerializer = params =>
  //     qs.stringify(params, {
  //       serializeDate: (date: Date) => ,
  //     })
  //   return config
  // })
  // axioInstance.interceptors.response.use(
  //   response => response,
  //   error => {
  //     const status = error.response ? error.response.status : null
  //     if (status === 401) {
  //       console.log("write function handle refresh token here")
  //     }
  //     const formatError = {
  //       status: 200,
  //       message: "",
  //     }
  //     if (error.response) {
  //       const { data } = error.response
  //       if (data) {
  //         formatError.status = data.status
  //         formatError.status = data.detail
  //       }
  //     } else {
  //       formatError.status = error.status // not sure
  //       formatError.status = error.message
  //     }
  //     console.log(formatError)
  //     return Promise.resolve(formatError)
  //   },
  // )
  return axioInstance
}

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig["method"]
    data?: AxiosRequestConfig["data"]
    params?: AxiosRequestConfig["params"]
  },
  unknown,
  unknown
> => async ({ url, method, data, params }, api) => {
  try {
    if (method === "GET") {
      url = addTimeToUrl(url)
    }

    const result = await axioClient(api.getState).request<BaseAPIResponse<any>>({
      url: url,
      method: method,
      data: data,
      params: params,
    })
    return { data: result.data, isSuccess: true, isError: false }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return {
      data: err.response?.data,
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    }
  }
}
export const axiosBaseDownload = (): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig["method"]
    data?: AxiosRequestConfig["data"]
    params?: AxiosRequestConfig["params"]
  },
  unknown,
  unknown
> => async ({ url, method, data, params }, api) => {
  try {
    if (method === "GET") {
      url = addTimeToUrl(url)
    }

    const result = await axioClient(api.getState).request<any>({
      url: url,
      method: method,
      data: data,
      params: params,
      responseType: "blob",
    })
    return { data: result.data, isSuccess: true, isError: false }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return {
      data: err.response?.data,
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    }
  }
}
const addTimeToUrl = url => {
  if (url.indexOf("?") !== -1) url += "&_t=" + new Date().getTime().toString()
  else url += "?_t=" + new Date().getTime().toString()
  return url
}
