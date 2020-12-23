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
import { getContent } from "../../api";
import { DEFAULT_COURSE_ID } from "../../constants";

interface CoursePageRouteProps
  extends RouteComponentProps<{
    courseId: string;
  }> {}

function CoursePageRouteFirebase({ history, match }: CoursePageRouteProps) {
  const { value: state } = useFirestoreCourse(
    {
      getDocument: (docClass) => docClass.findByIdOrFail(match.params.courseId),
      documentToState: (doc) => doc.toObjectDeep(),
    },
    `Course-${match.params.courseId}`
  );

  if (state) {
    return (
      <CoursePageView
        course={state}
        onTopicStart={(topic) => {
          history.push(`/topic/${topic.id}`);
        }}
      />
    );
  } else {
    return <LoadingPage />;
  }
}

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

export interface CourseIndex {
  courseTitle: string;
  description: string;
  topicIdsOrdered: string[];
}

function CoursePageRouteQuery({ history, match }: CoursePageRouteProps) {
  const { courseId } = match.params;

  const { data } = useQuery(`course-${courseId}`, async () => {
    const getDirectory = getContent(
      {
        courseId: DEFAULT_COURSE_ID,
        topicId: "fundamentals",
        chapterId: "what-is-venture",
        lessonId: "goals-of-venture",
        // topicId: "fundamentals",
      },
      "tree"
    );

    const getIndex = getContent<CourseIndex>(
      {
        courseId: DEFAULT_COURSE_ID,
        topicId: "fundamentals",
        chapterId: "what-is-venture",
        lessonId: "goals-of-venture",
      },
      "index.json"
    );

    const [directory, index] = await Promise.all([getDirectory, getIndex]);
    return {
      directory,
      index,
    };
  });

  console.log(data);

  if (false) {
    // return (
    //   <CoursePageView
    //     course={data.directory}
    //     onTopicStart={(topic) => {
    //       history.push(`/topic/${topic.id}`);
    //     }}
    //   />
    // );
  } else {
    return <LoadingPage />;
  }
}

// function CoursePageRouteQuery({
//   history,
//   match,
// }: CoursePageRouteProps) {

//   const { id } = match.params;

//   const { data } = useQuery(`course-${id}`, async () => {
//     const res = await fetch(`${SERVER_URL}/courses/${id}`);
//     const body = (await res.json()) as GetCourseIdSuccess;
//     return body.data.course;
//   });

//   if (data) {
//     return (
//       <CoursePageView
//         course={data}
//         onTopicStart={(topic) => {
//           history.push(`/topic/${topic._id}`);
//         }}
//       />
//     );
//   } else {
//     return <LoadingPage />;
//   }
// }

const CoursePageRoute = {
  Firebase: CoursePageRouteFirebase,
  Redux: CoursePageRouteRedux,
  Query: CoursePageRouteQuery,
};

export default CoursePageRoute;
