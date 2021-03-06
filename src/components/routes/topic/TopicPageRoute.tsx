import React from "react";
import { RouteComponentProps } from "react-router";
import TopicPageView from "./TopicPageView";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicTopicRecursive } from "../../../content/api/public-content";
import { alertUnderConstruction } from "../../../lib/utils";
import { hasChildContent } from "../../../content/types/content-yaml.types";
import {
  pathToRoute,
  TopicPath,
} from "../../../content/types/content-path.types";

interface TopicPageRouteIdProps extends RouteComponentProps<TopicPath> {}

function TopicPageRouteQuery({ history, match }: TopicPageRouteIdProps) {
  const { data, isError } = useQuery(pathToRoute(match.params), async () => {
    const res = await fetchAndParsePublicTopicRecursive(match.params);
    return res;
  });

  if (data) {
    return (
      <TopicPageView
        topic={data.parsed}
        onLessonSelect={(lesson) => {
          if (hasChildContent(lesson)) {
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
