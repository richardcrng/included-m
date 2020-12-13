import React, { useReducer } from 'react';
import riduce, { Action, ActionsProxy } from 'riduce'
import { ActivityRawDeep } from '../../models/Activity';
import { LessonRawDeep } from '../../models/Lesson';
import LessonActivity from './components/Activity/LessonActivity';
import LessonToolbar from './components/LessonToolbar';

type LessonCtx = {
  dispatch: React.Dispatch<Action>,
  actions: ActionsProxy<LessonCtx['state'], LessonCtx['state'], {}>,
  state: {
    activities: ActivityRawDeep[],
    currentIdx: number,
  }
}

// @ts-ignore
export const LessonContext = React.createContext<LessonCtx>({})

interface Props {
  lesson: LessonRawDeep
}

function LessonPageView({
  lesson,
} : Props) {

  const initialLessonState = {
    activities: lesson.activities,
    currentIdx: 0
  }

  const [lessonReducer, actions] = riduce(initialLessonState)

  const [lessonState, dispatch] = useReducer(lessonReducer, initialLessonState)

  return (
    <LessonContext.Provider
      value={{
        dispatch,
        actions,
        state: lessonState
      }}
    >
      <LessonToolbar />
      <LessonActivity
        activity={lessonState.activities[lessonState.currentIdx]}
      />
    </LessonContext.Provider>
  )
}

export default LessonPageView