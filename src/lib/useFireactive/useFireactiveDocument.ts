import { ActiveDocument } from 'fireactive/dist/types/class.types';
import { isEqual } from 'lodash'
import { useState, useEffect } from 'react';

type Args<D extends ActiveDocument = ActiveDocument, S = ReturnType<ActiveDocument['toObject']>> = {
  getDocument(): Promise<D>,
  documentToState(document: D): S
}

export default function useFireactiveDocument<D extends ActiveDocument = ActiveDocument, S = ReturnType<ActiveDocument['toObject']>>({
  getDocument,
  documentToState
}: Args<D, S>) {
  const [state, setState] = useState<S | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const foundDocument = await getDocument()

      if (foundDocument) {
        const updateIfNew = () => {
          console.log('running effect')
          const asState = documentToState(foundDocument)
          if (!isEqual(state, asState)) {
            setState(asState)
          }
          
        }
        foundDocument.on('value', updateIfNew)
      }
    }

    fetchData()
  })
}