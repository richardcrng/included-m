import React from 'react';
import { RouteComponentProps } from 'react-router';
import LessonPageView from './LessonPageView';
import { useFireactiveLesson } from '../../lib/useFireactive/useFireactiveDocument';
import LoadingPage from '../../pages/LoadingPage';

interface LessonPageRouteFirebaseProps extends RouteComponentProps<{
  id: string;
}> {}

function LessonPageRouteFirebase({ 
  history, match
}: LessonPageRouteFirebaseProps) {
  const [doc, state] = useFireactiveLesson({
    getDocument: (docClass) => docClass.findById(match.params.id),
    documentToState: doc => doc.toRawDeep(true)
  })

  if (state) {
    return (
      <LessonPageView
        lesson={state}
      />
    )
  } else {
    return <LoadingPage />
  }
}

const LessonPageRoute = {
  Firebase: LessonPageRouteFirebase,
}

export default LessonPageRoute;