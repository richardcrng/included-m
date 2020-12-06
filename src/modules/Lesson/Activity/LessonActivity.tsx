import React from 'react';
import { isSelectMultipleActivity, Activity } from '../lesson-types';
import LessonActivityRead from './LessonActivityRead';
import LessonActivitySelectMultiple from './LessonActivitySelectMultiple';

interface Props {
  activity: Activity
}

function LessonActivity({
  activity
}: Props) {
  if (isSelectMultipleActivity(activity)) {
    return (
      <LessonActivitySelectMultiple
        blocks={activity.blocks}
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