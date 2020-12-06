import React from 'react';
import { isSelectMultipleActivity, Activity, isSelectForEachBlankActivity } from '../lesson-types';
import LessonActivityRead from './LessonActivityRead';
import LessonActivitySelectMultiple from './LessonActivitySelectMultiple';
import LessonActivitySelectForEachBlank from './SelectForEachBlank';

interface Props {
  activity: Activity,
}

function LessonActivity({
  activity
}: Props) {
  if (isSelectMultipleActivity(activity)) {
    return (
      <LessonActivitySelectMultiple
        activity={activity}
      />
    )
  } else if (isSelectForEachBlankActivity(activity)) {
    return (
      <LessonActivitySelectForEachBlank
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