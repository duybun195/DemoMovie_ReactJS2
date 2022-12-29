import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "services/authService"

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}
export const useCurrentUser = () => {
  const user = useAuth()
  if (!user) return null
  return user.user
}
