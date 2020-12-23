import React from "react";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../redux/selectors";
import { RouteComponentProps } from "react-router";
import { LOADING_STRING } from "../../redux/state";
import CoursePageView from "./CoursePageView";
import LoadingPage from "../../pages/LoadingPage";
import CourseDetails from "../../pages/Course/CourseDetails";
import actions from "../../redux/reducer";
import { useFirestoreCourse } from "../../models/FirestoreModel/useFirestoreModel";
import { useQuery } from "react-query";
import { contentStringPath, CoursePath, getContent } from "../../api";
import { DEFAULT_COURSE_ID } from "../../constants";
import { CourseIndex } from "../../content/content-types";
import { getCourseDeep } from "../../api/getResource";
import ErrorPage from "../../pages/ErrorPage";

interface CoursePageRouteProps extends RouteComponentProps<CoursePath> {}

// function CoursePageRouteFirebase({ history, match }: CoursePageRouteProps) {
//   const { value: state } = useFirestoreCourse(
//     {
//       getDocument: (docClass) => docClass.findByIdOrFail(match.params.courseId),
//       documentToState: (doc) => doc.toObjectDeep(),
//     },
//     `Course-${match.params.courseId}`
//   );

//   if (state) {
//     return (
//       <CoursePageView
//         course={state}
//         onTopicStart={(topic) => {
//           history.push(`/topic/${topic.id}`);
//         }}
//       />
//     );
//   } else {
//     return <LoadingPage />;
//   }
// }

function CoursePageRouteRedux({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const course = useSelector(selectors.getLoadedCourse);

  if ([course.courseTitle, course.description].includes(LOADING_STRING)) {
    history.push("/");
  }

  return (
    <CourseDetails
      course={course}
      onTopicStart={(topic) => {
        dispatch(actions.loaded.topic.create.update(topic));
        history.push("/topic");
      }}
    />
  );
}

function CoursePageRouteQuery({ history, match }: CoursePageRouteProps) {
  const { courseId } = match.params;

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
  Redux: CoursePageRouteRedux,
  Query: CoursePageRouteQuery,
};

export default CoursePageRoute;
