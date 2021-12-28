import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SideNav.module.css'

export default function SideNav() {
  const [clicked, setClicked] = useState(false)

  return (
    <div>
      <button
        className={styles.openbtn}
        onClick={() => {
          setClicked(true)
        }}
      >
        ☰
      </button>
      <nav className={clicked ? styles.sidenav : styles.sidenavhide}>
        <ul>
          <button
            className={styles.closebtn}
            onClick={() => {
              setClicked(false)
            }}
          >
            X
          </button>
          <Link to="/">Expense</Link>
          <Link to="/finplan">Financial Plan</Link>
          <Link to="#">Report</Link>
        </ul>
        <div className={styles.settingbtn}>Setting</div>
      </nav>
    </div>
  )
}
