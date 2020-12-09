import { IonButton } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import { Activity, isComplexSelectForEachBlankActivity } from '../../../content/types';
import LessonContent from '../LessonContent';
import LessonActivityRead from './LessonActivityRead';
import LessonActivitySelectMultiple from './LessonActivitySelectMultiple';
import LessonActivitySelectForEachBlank from './SelectForEachBlank';
import LessonActivitySelectForEachBlankComplex from './SelectForEachBlank/LessonActivitySelectForEachBlankComplex';
import LessonActivitySwipeCards from './SwipeCards';

interface Props {
  activity: Activity,
}

function LessonActivity({
  activity
}: Props) {
  const history = useHistory()

  if (!activity) {
    return (
      <>
        <LessonContent>
          <h1>Under construction...!</h1>
          <p>This lesson is still under construction.</p>
          <p>Why don't you try another?</p>
          <IonButton
            onClick={() => {
              history.push('/topic')
            }}
            expand='full'
          >
              Go back
          </IonButton>
        </LessonContent>
      </>
    )
    
  } else if (activity.activityType === 'select-an-answer') {
    return (
      <LessonActivitySelectMultiple
        activity={activity}
      />
    )

  } else if (activity.activityType === 'select-multiple') {
    return (
      <LessonActivitySelectMultiple
        activity={activity}
      />
    )
  } else if (activity.activityType === 'select-for-each-blank') {
    if (isComplexSelectForEachBlankActivity(activity)) {
      return (
        <LessonActivitySelectForEachBlankComplex
          activity={activity}
        />
      )
    } else {
      return (
        <LessonActivitySelectForEachBlank
          activity={activity}
        />
      )
    }
  } else if (activity.activityType === 'swipe-cards') {
    return (
      <LessonActivitySwipeCards
        activity={activity}
      />
    )
  } else {
    return (
      <LessonActivityRead
        blocks={activity.blocks}
      />
    )
  }
}

export default LessonActivity