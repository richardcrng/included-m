import React from 'react';
import {
  IonHeader,
} from '@ionic/react';
import ProgressToolbar from '../../components/molecules/ProgressToolbar';
import { Activity } from './lesson-types';
import LessonActivity from './Activity/LessonActivity';

const activity: Activity = {
  activityType: 'select-multiple',
  blocks: [
    "Within six months, Juicero had shuttered, offering a full refund to their customers.",
    "What do you suppose were some of the missteps that led to Juicero's demise?",
    {
      type: "select-multiple-answers",
      answers: [
        {
          text: "They needed more celebrity endorsements.",
          isCorrect: false
        },
        {
          text: "They assumed they knew what customers wanted from the product.",
          isCorrect: true
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
  ]
}


function Lesson() {
  return (
    <>
      <IonHeader>
        <ProgressToolbar
          currentPage={2}
          totalPages={11}
        />
      </IonHeader>
      <LessonActivity
        activity={activity}
      />
    </>
  )
}

export default Lesson