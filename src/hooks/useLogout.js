import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../firebase/config'
import { useState } from 'react'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setPending(true)
    try {
      await projectAuth.signOut()

      dispatch({ type: 'LOGOUT' })
      setError(null)
      setPending(false)
    } catch (err) {
      setError(true)
      setPending(false)
      console.log(err.message)
    }
  }
  return { logout, error, pending }
}
