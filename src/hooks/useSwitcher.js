import { useContext } from 'react'
import { SwitcherContext } from '../context/SwitcherContext'

export const useSwitcher = () => {
  const switcher = useContext(SwitcherContext)
  if (switcher === undefined) {
    throw new Error('useSwitcher() must be in used')
  }
  return switcher
}
