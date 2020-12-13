import React from 'react';
import { RouteComponentProps } from 'react-router';
import LessonPageView from './LessonPageView';
import { useFireactiveLesson } from '../../lib/useFireactive/useFireactiveDocument';
import LoadingPage from '../../pages/LoadingPage';
import { JSendBase } from '../../lib/jsend';
import { LessonRawDeep } from '../../models/Lesson';
import { useQuery } from 'react-query';
import { SERVER_URL } from '../../constants';

interface LessonPageRouteIdProps extends RouteComponentProps<{
  id: string;
}> {}

function LessonPageRouteFirebase({ 
  history, match
}: LessonPageRouteIdProps) {
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

function LessonPageRouteQuery({ 
  history, match
}: LessonPageRouteIdProps) {
  const { id } = match.params

  const { isLoading, error, data } = useQuery(`lesson-${id}`, async () => {
    const res = await fetch(`${SERVER_URL}/lessons/${id}`)
    const body = await res.json() as GetLessonIdSuccess
    return body.data.lesson
  }
  )

  if (data) {
    return (
      <LessonPageView
        lesson={data}
      />
    )
  } else {
    return <LoadingPage />
  }
}

const LessonPageRoute = {
  Firebase: LessonPageRouteFirebase,
  Query: LessonPageRouteQuery
}

export default LessonPageRoute;