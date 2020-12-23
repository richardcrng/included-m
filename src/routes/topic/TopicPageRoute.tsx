import React from "react";
import { RouteComponentProps } from "react-router";
import TopicPageView from "./TopicPageView";
import LoadingPage from "../../pages/LoadingPage";
import { JSendBase } from "../../lib/jsend";
import { TopicRawDeep } from "../../models/Topic.old";
import { useFirestoreTopic } from "../../models/FirestoreModel/useFirestoreModel";
import { TopicPath } from "../../api";
import { getTopicDeepRecursive } from "../../api/getResource";
import { useQuery } from "react-query";

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

// function TopicPageRouteRedux({ history }: RouteComponentProps) {
//   const dispatch = useDispatch()
//   const topic = useSelector(selectors.getLoadedTopic)

//   if ([topic.topicTitle, topic.description].includes(LOADING_STRING)) {
//     history.push('/')
//   }

//   return (
//     <TopicDetails
//       topic={topic}
//       onLessonSelect={(lesson) => {
//         dispatch(actions.loaded.lesson.create.update(lesson))
//         history.push('/lesson')
//       }}
//     />
//   )
// }

export type GetTopicIdSuccess = JSendBase<{ topic: TopicRawDeep }, "success">;

function TopicPageRouteQuery({ history, match }: TopicPageRouteIdProps) {
  const { data } = useQuery(`topic-${match.params.topicId}`, async () => {
    const res = await getTopicDeepRecursive(match.params);
    return res;
  });

  if (data) {
    return (
      <TopicPageView
        topic={data}
        onLessonSelect={(lesson) => {
          history.push(`/learn/${lesson.route.join("/")}`);
        }}
      />
    );
  } else {
    return <LoadingPage />;
  }
}

const TopicPageRoute = {
  // Firebase: TopicPageRouteFirebase,
  // Redux: TopicPageRouteRedux,
  Query: TopicPageRouteQuery,
};

export default TopicPageRoute;
