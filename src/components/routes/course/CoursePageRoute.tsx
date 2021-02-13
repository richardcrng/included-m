import React from "react";
import { RouteComponentProps } from "react-router";
import CoursePageView from "./CoursePageView";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicCourseDeep } from "../../../content/api/public-content";
import { alertUnderConstruction } from "../../../lib/utils";
import { hasChildContent } from "../../../content/types/content-yaml.types";
import {
  contentStringPath,
  CoursePath,
} from "../../../content/types/content-path.types";

interface CoursePageRouteProps extends RouteComponentProps<CoursePath> {}

function CoursePageRouteQuery({ history, match }: CoursePageRouteProps) {
  const { data, isError } = useQuery(
    contentStringPath(match.params),
    async () => {
      const course = await fetchAndParsePublicCourseDeep(match.params);
      return course;
    }
  );

  if (data) {
    return (
      <CoursePageView
        course={data.parsed}
        onTopicStart={(topic) => {
          if (hasChildContent(topic)) {
            history.push(`/learn/${topic.route.join("/")}`);
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

const CoursePageRoute = {
  // Firebase: CoursePageRouteFirebase,
  Query: CoursePageRouteQuery,
};

export default CoursePageRoute;
