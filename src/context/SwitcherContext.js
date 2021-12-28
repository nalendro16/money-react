import { useReducer, createContext } from 'react'

export const SwitcherContext = createContext()

let initialState = {
  mode: 'light',
  overflow: 'hidden',
}

const switchReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_OVERFLOW':
      return { ...state, overflow: action.payload }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export const SwitcherContext = ({ children }) => {
  const [switcher, dispatch] = useReducer(switchReducer, initialState)

  const changeOverflow = () => {
    dispatch({ type: 'CHANGE_OVERFLOW', payload: overflow })
  }

  const changeMode = () => {
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }
  return (
    <SwitcherContext.Provider value={{ ...state, changeOverflow, changeMode }}>
      {children}
    </SwitcherContext.Provider>
  )
}
