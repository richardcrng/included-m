import { useContext } from 'react'
import SwingContext from '../../components/Swing/SwingContext'
import { SwingData } from '../../components/Swing'

export const useSwingData = <TCard>(): SwingData<TCard> => {
  return useContext(SwingContext)
}

export default useSwingData