import React from "react";
import { RouteComponentProps } from "react-router";
import LessonPageView from "./LessonPageView";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicLesson } from "../../../content/api/public-content";
import {
  pathToRoute,
  LessonPath,
} from "../../../content/types/content-path.types";

interface LessonPageRouteProps extends RouteComponentProps<LessonPath> {}

function LessonPageRouteQuery({ history, match }: LessonPageRouteProps) {
  const { data, isError } = useQuery(pathToRoute(match.params), async () => {
    const res = await fetchAndParsePublicLesson(match.params);
    return res;
  });

  if (data) {
    return <LessonPageView lesson={data.parsed} />;
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
