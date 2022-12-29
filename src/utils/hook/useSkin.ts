//** React Imports
import { useEffect } from "react"

// ** Actions & Store
import { layoutActions, SkinType } from "services/layoutService"
import { useAppDispatch, useAppSelector } from "./appHook"

export const useSkin = (): [SkinType, (value: SkinType) => void] => {
  const dispatch = useAppDispatch()
  const skin = useAppSelector(state => state.layout.skin)
  const { handleSkin } = layoutActions

  // ** Return a wrapped version of useState's setter function
  const setValue = (value: SkinType) => {
    try {
      // ** Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(skin) : value
      // ** Save to store & local storage
      dispatch(handleSkin(value))
      window.localStorage.setItem("skin", JSON.stringify(valueToStore))
    } catch (error) {
      // ** A more advanced implementation would handle the error case
    }
  }

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body

    // ** Define classnames for skins
    const classNames = {
      dark: "dark-layout",
      bordered: "bordered-layout",
      "semi-dark": "semi-dark-layout",
    }
    const classList = element.classList as any
    // ** Remove all classes from Body on mount
    element.classList.remove(...classList)

    // ** If skin is not light add skin class
    if (skin !== "light") {
      element.classList.add(classNames[skin as string])
    }
  }, [skin])

  return [skin, setValue]
}
