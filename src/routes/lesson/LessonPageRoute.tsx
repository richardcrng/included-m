import React from "react";
import { RouteComponentProps } from "react-router";
import LessonPageView from "./LessonPageView";
// import { useFireactiveLesson } from "../../lib/useFireactive/useFireactiveDocument";
import LoadingPage from "../../pages/LoadingPage";
import { JSendBase } from "../../lib/jsend";
import { LessonRawDeep } from "../../models/Lesson.old";
import { useFirestoreLesson } from "../../models/FirestoreModel/useFirestoreModel";
import { getContent, LessonPath } from "../../api";
import { useQuery } from "react-query";
import { LessonJSON } from "../../content/content-types";
import { contentStringPath } from "../../api/getContent";
import { getLesson } from "../../api/getResource";

interface LessonPageRouteProps extends RouteComponentProps<LessonPath> {}

// function LessonPageRouteFirebase({ history, match }: LessonPageRouteProps) {
//   const { value: state } = useFirestoreLesson(
//     {
//       getDocument: (docClass) => docClass.findByIdOrFail(match.params.lessonId),
//       documentToState: (doc) => doc.toObjectDeep(),
//     },
//     `Lesson-${match.params.lessonId}`
//   );

//   if (state) {
//     return <LessonPageView lesson={state} />;
//   } else {
//     return <LoadingPage />;
//   }
// }

export type GetLessonIdSuccess = JSendBase<
  { lesson: LessonRawDeep },
  "success"
>;

function LessonPageRouteQuery({ history, match }: LessonPageRouteProps) {
  const { data } = useQuery(contentStringPath(match.params), async () => {
    const res = await getLesson(match.params);
    return res;
  });

  if (data) {
    return <LessonPageView lesson={data} />;
  } else {
    return <LoadingPage />;
  }
}

const LessonPageRoute = {
  // Firebase: LessonPageRouteFirebase,
  Query: LessonPageRouteQuery,
};

export default LessonPageRoute;
