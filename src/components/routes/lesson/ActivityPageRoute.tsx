import React from "react";
import { RouteComponentProps } from "react-router";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicLesson } from "../../../content/api/public-content";
import {
  pathToRoute,
  ActivityPath,
} from "../../../content/types/content-path.types";
import ActivityPageView from "./ActivityPageView";

interface ActivityPageRouteProps extends RouteComponentProps<ActivityPath> {}

function ActivityPageRouteQuery({ history, match }: ActivityPageRouteProps) {
  const { data, isError } = useQuery(pathToRoute(match.params), async () => {
    const { courseId, chapterId, topicId, lessonId } = match.params;
    const res = await fetchAndParsePublicLesson({
      courseId,
      chapterId,
      topicId,
      lessonId,
    });
    return res;
  });

  const currentPage = parseInt(match.params.activityIdx);

  if (data) {
    const totalPages = data.parsed.activities.length;
    const activity = data.parsed.activities[currentPage];

    const handleBack = () => history.goBack();

    const handleContinue = () => {
      if (currentPage < totalPages - 1) {
        const route = `/learn/${pathToRoute({
          ...match.params,
          activityIdx: `${currentPage + 1}`,
        }).join("/")}`;
        history.push(route);
      } else {
        window.alert("End of lesson!");
      }
    };

    const handleExit = () => {
      history.push(
        pathToRoute({
          ...match.params,
          activityIdx: undefined,
        }).join("/")
      );
    };

    return (
      <ActivityPageView
        {...{
          activity,
          currentPage,
          totalPages,
          handleBack,
          handleContinue,
          handleExit,
        }}
        lesson={data.parsed}
      />
    );
  } else if (isError) {
    return <ErrorPage />;
  } else {
    return <LoadingPage />;
  }
}

const ActivityPageRoute = {
  // Firebase: ActivityPageRouteFirebase,
  Query: ActivityPageRouteQuery,
};

export default ActivityPageRoute;
