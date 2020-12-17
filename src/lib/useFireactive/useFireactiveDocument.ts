import { initialize } from 'fireactive';
import { isEqual } from 'lodash'
import { useState, useEffect } from 'react';
import Course from '../../models/Course';
import Lesson from '../../models/Lesson';
import Topic from '../../models/Topic';

initialize({
  apiKey: "AIzaSyBPAfs2hzOGiIBmDm_iZG4hQsZfNdZaRz0",
  authDomain: "included-m.firebaseapp.com",
  databaseURL: "https://included-m-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "included-m",
  storageBucket: "included-m.appspot.com",
  messagingSenderId: "120205799819",
  // @ts-ignore
  appId: "1:120205799819:web:7b8b7a05d2abf5b4e87f8e",
  measurementId: "G-E602LNZPCN"
})

export const useFireactiveCourse = makeUseFireactiveDocument(Course, (doc, updateFn) => doc.on('value', updateFn))

export const useFireactiveTopic = makeUseFireactiveDocument(Topic, (doc, updateFn) => doc.on('value', updateFn))

export const useFireactiveLesson = makeUseFireactiveDocument(Lesson, (doc, updateFn) => doc.on('value', updateFn))

type Opts<C extends new (...args: any) => any, S = unknown> = {
  getDocument(activeClass: C): Promise<InstanceType<C> | null>,
  documentToState?(document: InstanceType<C>): S | Promise<S>
}

type Listener = Parameters<firebase.database.Reference['on']>[1]

type UpdateCallback<C extends new (...args: any) => any> = (doc: InstanceType<C>, updateFn: Listener) => void

export function makeUseFireactiveDocument<C extends new (...args: any) => any>(
  activeClass: C,
  callback?: UpdateCallback<C>
) {
  return function useFireactiveDocument <S = unknown>(
    { getDocument, documentToState } : Opts<C, S>
  ): [S | null, InstanceType<C> | null] {
    const [state, setState] = useState<S | null>(null)
    const [document, setDocument] = useState<InstanceType<C> | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        console.log(getDocument)

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
    return [state, document]
  }
}