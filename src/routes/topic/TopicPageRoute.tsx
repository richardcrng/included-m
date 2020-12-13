import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import selectors from '../../redux/selectors';
import TopicDetails from '../../pages/Course/TopicDetails';
import { RouteComponentProps } from 'react-router';
import actions from '../../redux/reducer';
import { LOADING_STRING } from '../../redux/state';
import TopicPageView from './TopicPageView';
import { useFireactiveTopic } from '../../lib/useFireactive/useFireactiveDocument';
import LoadingPage from '../../pages/LoadingPage';
import { JSendBase } from '../../lib/jsend';
import { TopicRawDeep } from '../../models/Topic';
import { useQuery } from 'react-query';

interface TopicPageRouteIdProps extends RouteComponentProps<{
  id: string;
}> {}

function TopicPageRouteFirebase({ 
  history, match
}: TopicPageRouteIdProps) {
  const [state] = useFireactiveTopic({
    getDocument: (docClass) => docClass.findById(match.params.id),
    documentToState: doc => doc.toRawDeep(true)
  })

  if (state) {
    return (
      <TopicPageView
        topic={state}
        onLessonSelect={(lesson) => {
          history.push(`/lesson/${lesson._id}`)
        }}
      />
    )
  } else {
    return <LoadingPage />
  }
}

function TopicPageRouteRedux({ history }: RouteComponentProps) {
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

export type GetTopicIdSuccess = JSendBase<{ topic: TopicRawDeep }, 'success'>

function TopicPageRouteQuery({ 
  history, match
}: TopicPageRouteIdProps) {
  const { id } = match.params

  const { isLoading, error, data } = useQuery(`lesson-${id}`, async () => {
    const res = await fetch(`http://localhost:4000/topics/${id}`)
    const body = await res.json() as GetTopicIdSuccess
    return body.data.topic
  }
  )

  if (data) {
    return (
      <TopicPageView
        topic={data}
      />
    )
  } else {
    return <LoadingPage />
  }
}

const TopicPageRoute = {
  Firebase: TopicPageRouteFirebase,
  Redux: TopicPageRouteRedux,
  Query: TopicPageRouteQuery
}

export default TopicPageRoute;