import { ActiveDocument } from 'fireactive/dist/types/class.types';
import { isEqual } from 'lodash'
import { useState, useEffect } from 'react';

type Opts<S, D> = {
  getDocument(): Promise<D | null>,
  documentToState(document: D): S
}

type Listener = Parameters<ActiveDocument['on']>[1]

export default function useFireactiveDocument<S, D>(
  { getDocument, documentToState, }: Opts<S, D>,
  callback: (doc: D, updateFn: Listener) => void
) {
  const [state, setState] = useState<S | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const foundDocument = await getDocument()

      if (foundDocument) {
        const updateIfNew = () => {
          const asState = documentToState(foundDocument)
          if (!isEqual(state, asState)) {
            setState(asState)
          }
        }
        callback(foundDocument, updateIfNew)
      }
    }

    fetchData()
  })

  return state
}