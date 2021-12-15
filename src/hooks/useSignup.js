import { useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
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
      //   add display name to user
      await res.user.updateProfile({ displayName })
      dispatch({ type: 'LOGIN', payload: res.user })

      setPending(false)
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setPending(false)
    }
  }

  return { error, pending, signup }
}
