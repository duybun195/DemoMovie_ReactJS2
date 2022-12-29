import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import themeConfig from "app/theme/config/themeConfig"
import { RootState } from "store"
import { CommonSettings } from "types/common"
export type SkinType = "dark" | "light" | ((value: any) => void)
export interface LayoutState {
  isRTL: boolean
  menuCollapsed: boolean
  menuHidden: boolean
  contentWidth: string
  skin: SkinType
  activeMenu: string | null
  showDowloadFile: boolean
  settings?: CommonSettings
}
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem("menuCollapsed")
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}
const initialState: LayoutState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  skin: "light",
  activeMenu: null,
  showDowloadFile: false,
}
export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    handleContentWidth: (state, { payload: contentWidth }: PayloadAction<string>) => {
      state.contentWidth = contentWidth
    },
    handleMenuCollapsed: (state, { payload: menuCollapsed }: PayloadAction<boolean>) => {
      window.localStorage.setItem("menuCollapsed", menuCollapsed.toString())
      state.menuCollapsed = menuCollapsed
    },
    handleMenuHidden: (state, { payload: menuHidden }: PayloadAction<boolean>) => {
      state.menuHidden = menuHidden
    },
    handleSkin: (state, { payload: skin }: PayloadAction<SkinType>) => {
      state.skin = skin
    },
    setActiveMenu: (state, { payload: activeMenu }: PayloadAction<string>) => {
      state.activeMenu = activeMenu
    },
    showHideModalDowloadFileProcess: state => {
      state.showDowloadFile = !state.showDowloadFile
    },
    setCommonSettings: (state, { payload: settings }: PayloadAction<CommonSettings>) => {
      state.settings = settings
    },
  },
})
export const layoutState = (state: RootState) => state.config
export const layoutActions = layoutSlice.actions
export const layoutReducer = layoutSlice.reducer
