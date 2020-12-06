import React from 'react';
import { Activity } from '../lesson-types';
import LessonActivityRead from './LessonActivityRead';
import LessonActivitySelectMultiple from './LessonActivitySelectMultiple';
import LessonActivitySelectForEachBlank from './SelectForEachBlank';
import LessonActivitySwipeCards from './SwipeCards';

interface Props {
  activity: Activity,
}

function LessonActivity({
  activity
}: Props) {
  if (activity.activityType === 'select-an-answer') {
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
    return (
      <LessonActivitySelectForEachBlank
        activity={activity}
      />
    )
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