import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import selectors from '../../redux/selectors';
import { RouteComponentProps } from 'react-router';
import { LOADING_STRING } from '../../redux/state';
import CoursePageView from './CoursePageView';
import { useFireactiveCourse } from '../../lib/useFireactive/useFireactiveDocument';
import LoadingPage from '../../pages/LoadingPage';
import CourseDetails from '../../pages/Course/CourseDetails';
import actions from '../../redux/reducer';

interface CoursePageRouteFirebaseProps extends RouteComponentProps<{
  id: string;
}> {}

function CoursePageRouteFirebase({ 
  history, match
}: CoursePageRouteFirebaseProps) {
  const [state] = useFireactiveCourse({
    getDocument: (docClass) => docClass.findById(match.params.id),
    documentToState: doc => doc.toRawDeep(false)
  })

  if (state) {
    return (
      <CoursePageView
        course={state}
        onTopicStart={(topic) => {
          history.push(`/topic/${topic._id}`)
        }}
      />
    )
  } else {
    return <LoadingPage />
  }
}

function CoursePageRouteRedux({ history } : RouteComponentProps) {
  const dispatch = useDispatch()
  const course = useSelector(selectors.getLoadedCourse)

  if ([course.courseTitle, course.description].includes(LOADING_STRING)) {
    history.push('/')
  }

  return (
    <CourseDetails
      course={course}
      onTopicStart={(topic) => {
        dispatch(actions.loaded.topic.create.update(topic))
        history.push('/topic')
      }}
    />
  )
}

const CoursePageRoute = {
  Firebase: CoursePageRouteFirebase,
  Redux: CoursePageRouteRedux
}

export default CoursePageRoute;