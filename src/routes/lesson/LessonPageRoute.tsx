import React from "react";
import { RouteComponentProps } from "react-router";
import LessonPageView from "./LessonPageView";
import LoadingPage from "../../pages/LoadingPage";
import { contentStringPath, getLesson, LessonPath } from "../../api";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";

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

function LessonPageRouteQuery({ history, match }: LessonPageRouteProps) {
  const { data, isError } = useQuery(
    contentStringPath(match.params),
    async () => {
      const res = await getLesson(match.params);
      return res;
    }
  );

  if (data) {
    return <LessonPageView lesson={data} />;
  } else if (isError) {
    return <ErrorPage />;
  } else {
    return <LoadingPage />;
  }
}

const LessonPageRoute = {
  // Firebase: LessonPageRouteFirebase,
  Query: LessonPageRouteQuery,
};

export default LessonPageRoute;
