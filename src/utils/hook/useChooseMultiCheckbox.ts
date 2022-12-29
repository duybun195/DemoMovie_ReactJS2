import { useEffect, useState } from "react"
export interface ChooseMultiCheckboxProps {
  handleEsc: () => void
}
export const useChooseMultiCheckbox = ({ handleEsc }: ChooseMultiCheckboxProps) => {
  const [isShiftPress, setIsShiftPress] = useState(false)
  const [lastSelectedItemIndex, setlastSelectedItemIndex] = useState(-1)

  const handleKeyUp = e => {
    if (e.key === "Shift" && isShiftPress) {
      e.preventDefault()
      setIsShiftPress(false)
    }
    if (e.key === "Escape") {
      setIsShiftPress(false)
      setlastSelectedItemIndex(-1)
      handleEsc()
    }
  }

  const handleKeyDown = e => {
    if (e.key === "Shift" && !isShiftPress) {
      e.preventDefault()
      setIsShiftPress(true)
    }
  }
  const handleSelectStart = e => {
    e.preventDefault()
    return false
  }

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keyup", handleKeyUp, false)
      document.removeEventListener("keydown", handleKeyDown, false)
    }
  }, [])
  useEffect(() => {
    if (isShiftPress) {
      document.addEventListener("selectstart", handleSelectStart)
    } else {
      document.removeEventListener("selectstart", handleSelectStart, false)
    }
  }, [isShiftPress])
  return {
    isShiftPress,
    lastSelectedItemIndex,
    setIsShiftPress,
    setlastSelectedItemIndex,
  }
}
