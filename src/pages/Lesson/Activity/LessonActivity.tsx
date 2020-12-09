import React from 'react';
import { Activity, isComplexSelectForEachBlankActivity } from '../../../content/types';
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
  if (!activity) {
    return null
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