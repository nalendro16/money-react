import { useReducer, useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

let initialState = {
  document: null,
  pending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancel, setIsCancel] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  //   add a document
  const addDocument = (doc) => {
    // ref.add()
  }

  //   delete document
  const deleteDocument = (id) => {}

  //   clean up function only
  useEffect(() => {
    return () => setIsCancel(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
