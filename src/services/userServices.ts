import { createApi } from "@reduxjs/toolkit/dist/query/react"
import APIURL from "api/APIUrl"
import { BaseAPIResponse } from "types/common"
import { UserSelectItem } from "types/user"
import { axiosBaseQuery } from "utils/rtk/baseQuery"

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: axiosBaseQuery(),

  endpoints: builder => ({
    // getMatxiUsers: builder.query<BaseAPIResponse<UserSelectItem>, undefined>({
    //   query: () => ({
    //     url: `${APIURL.user.getMatxiUsers}`,
    //     method: "GET",
    //   }),
    // }),
  }),
})
// export const { useGetMatxiUsersQuery } = userApi
