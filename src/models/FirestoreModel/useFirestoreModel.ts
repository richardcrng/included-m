import { isEqual } from "lodash";
import React, { useState, useEffect } from "react";
import { Class } from "utility-types";
import Course from "../Course";

export const useFirestoreCourse = makeUseFirestoreDocument(Course);

type UseDocumentArgs<C extends Class<any>, S> = {
  getDocument: (
    ModelConstructor: C
  ) => InstanceType<C> | Promise<InstanceType<C>>;
  documentToState: (model: InstanceType<C>) => S | Promise<S>;
};

export function makeUseFirestoreDocument<C extends Class<any>>(
  ModelConstructor: C
) {
  return function useFirestoreDocument<S>({
    getDocument,
    documentToState,
  }: UseDocumentArgs<C, S>): [S | undefined, InstanceType<C> | undefined] {
    const [state, setState] = useState<S>();
    const [doc, setDoc] = useState<InstanceType<C>>();

    const fetchFromFirestore = async () => {
      const document = await getDocument(ModelConstructor);
      if (!doc && document) {
        if (!isEqual(JSON.stringify(document), JSON.stringify(doc))) {
          setDoc(document);
        }

        if (!state) {
          const docState = await documentToState(document);
          if (!isEqual(state, docState)) {
            setState(docState);
          }
        }
      }
    };

    useEffect(() => {
      if (!state || !doc) {
        fetchFromFirestore();
      }
    }, [fetchFromFirestore]);

    return [state, doc];
  };
}
