import React from 'react';
import { useSelector } from 'react-redux'
import selectors from '../redux/selectors';
import CourseDetails from '../pages/Course/CourseDetails';

function CoursePage() {
  const course = useSelector(selectors.getLoadedCourse)

  return (
    <CourseDetails
      course={course}
    />
  )
}

export default CoursePage;