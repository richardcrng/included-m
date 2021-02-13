import React from "react";
import { RouteComponentProps } from "react-router";
import CoursePageView from "./CoursePageView";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import { contentStringPath, CoursePath } from "../../api";
import ErrorPage from "../../pages/ErrorPage";
import { fetchAndParsePublicCourseDeep } from "../../api/public/getPublicContent";
import { alertUnderConstruction } from "../../lib/utils";

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
          const topicHasChapters = topic.chapterIdsOrdered?.length > 0;
          if (topicHasChapters) {
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
