import { isEqual } from 'lodash'
import { useState, useEffect } from 'react';
import Course from '../../models/Course';
import Lesson from '../../models/Lesson';
import Topic from '../../models/Topic';

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