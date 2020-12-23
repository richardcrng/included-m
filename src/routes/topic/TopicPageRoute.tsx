import React from "react";
import { RouteComponentProps } from "react-router";
import TopicPageView from "./TopicPageView";
import LoadingPage from "../../pages/LoadingPage";
import { contentStringPath, TopicPath } from "../../api";
import { getTopicDeepRecursive } from "../../api/getResource";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";

interface TopicPageRouteIdProps extends RouteComponentProps<TopicPath> {}

// function TopicPageRouteFirebase({ history, match }: TopicPageRouteIdProps) {
//   const { value: state } = useFirestoreTopic(
//     {
//       getDocument: (docClass) => docClass.findByIdOrFail(match.params.id),
//       documentToState: (doc) => doc.toObjectDeep(),
//     },
//     `Topic-${match.params.id}`
//   );

//   if (state) {
//     return (
//       <TopicPageView
//         topic={state}
//         onLessonSelect={(lesson) => {
//           history.push(`/lesson/${lesson.id}`);
//         }}
//       />
//     );
//   } else {
//     return <LoadingPage />;
//   }
// }

function TopicPageRouteQuery({ history, match }: TopicPageRouteIdProps) {
  const { data, isError } = useQuery(
    contentStringPath(match.params),
    async () => {
      const res = await getTopicDeepRecursive(match.params);
      return res;
    }
  );

  if (data) {
    return (
      <TopicPageView
        topic={data}
        onLessonSelect={(lesson) => {
          history.push(`/learn/${lesson.route.join("/")}`);
        }}
      />
    );
  } else if (isError) {
    return <ErrorPage />;
  } else {
    return <LoadingPage />;
  }
}

const TopicPageRoute = {
  // Firebase: TopicPageRouteFirebase,
  Query: TopicPageRouteQuery,
};

export default TopicPageRoute;
