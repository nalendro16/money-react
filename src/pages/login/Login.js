import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { login, error, pending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className={styles.login}>
      <div className={styles.description}>
        <h2>So, You Need to login!</h2>
        <p>This is why you need to choose us:</p>
        <ol>
          <li>We Can save your expanses record</li>
          <li>You can review a report of your expenses</li>
          <li>
            Need to revisite your expense? no need to worry the delete fitures
            was added
          </li>
        </ol>
      </div>
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
            Loading...
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}
