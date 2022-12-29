import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi } from "@reduxjs/toolkit/query/react"
import APIURL from "api/APIUrl"
import { RootState } from "store"
import { BaseAPIResponse } from "types/common"
import { MovieResponse, MovieState } from "types/movie"
import { axiosBaseQuery } from "utils/rtk/baseQuery"

export const movieApi = createApi({
  reducerPath: "list-movie",
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getAllMovies: builder.query<BaseAPIResponse<MovieResponse[]>, number>({
      query: pageId => ({
        url: `${APIURL.movies.index}?pageId=${pageId}`,
        method: "GET",
      }),
    }),
  }),
})
export const { useGetAllMoviesQuery } = movieApi

const movieSlice = createSlice({
  name: "movie",
  initialState: {} as MovieState,
  reducers: {
    getMovies: (state, { payload: movieResponse }: PayloadAction<MovieResponse[]>) => {
      state.listMovie = movieResponse
    },
  },
})

export const { getMovies } = movieSlice.actions

export const movieReducer = movieSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
