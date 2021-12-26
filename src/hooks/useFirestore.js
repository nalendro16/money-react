import { useReducer, useEffect, useState } from 'react'
import { projectFirestore, timeStamp } from '../firebase/config'

let initialState = {
  document: null,
  pending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PENDING':
      return { pending: true, document: null, error: null, success: false }
    case 'ERROR':
      return {
        pending: false,
        document: null,
        error: action.payload,
        success: false,
      }
    case 'ADDED_DOCUMENT':
      return {
        pending: false,
        document: action.payload,
        error: null,
        success: true,
      }
    case 'DELETED_DOCUMENT':
      return {
        pending: false,
        document: null,
        success: true,
        error: null,
      }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancel, setIsCancel] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  //   if dispatch cancel
  const dispatchnotCancel = (action) => {
    if (!isCancel) {
      dispatch(action)
    }
  }
  //   add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'SET_PENDING' })
    try {
      const addedAt = timeStamp.fromDate(new Date())
      const addedDoc = await ref.add({ ...doc, addedAt })
      dispatchnotCancel({ type: 'ADDED_DOCUMENT', payload: addedDoc })
    } catch (err) {
      dispatchnotCancel({ type: 'ERROR', payload: err.message })
    }
  }

  //   delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'SET_PENDING' })
    try {
      const deleteDocument = await ref.doc(id).delete()
      dispatchnotCancel({ type: 'DELETED_DOCUMENT' })
    } catch (err) {
      dispatchnotCancel({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  //   clean up function only
  useEffect(() => {
    return () => setIsCancel(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
