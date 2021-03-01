import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicLesson } from "../../../content/api/public-content";
import {
  pathToRoute,
  LessonPath,
} from "../../../content/types/content-path.types";
import ActivityPageView from "./ActivityPageView";

interface LessonPageRouteProps extends RouteComponentProps<LessonPath> {}

function LessonPageRouteQuery({ history, match }: LessonPageRouteProps) {
  const { data, isError } = useQuery(pathToRoute(match.params), async () => {
    const res = await fetchAndParsePublicLesson(match.params);
    return res;
  });

  const [currentPage, setCurrentPage] = useState(0);

  if (data) {
    const totalPages = data.parsed.activities.length;
    const activity = data.parsed.activities[currentPage];

    const handleBack = () => history.goBack();

    const handleContinue = () => {
      if (currentPage < totalPages - 1) {
        setCurrentPage((prev) => prev + 1);
      } else {
        window.alert("End of lesson!");
      }
    };

    const handleExit = () => {
      history.push(`/${match.params.courseId}/${match.params.topicId}`);
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

const LessonPageRoute = {
  // Firebase: LessonPageRouteFirebase,
  Query: LessonPageRouteQuery,
};

export default LessonPageRoute;
