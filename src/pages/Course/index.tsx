import React, { useState } from 'react';
import { Course } from '../../content/types';
import CourseDetails from './CourseDetails';

function Course() {
  const [courseData, setCourseData] = useState<Course>({
    courseTitle: 'Included M',
    description: 'Loading...',
    topics: []
  })

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://api.jsonbin.io/b/5fd14a6082e9306ae6ff98c2')
      const json: Course = await res.json()
      setCourseData(json)
    }

    getData()
  }, [setCourseData])

  return (
    <CourseDetails
      course={courseData}
    />
  )
}

export default Course;