import React from 'react';
import {
  IonHeader,
} from '@ionic/react';
import { Activity } from './lesson-types';
import LessonActivity from './Activity/LessonActivity';

const activity: Activity = {
  activityType: 'select-multiple',
  blocks: [
    "Within six months, Juicero had shuttered, offering a full refund to their customers.",
    "What do you suppose were some of the missteps that led to Juicero's demise?",
  ],
  answers: [
    {
      text: "They needed more celebrity endorsements.",
      isCorrect: false,
      feedback: "That is just so so silly."
      // isSelected: true
    },
    {
      text: "They assumed they knew what customers wanted from the product.",
      isCorrect: true,
      // isSelected: true
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


function Lesson() {
  return (
    <>
      <LessonActivity
        activity={activity}
      />
    </>
  )
}

export default Lesson