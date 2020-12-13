import React from 'react';
import { useSelector } from 'react-redux'
import selectors from '../redux/selectors';
import { RouteComponentProps } from 'react-router';
import LessonDetails from '../pages/components';
import { LOADING_STRING } from '../redux/state';

function LessonPage({ history }: RouteComponentProps) {
  // const dispatch = useDispatch()
  const lesson = useSelector(selectors.getLoadedLesson)

  if (lesson.lessonTitle === LOADING_STRING) {
    history.push('/')
  }

  return (
    <LessonDetails lesson={lesson} />
  )
}

export default LessonPage;