import React from "react";
import { RouteComponentProps } from "react-router";
import TopicPageView from "./TopicPageView";
import LoadingPage from "../../pages/LoadingPage";
import { contentStringPath, TopicPath } from "../../api";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicTopicRecursive } from "../../api/public/getPublicContent";
import { alertUnderConstruction } from "../../lib/utils";

interface TopicPageRouteIdProps extends RouteComponentProps<TopicPath> {}

function TopicPageRouteQuery({ history, match }: TopicPageRouteIdProps) {
  const { data, isError } = useQuery(
    contentStringPath(match.params),
    async () => {
      const res = await fetchAndParsePublicTopicRecursive(match.params);
      return res;
    }
  );

  if (data) {
    return (
      <TopicPageView
        topic={data.parsed}
        onLessonSelect={(lesson) => {
          const lessonHasActivities = lesson.activities?.length > 0;
          if (lessonHasActivities) {
            history.push(`/learn/${lesson.route.join("/")}`);
          } else {
            alertUnderConstruction();
          }
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
