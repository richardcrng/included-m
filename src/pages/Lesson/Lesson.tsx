import React, { useReducer } from 'react';
import riduce, { Action, ActionsProxy } from 'riduce'
import { Activity } from '../../content/types';
import LessonActivity from './Activity/LessonActivity';
import LessonToolbar from './LessonToolbar';
import activities from './activities';

type LessonCtx = {
  dispatch: React.Dispatch<Action>,
  actions: ActionsProxy<LessonCtx['state'], LessonCtx['state'], {}>,
  state: {
    activities: Activity[],
    currentIdx: number,
  }
}

// @ts-ignore
export const LessonContext = React.createContext<LessonCtx>({})

function Lesson() {
  const initialLessonState = {
    activities,
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

export default Lesson