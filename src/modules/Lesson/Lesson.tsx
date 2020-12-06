import React, { useReducer } from 'react';
import riduce, { Action } from 'riduce'
import { Activity } from './lesson-types';
import LessonActivity from './Activity/LessonActivity';
import { ActionsProxy } from 'riduce/dist/proxy/createActionsProxy';

const readActivity: Activity = {
  activityType: 'read',
  blocks: [
    "The startup Juicero was convinced that customers would pay nearly $700 for their product. By 2017, they had raised almost $120m and hired over 200 employees.",
    "But sales were middling after product launch. Despite slashing prices, Juicero was steadily losing money, especially after it came out that squeezing their bags by hand was just as efficient.",
  ]
}

const selectActivity: Activity = {
  activityType: 'select-multiple',
  blocks: [
    "Within six months, Juicero had shuttered, offering a full refund to their customers.",
    "What do you suppose were some of the missteps that led to Juicero's demise?",
  ],
  answers: [
    {
      text: "They needed more celebrity endorsements.",
      isCorrect: false,
    },
    {
      text: "They assumed they knew what customers wanted from the product.",
      isCorrect: true,
    },
    {
      text: "They didn't raise enough money.",
      isCorrect: false
    },
    {
      text: "They scaled correctly without knowing for sure their business model worked.",
      isCorrect: true
    }
  ]
}

const activities: Activity[] = [
  readActivity,
  selectActivity,
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] }
]

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
      <LessonActivity
        activity={lessonState.activities[lessonState.currentIdx]}
      />
    </LessonContext.Provider>
  )
}

export default Lesson