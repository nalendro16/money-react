import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  // if not use a useRef -> infinite loop in useEffect bcs query is reference type
  // its bcs query is an array and is different on every functional call
  const query = useRef(_query).current
  const orderby = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (orderby) {
      ref = ref.orderBy(...orderby)
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let result = []
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id })
        })
        // update state
        setDocuments(result)
        setError(null)
      },
      (error) => {
        //   throw new error without try catch
        console.log(error)
        setError('could not fetch the data')
      }
    )
    // cleanup
    return () => unsubscribe()
  }, [collection, query, orderby])
  return { documents, error }
}
