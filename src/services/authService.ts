import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi } from "@reduxjs/toolkit/query/react"
import APIURL from "api/APIUrl"
import localforage from "localforage"
import { RootState } from "store"
import { AuthState, LoginRequest, LoginResponse, PermissionFunction, UserInfo } from "types/auth"
import { BaseAPIResponse } from "types/common"
import { axiosBaseQuery } from "utils/rtk/baseQuery"

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<BaseAPIResponse<LoginResponse>, LoginRequest>({
      query: credentials => ({
        url: APIURL.auth.login,
        method: "POST",
        data: credentials,
      }),
    }),
    // getUserInfo: builder.query<BaseAPIResponse<UserInfo>, string>({
    //   query: () => ({
    //     url: APIURL.auth.me,
    //     method: "GET",
    //   }),
    // }),
    // getPagePermission: builder.query<BaseAPIResponse<PermissionFunction[]>, number>({
    //   query: pageId => ({
    //     url: `${APIURL.permission.checkPagePermission}?pageId=${pageId}`,
    //     method: "GET",
    //   }),
    // }),
  }),
})
export const {
  useLoginMutation,
  // useGetUserInfoQuery, useGetPagePermissionQuery
} = loginApi

const authSlice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {
    setUserLogin: (state, { payload: loginResponse }: PayloadAction<LoginResponse>) => {
      state.token = loginResponse.accessToken
    },
    refreshUserInfo: (state, { payload: userInfo }: PayloadAction<UserInfo>) => {
      state.user = userInfo
    },
    logout: state => {
      localforage.clear().then(() => {})
      state.user = null
      state.token = null
      state.currentWarehouseId = undefined
      state.listWarehouse = undefined
    },
  },
})

export const { setUserLogin, logout, refreshUserInfo } = authSlice.actions

export const authReducer = authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
