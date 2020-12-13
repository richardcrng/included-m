import { ActiveDocument } from 'fireactive/dist/types/class.types';
import { isEqual } from 'lodash'
import { useState, useEffect } from 'react';
import Course from '../../models/Course';

type Opts<C extends new (...args: any) => any, S = unknown> = {
  getDocument(activeClass: C): Promise<InstanceType<C> | null>,
  documentToState?(document: InstanceType<C>): S | Promise<S>
}

type Listener = Parameters<ActiveDocument['on']>[1]

export const makeUseFireactiveDocument = <C extends new (...args: any) => any>(activeClass: C, callback?: (doc: InstanceType<C>, updateFn: Listener) => void) => {

  return function useFireactiveDocument <S = unknown>(
    { getDocument, documentToState } : Opts<C, S>
  ): [InstanceType<C> | null, S | null] {
    const [state, setState] = useState<S | null>(null)
    const [document, setDocument] = useState<InstanceType<C> | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        const foundDocument = document || await getDocument(activeClass)

        if (foundDocument) {
          const updateIfNew = async () => {
            !document && setDocument(foundDocument)

            if (documentToState) {
              const asState = documentToState && await documentToState(foundDocument)
              if (!isEqual(state, asState)) {
                setState(asState)
              }
            }
          }
          callback && callback(foundDocument, updateIfNew)
        }
      }

      fetchData()
    })

    return [document, state]
  }
}

export const useFireactiveCourse = makeUseFireactiveDocument(Course, (course, updateFn) => course.on('value', updateFn))

// export default function useFireactiveDocument<D, S = unknown>(
//   { getDocument, documentToState, }: Opts<D, S>,
//   callback?: (doc: D, updateFn: Listener) => void
// ): [D | null, S | null] {
  
//   const [state, setState] = useState<S | null>(null)
//   const [document, setDocument] = useState<D | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       const foundDocument = document || await getDocument()

//       if (foundDocument) {
//         const updateIfNew = () => {
//           const asState = documentToState(foundDocument)
//           if (!isEqual(state, asState)) {
//             !document && setDocument(foundDocument)
//             setState(asState)
//           }
//         }
//         callback && callback(foundDocument, updateIfNew)
//       }
//     }

//     fetchData()
//   })

//   return [document, state]
// }