import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import selectors from '../../redux/selectors';
import CourseDetails from '../../pages/Course/CourseDetails';
import { RouteComponentProps } from 'react-router';
import actions from '../../redux/reducer';
import { LOADING_STRING } from '../../redux/state';

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
  Redux: CoursePageRouteRedux
}

export default CoursePageRoute;