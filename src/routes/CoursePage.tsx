import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import selectors from '../redux/selectors';
import CourseDetails from '../pages/Course/CourseDetails';
import { RouteComponentProps } from 'react-router';
import actions from '../redux/reducer';

function CoursePage({ history } : RouteComponentProps) {
  const dispatch = useDispatch()
  const course = useSelector(selectors.getLoadedCourse)

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

export default CoursePage;