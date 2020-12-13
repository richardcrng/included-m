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

interface TopicPageRouteFirebaseProps extends RouteComponentProps<{
  id: string;
}> {}

function TopicPageRouteFirebase({ 
  history, match
}: TopicPageRouteFirebaseProps) {
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

const TopicPageRoute = {
  Firebase: TopicPageRouteFirebase,
  Redux: TopicPageRouteRedux
}

export default TopicPageRoute;