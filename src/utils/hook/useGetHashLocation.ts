import React from "react"
import { useLocation, useHistory } from "react-router-dom"

export const useGetHashLocation = () => {
  const { search, hash } = useLocation()
  const history = useHistory()

  return {
    hash: React.useMemo(() => hash.replace("#", ""), [search]),
    setHash: (hash: string) => {
      history.push(history.location.pathname + "#" + hash)
    },
  }
}
