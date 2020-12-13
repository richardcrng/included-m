import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import selectors from '../../redux/selectors';
import { RouteComponentProps } from 'react-router';
import actions from '../../redux/reducer';
import { LOADING_STRING } from '../../redux/state';
import CoursePageView from './CoursePageView';

interface CoursePageRouteFirebaseProps extends RouteComponentProps<{
  id: string;
}> {}

function CoursePageRouteFirebase({ 
  history, match
}: CoursePageRouteFirebaseProps) {
  return null


}

function CoursePageRouteRedux({ history } : RouteComponentProps) {
  const dispatch = useDispatch()
  const course = useSelector(selectors.getLoadedCourse)

  if ([course.courseTitle, course.description].includes(LOADING_STRING)) {
    history.push('/')
  }

  return (
    null
    // <CoursePageView
    //   course={course}
    //   onTopicStart={(topic) => {
    //     dispatch(actions.loaded.topic.create.update(topic))
    //     history.push('/topic')
    //   }}
    // />
  )
}

const CoursePageRoute = {
  Firebase: CoursePageRouteFirebase,
  Redux: CoursePageRouteRedux
}

export default CoursePageRoute;