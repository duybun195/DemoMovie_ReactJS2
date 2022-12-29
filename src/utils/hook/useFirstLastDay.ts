import React from "react"
import { getFirstDayOfMonth, getLastDayOfMonth } from "utils/typeHelper"

const useFirstLastDay = () => {
  return React.useMemo(() => {
    const now = new Date()
    const month = now.getMonth(),
      year = now.getFullYear()
    return [getFirstDayOfMonth(month, year), getLastDayOfMonth(month, year)]
  }, [])
}
export default useFirstLastDay
