import { isEqual } from "lodash";
import { useState, useEffect, useReducer } from "react";
import { Class } from "utility-types";
import riduce, { bundle } from "riduce";
import Course from "../Course";
import Lesson from "../Lesson";
import Topic from "../Topic";

export const useFirestoreCourse = makeUseFirestoreDocument(Course);
export const useFirestoreTopic = makeUseFirestoreDocument(Topic);
export const useFirestoreLesson = makeUseFirestoreDocument(Lesson);

type UseDocumentArgs<C extends Class<any>, S> = {
  getDocument: (
    ModelConstructor: C
  ) => InstanceType<C> | Promise<InstanceType<C>>;
  documentToState: (model: InstanceType<C>) => S | Promise<S>;
};

export function makeUseFirestoreDocument<C extends Class<any>>(
  ModelConstructor: C
) {
  const valueCache: Record<string, any> = {};
  const documentCache: Record<string, any> = {};

  return function useFirestoreDocument<S>(
    { getDocument, documentToState }: UseDocumentArgs<C, S>,
    key = "lastUsed"
  ): [S | undefined, InstanceType<C> | undefined] {
    interface State {
      value: S;
      document: InstanceType<C>;
      hasRefreshedCache: boolean;
    }

    const initialState: State = {
      value: valueCache[key],
      document: documentCache[key],
      hasRefreshedCache: false,
    };

    const [riducer, actions] = riduce(initialState);

    const [{ value, document, hasRefreshedCache }, dispatch] = useReducer(
      riducer,
      initialState
    );

    const fetchFromFirestore = async () => {
      const newDocument = await getDocument(ModelConstructor);
      const actionsToDispatch: Parameters<typeof bundle>[0] = [];

      if (!hasRefreshedCache || (!document && newDocument)) {
        if (!isEqual(JSON.stringify(document), JSON.stringify(newDocument))) {
          documentCache[key] = newDocument;
          actionsToDispatch.push(
            actions.document.create.update(newDocument),
            actions.hasRefreshedCache.create.on()
          );
        }

        if (!value) {
          const newValue = await documentToState(newDocument);
          if (!isEqual(value, newValue)) {
            valueCache[key] = newValue;
            actionsToDispatch.push(
              actions.value.create.update(newValue),
              actions.hasRefreshedCache.create.on()
            );
          }
        }
      }
      dispatch(bundle(actionsToDispatch));
    };

    useEffect(() => {
      if (!hasRefreshedCache || !value || !document) {
        fetchFromFirestore();
      }
    }, [fetchFromFirestore]);

    return [value, document];
  };
}
