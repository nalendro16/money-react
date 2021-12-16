import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { login, error, pending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    login(email, password)
  }

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
      </label>
      {!pending && <button className="btn">Login</button>}
      {pending && (
        <button className="btn" disabled>
          Loadings
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  )
}
