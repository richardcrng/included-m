import React from 'react';
import { Activity } from './lesson-types';
import LessonActivity from './Activity/LessonActivity';

const activity: Activity = {
  activityType: 'read',
  blocks: [
    "The startup Juicero was convinced that customers would pay nearly $700 for their product. By 2017, they had raised almost $120m and hired over 200 employees.",
    "But sales were middling after product launch. Despite slashing prices, Juicero was steadily losing money, especially after it came out that squeezing their bags by hand was just as efficient.",
  ]
}

// const activity: Activity = {
//   activityType: 'select-multiple',
//   blocks: [
//     "Within six months, Juicero had shuttered, offering a full refund to their customers.",
//     "What do you suppose were some of the missteps that led to Juicero's demise?",
//   ],
//   answers: [
//     {
//       text: "They needed more celebrity endorsements.",
//       isCorrect: false,
//     },
//     {
//       text: "They assumed they knew what customers wanted from the product.",
//       isCorrect: true,
//     },
//     {
//       text: "They didn't raise enough money.",
//       isCorrect: false
//     },
//     {
//       text: "They scaled correctly without knowing for sure their business model worked.",
//       isCorrect: true
//     }
//   ]
// }


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