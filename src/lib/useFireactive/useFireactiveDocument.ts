import { ActiveDocument } from 'fireactive/dist/types/class.types';
import { isEqual } from 'lodash'
import { useState, useEffect } from 'react';

type Opts<D, S = unknown> = {
  getDocument(): Promise<D | null>,
  documentToState(document: D): S
}

type Listener = Parameters<ActiveDocument['on']>[1]

export default function useFireactiveDocument<D, S = unknown>(
  { getDocument, documentToState, }: Opts<D, S>,
  callback?: (doc: D, updateFn: Listener) => void
): [D | null, S | null] {
  
  const [state, setState] = useState<S | null>(null)
  const [document, setDocument] = useState<D | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const foundDocument = document || await getDocument()

      if (foundDocument) {
        const updateIfNew = () => {
          const asState = documentToState(foundDocument)
          if (!isEqual(state, asState)) {
            !document && setDocument(foundDocument)
            setState(asState)
          }
        }
        callback && callback(foundDocument, updateIfNew)
      }
    }

    fetchData()
  })

  return [document, state]
}