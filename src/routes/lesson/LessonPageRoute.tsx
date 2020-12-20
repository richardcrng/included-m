import React from "react";
import { RouteComponentProps } from "react-router";
import LessonPageView from "./LessonPageView";
// import { useFireactiveLesson } from "../../lib/useFireactive/useFireactiveDocument";
import LoadingPage from "../../pages/LoadingPage";
import { JSendBase } from "../../lib/jsend";
import { LessonRawDeep } from "../../models/Lesson.old";
import { useFirestoreLesson } from "../../models/FirestoreModel/useFirestoreModel";

interface LessonPageRouteIdProps
  extends RouteComponentProps<{
    id: string;
  }> {}

function LessonPageRouteFirebase({ history, match }: LessonPageRouteIdProps) {
  const { value: state } = useFirestoreLesson(
    {
      getDocument: (docClass) => docClass.findByIdOrFail(match.params.id),
      documentToState: (doc) => doc.toObjectDeep(),
    },
    `Lesson-${match.params.id}`
  );

  if (state) {
    return <LessonPageView lesson={state} />;
  } else {
    return <LoadingPage />;
  }
}

export type GetLessonIdSuccess = JSendBase<
  { lesson: LessonRawDeep },
  "success"
>;

// function LessonPageRouteQuery({ history, match }: LessonPageRouteIdProps) {
//   const { id } = match.params;

//   const { data } = useQuery(`lesson-${id}`, async () => {
//     const res = await fetch(`${SERVER_URL}/lessons/${id}`);
//     const body = (await res.json()) as GetLessonIdSuccess;
//     return body.data.lesson;
//   });

//   if (data) {
//     return <LessonPageView lesson={data} />;
//   } else {
//     return <LoadingPage />;
//   }
// }

const LessonPageRoute = {
  Firebase: LessonPageRouteFirebase,
  // Query: LessonPageRouteQuery,
};

export default LessonPageRoute;
