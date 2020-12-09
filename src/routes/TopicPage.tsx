import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import selectors from '../redux/selectors';
import TopicDetails from '../pages/Course/TopicDetails';
import { RouteComponentProps } from 'react-router';
import actions from '../redux/reducer';
import { LOADING_STRING } from '../redux/state';

function TopicPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch()
  const topic = useSelector(selectors.getLoadedTopic)

  if ([topic.topicTitle, topic.description].includes(LOADING_STRING)) {
    history.push('/')
  }

  return (
    <TopicDetails
      topic={topic}
      onLessonSelect={(lesson) => {
        dispatch(actions.loaded.lesson.create.update(lesson))
        history.push('/lesson')
      }}
    />
  )
}

export default TopicPage;