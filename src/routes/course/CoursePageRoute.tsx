import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import selectors from "../../redux/selectors";
import { RouteComponentProps } from "react-router";
import { LOADING_STRING } from "../../redux/state";
import CoursePageView from "./CoursePageView";
// import { useFireactiveCourse } from '../../lib/useFireactive/useFireactiveDocument';
import LoadingPage from "../../pages/LoadingPage";
import CourseDetails from "../../pages/Course/CourseDetails";
import actions from "../../redux/reducer";
import { JSendBase } from "../../lib/jsend";
import { CourseRawDeep } from "../../models/Course";
import { SERVER_URL } from "../../constants";

interface CoursePageRouteFirebaseProps
  extends RouteComponentProps<{
    id: string;
  }> {}

// function CoursePageRouteFirebase({
//   history, match
// }: CoursePageRouteFirebaseProps) {

//   const [count, setCount] = React.useState(0)

//   React.useEffect(() => {
//     setTimeout(() => {
//       console.log('ran effect')
//       setCount(c => c+1)
//     }, 2000)
//   })

//   const [state] = useFireactiveCourse({
//     getDocument: (docClass) => docClass.findById(match.params.id),
//     documentToState: doc => doc.toRawDeep(false)
//   })

//   if (state) {
//     return (
//       <CoursePageView
//         course={state}
//         onTopicStart={(topic) => {
//           history.push(`/topic/${topic._id}`)
//         }}
//       />
//     )
//   } else {
//     return <LoadingPage />
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

export type GetCourseIdSuccess = JSendBase<
  { course: CourseRawDeep<false> },
  "success"
>;

function CoursePageRouteQuery({
  history,
  match,
}: CoursePageRouteFirebaseProps) {
  console.log("running course page");

  const { id } = match.params;

  const { data } = useQuery(`course-${id}`, async () => {
    const res = await fetch(`${SERVER_URL}/courses/${id}`);
    const body = (await res.json()) as GetCourseIdSuccess;
    return body.data.course;
  });

  if (data) {
    return (
      <CoursePageView
        course={data}
        onTopicStart={(topic) => {
          history.push(`/topic/${topic._id}`);
        }}
      />
    );
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
