import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"
import { SelectItem } from "types/common"

export interface ConfigState {
  drawerOpen: boolean
}
const initialState: ConfigState = {
  drawerOpen: false,
}

export const getListRowsPerPage = (): SelectItem[] => {
  return [
    { label: "7", value: 7 },
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ]
}

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.drawerOpen = !state.drawerOpen
    },
  },
})
export const configState = (state: RootState) => state.config
export const configActions = configSlice.actions
export const configReducer = configSlice.reducer
