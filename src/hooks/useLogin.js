import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../firebase/config'
import { useState, useEffect } from 'react'

export function useLogin() {
  const [cancel, setCancel] = useState(false)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setPending(true)
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      //   dispatch
      dispatch({ type: 'LOGIN', payload: res.user })
      // console.log(res.user)
      //   unsub manually
      if (!cancel) {
        setError(null)
        setPending(false)
      }
    } catch (err) {
      // unsub manually
      if (!cancel) {
        console.log(err.message)
        setError(err.message)
        setPending(false)
      }
    }
  }
  useEffect(() => {
    return () => {
      setCancel(true)
    }
  }, [])
  return { login, pending, error }
}
