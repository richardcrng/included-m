import React from "react";
import { RouteComponentProps } from "react-router";
import CoursePageView from "./CoursePageView";
import LoadingPage from "../../pages/LoadingPage";
import { useQuery } from "react-query";
import { contentStringPath, CoursePath } from "../../api";
import { getCourseDeep } from "../../api/getResource";
import ErrorPage from "../../pages/ErrorPage";

interface CoursePageRouteProps extends RouteComponentProps<CoursePath> {}

function CoursePageRouteQuery({ history, match }: CoursePageRouteProps) {
  const { data, isError } = useQuery(
    contentStringPath(match.params),
    async () => {
      const course = await getCourseDeep(match.params);
      return course;
    }
  );

  if (data) {
    return (
      <CoursePageView
        course={data}
        onTopicStart={(topic) => {
          history.push(`/learn/${topic.route.join("/")}`);
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
