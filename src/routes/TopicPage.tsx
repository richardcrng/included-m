import React from 'react';
import { useSelector } from 'react-redux'
import selectors from '../redux/selectors';
import TopicDetails from '../pages/Course/TopicDetails';

function TopicPage() {
  const topic = useSelector(selectors.getLoadedTopic)

  return (
    <TopicDetails
      topic={topic}
    />
  )
}

export default TopicPage;