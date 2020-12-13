import React from 'react';
import { RouteComponentProps } from 'react-router';
import LessonPageView from './LessonPageView';
import { useFireactiveLesson } from '../../lib/useFireactive/useFireactiveDocument';
import LoadingPage from '../../pages/LoadingPage';
import { JSendBase } from '../../lib/jsend';
import { LessonRawDeep } from '../../models/Lesson';

interface LessonPageRouteFirebaseProps extends RouteComponentProps<{
  id: string;
}> {}

function LessonPageRouteFirebase({ 
  history, match
}: LessonPageRouteFirebaseProps) {
  const [state] = useFireactiveLesson({
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

export type GetLessonIdSuccess = JSendBase<{ lesson: LessonRawDeep }, 'success'>

const LessonPageRoute = {
  Firebase: LessonPageRouteFirebase,
}

export default LessonPageRoute;