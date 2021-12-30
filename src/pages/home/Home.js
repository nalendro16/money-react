import styles from './Home.module.css'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['addedAt', 'desc']
  )

  // mengambil data tanggal input dan amount
  // console.log(
  //   documents &&
  //     documents.map((doc) => {
  //       let time = doc.addedAt
  //       return time.toDate().toDateString() + ' expense: ' + doc.amount
  //     })
  // )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents === 0 && <p>Still empty</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}
