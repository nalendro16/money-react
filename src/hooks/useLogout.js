import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../firebase/config'
import { useState, useEffect } from 'react'

export const useLogout = () => {
  const [cancel, setCancel] = useState(false)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setPending(true)
    try {
      await projectAuth.signOut()
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      if (!cancel) {
        //   update state
        setError(null)
        setPending(false)
      }
    } catch (err) {
      if (!cancel) {
        setError(true)
        setPending(false)
        console.log(err.message)
      }
    }
  }
  useEffect(() => {
    return () => {
      setCancel(true)
    }
  }, [])
  return { logout, error, pending }
}
