import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [cancel, setCancel] = useState(false)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setPending(true)

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      if (!res) {
        throw new Error('could not complete signup')
      }
      //   add display name to user using dispatch
      await res.user.updateProfile({ displayName })
      dispatch({ type: 'LOGIN', payload: res.user })

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
  return { error, pending, signup }
}
