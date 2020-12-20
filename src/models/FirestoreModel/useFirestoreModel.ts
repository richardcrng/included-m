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
  const stateCache: Record<string, any> = {};
  const documentCache: Record<string, any> = {};

  return function useFirestoreDocument<S>(
    { getDocument, documentToState }: UseDocumentArgs<C, S>,
    key = "lastUsed"
  ): [S | undefined, InstanceType<C> | undefined] {
    interface State {
      value?: S;
      document?: InstanceType<C>;
      hasRefreshedCache: boolean;
    }

    const initialState: State = {
      value: stateCache[key],
      document: documentCache[key],
      hasRefreshedCache: false,
    };

    const [riducer, actions] = riduce(initialState);

    const [state, dispatch] = useReducer(riducer, initialState);

    const fetchFromFirestore = async () => {
      const document = await getDocument(ModelConstructor);
      let actionsToDispatch: Parameters<typeof bundle>[0] = [];

      if (!state.document && document) {
        if (
          !isEqual(JSON.stringify(document), JSON.stringify(state.document))
        ) {
          actionsToDispatch.push(actions.document!.create.update(document));
        }

        if (!state.value) {
          const docState = await documentToState(document);
          if (!isEqual(state.value, docState)) {
            actionsToDispatch.push(actions.value!.create.update(docState));
          }
        }
      }
      dispatch(bundle(actionsToDispatch));
    };

    useEffect(() => {
      if (!state.value || !state.document) {
        fetchFromFirestore();
      }
    }, [fetchFromFirestore]);

    return [state.value, state.document];
  };
}
